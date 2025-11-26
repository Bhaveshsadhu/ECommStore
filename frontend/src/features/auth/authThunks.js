import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCredentials, logout } from "./authSlice";
import api from "../../api/api.js";
import { toast } from "react-toastify";


// ================================
// 1. REGISTER USER
// ================================
// export const registerUser = createAsyncThunk(
//     "auth/registerUser",
//     async (formData, { rejectWithValue, dispatch }) => {
//         try {
//             const res = await api.post("/auth/register", formData, {
//                 withCredentials: true, // important for refreshToken cookie
//             });

//             // Save user into redux
//             dispatch(setCredentials({ user: res.data.user }));

//             return res.data.user;
//         } catch (err) {
//             return rejectWithValue(
//                 err.response?.data?.message || "Registration failed"
//             );
//         }
//     }
// );
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);


// ================================
// 2. LOGIN USER
// ================================
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const res = await api.post("/auth/login", formData, {
                withCredentials: true, // gets refreshToken cookie
            });

            // Store user globally
            dispatch(
                setCredentials({
                    user: res.data.user,
                    accessToken: res.data.accessToken,
                })
            );

            return res.data.user;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Invalid email or password"
            );
        }
    }
);

// ================================
// 3. LOAD USER (GET PROFILE)
// ================================
// This uses the accessToken stored in memory or localStorage
export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await api.get("/auth/profile", {
                withCredentials: true, // allows refresh route to work
            });

            dispatch(setCredentials({ user: res.data.user }));
            return res.data.user;
        } catch (err) {
            // If access token expired → backend will try refresh automatically (in axios interceptor)
            return rejectWithValue("Failed to load user");
        }
    }
);

// ================================
// 4. LOGOUT USER
// ================================
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            await api.post(
                "/auth/logout",
                {},
                {
                    withCredentials: true,
                }


            );

            dispatch(logout());
            return true;
        } catch (err) {
            return rejectWithValue("Logout failed");
        }
    }
);
