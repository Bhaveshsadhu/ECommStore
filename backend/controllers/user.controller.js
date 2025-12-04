import { storeRefreshToken } from '../database/redis.js';
import user from '../models/user.model.js';
import generateTokens from '../utils/tokens.js';
export const userRegistration = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Name, email, and password are required."
            });
        }
        // check if user already exists logic can be added here
        const existUser = await user.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                status: "fail",
                message: "User with this email already exists."
            });
        }

        // Create new user
        const newUser = await user.create(req.body);

        if (newUser?._id) {
            const { accessToken, refreshToken } = generateTokens(res, newUser._id);
            await storeRefreshToken(newUser._id.toString(), refreshToken);
            newUser.password = undefined; // Hide password in response
            return res.status(201).json(
                {
                    status: "success",
                    message: "User registered successfully",
                    newUser,
                    tokens: {
                        "accessToken": accessToken,
                        "refreshToken": refreshToken
                    }
                }
            );
        }

    } catch (error) {
        console.error("Registration Error:", error);
        next(error);
    }
}

export const userLogin = (req, res) => {
    res.send("User Login Endpoint");
}

export const userLogout = (req, res) => {
    res.send("User Logout Endpoint");
}