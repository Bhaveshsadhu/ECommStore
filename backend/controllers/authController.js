import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateTokensAndSetCookie from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// export const createUser = asyncHandler(async (req, res, next) => {
//     // 1. decode request body
//     const { name, email, password } = req.body;

//     // 2. check required fields
//     if (!name || !email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     // 3. check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//         return res.status(400).json({ message: "User already exists" });
//     }

//     // 4. create user (password hashing will run by schema pre-save hook)
//     const user = await User.create({ name, email, password });


//     // 5. generate tokens (PASS USER ID, not email)
//     const accessToken = generateTokensAndSetCookie(res, user._id);

//     // 6. return safe user object
//     const safeUser = {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//     };

//     return res.status(201).json({
//         message: "User created successfully",
//         user: safeUser,
//         accessToken,
//     });
// })
export const createUser = asyncHandler(async (req, res, next) => {
    // 1. decode request body
    const { name, email, password, phone, address, role } = req.body;

    // 2. check required fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // 3. check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // 4. handle profile image (multer)
    let avatarUrl = null;
    if (req.file) {
        avatarUrl = `/uploads/${req.file.originalname}`;
        // if using cloudinary, I will update this later
    }

    // 5. create user (password hashing handled by schema pre-save hook)
    const user = await User.create({
        name,
        email,
        password,
        phone,
        address,
        role: role || "user",
        avatar: avatarUrl,
        createdAt: new Date(),
    });

    // 6. generate tokens
    const accessToken = generateTokensAndSetCookie(res, user._id);

    // 7. return safe user object
    const safeUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
    };

    return res.status(201).json({
        message: "User created successfully",
        user: safeUser,
        accessToken,
    });
});


export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. validate fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4. generate tokens
    const accessToken = generateTokensAndSetCookie(res, user._id);

    // 5. return safe user object
    const safeUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    res.json({
        message: "Login successful",
        user: safeUser,
        accessToken,
    });
});


export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({ message: "Logged out successfully" });
});

export const profile = asyncHandler(async (req, res) => {
    res.json({
        message: "User Profile",
        user: req.user
    });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    // 1. Check if refresh token exists
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        // 2. Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // 3. Optional: check if user still exists
        const user = await User.findById(decoded.userId).select("_id name email role");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // 4. Generate a new access token
        const newAccessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        // 5. Return the new access token
        res.json({
            message: "Access token refreshed",
            accessToken: newAccessToken,
        });

    } catch (error) {
        console.log("Refresh token error:", error.message);
        return res.status(401).json({ message: "Invalid refresh token" });
    }
});