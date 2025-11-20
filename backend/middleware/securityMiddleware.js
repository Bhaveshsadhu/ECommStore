// backend/middleware/securityMiddleware.js
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";

export const securityMiddleware = (app) => {
    app.use(helmet());

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 200, // tune as needed
        message: "Too many requests, please try again later",
    });
    app.use("/api", limiter);

    // app.use(mongoSanitize());
    // app.use(xssClean());
};
