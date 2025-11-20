import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Read token from Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    try {
        // 2. Verify accessToken
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 3. Fetch user (excluding password)
        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        // 4. If expired → let frontend refresh token
        return res.status(401).json({ message: "Invalid or expired token" });
    }
});
