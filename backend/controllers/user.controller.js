import Redis from 'ioredis';
import { deleteRefreshToken, getStoredRefreshToken, storeRefreshToken } from '../database/redis.js';
import User from '../models/user.model.js';
import generateTokens, { generateAccessTokens, verifyRefreshToken } from '../utils/tokens.js';
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
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                status: "fail",
                message: "User with this email already exists."
            });
        }

        // Create new user
        const newUser = await User.create(req.body);

        if (newUser?._id) {
            const { accessToken, refreshToken } = generateTokens(res, newUser._id);
            await storeRefreshToken(newUser._id.toString(), refreshToken);
            newUser.password = undefined; // Hide password in response
            return res.status(201).json(
                {
                    status: "success",
                    message: "User registered successfully",
                    data: newUser,
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

export const userLogin = async (req, res, next) => {
    try {
        // 1. Validate user credentials (email and password)
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Email and password are required."
            });
        }
        // const user = await User.findone({ email })
        const user = await User.findOne({ email });

        if (user && await user.comparePassword(password)) {
            const { accessToken, refreshToken } = generateTokens(res, user._id);
            await storeRefreshToken(user._id.toString(), refreshToken);
            user.password = undefined; // Hide password in response
            return res.status(200).json(
                {
                    status: "success",
                    message: "User logged in successfully",
                    data: user,
                    tokens: {
                        "accessToken": accessToken,
                        "refreshToken": refreshToken
                    }
                }
            );
        } else {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password."
            });
        }
    } catch (error) {
        next(error);
    }


}

export const userLogout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (refreshToken) {
            const decode = verifyRefreshToken(refreshToken);
            await deleteRefreshToken(decode.userId);//delete from redis
            res.clearCookie("refreshToken") //clear from request
            res.clearCookie("accessToken")//clear from request

            res.status(200).json({
                status: "success",
                message: "User logged out successfully",
                data: decode
            })
        }
        else {
            res.status(400).json({
                status: "fail",
                message: "Refresh token not found"
            });
        }
    } catch (error) {
        next(error);
    }
}
export const reCreateAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                status: "fail",
                message: "Refresh token not found"
            });
        }

        const decode = verifyRefreshToken(refreshToken);
        console.log(decode)
        if (!decode) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid refresh token"
            });
        }
        const storedToken = await getStoredRefreshToken(decode.userId);

        if (storedToken !== refreshToken) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid refresh token"
            });
        }

        const { accessToken } = generateAccessTokens(res, decode.userId);

        res.status(200).json({
            status: "success",
            message: "Access token re-created successfully",
            tokens: {
                accessToken
            }
        });
    } catch (error) {
        next(error);
    }
}
export const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "User profile retrieved successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
}