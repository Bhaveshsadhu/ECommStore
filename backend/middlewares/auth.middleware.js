import User from "../models/user.model.js";
import { verifyAccessToken } from "../utils/tokens.js";

export const protectRoutes = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized: Access token not found"
            });
        }
        const decoded = verifyAccessToken(accessToken);
        if (!decoded) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized: Invalid or expired access token"
            });
        }
        // console.log("decoded", decoded)
        const retriveUser = await User.findById(decoded.userId);
        // console.log("Retrived User:", retriveUser);
        if (!retriveUser) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized: User not found"
            });
        }
        req.user = retriveUser;

        next();
    } catch (error) {
        next(error)
    }

}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    status: "fail",
                    message: "Forbidden: You do not have permission"
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};
