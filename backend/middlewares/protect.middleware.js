import User from "../models/user.model.js";
import { verifyAccessToken } from "../utils/tokens.js";

const protect = async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return res.status(401).json({
            status: "fail",
            message: "Access token not found"
        });
    }
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid or expired access token"
        });
    }
    // console.log("decoded", decoded)
    const retriveUser = await User.findById(decoded.userId);
    // console.log("Retrived User:", retriveUser);
    if (!retriveUser) {
        return res.status(401).json({
            status: "fail",
            message: "User not found"
        });
    }
    req.user = retriveUser;

    next();

}
export default protect;