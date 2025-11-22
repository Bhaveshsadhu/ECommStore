import axios from "axios";
import { store } from "../store/store";
import { logout, setCredentials } from "../features/auth/authSlice";

// ---- SETUP AXIOS INSTANCE ----
const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // allows sending cookies (refreshToken)
});

// ================================
// INTERCEPTOR 1: ADD ACCESS TOKEN
// ================================
api.interceptors.request.use(
    (config) => {
        const state = store.getState();

        const accessToken = state.auth.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ================================
// INTERCEPTOR 2: REFRESH TOKEN IF ACCESS TOKEN FAILS
// ================================
let isRefreshing = false;
let failedRequestsQueue = [];

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If access token expired → 401
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // queue the request
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = "Bearer " + token;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await axios.post(
                    "http://localhost:5000/api/auth/refresh",
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;

                // Update Redux state
                store.dispatch(setCredentials({ user: res.data.user, accessToken: newAccessToken }));

                // Retry pending requests
                failedRequestsQueue.forEach((req) => {
                    req.resolve(newAccessToken);
                });

                failedRequestsQueue = [];
                isRefreshing = false;

                // retry original request
                originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
                return api(originalRequest);
            } catch (err) {
                failedRequestsQueue.forEach((req) => req.reject(err));
                failedRequestsQueue = [];

                store.dispatch(logout());
                isRefreshing = false;

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
