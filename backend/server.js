import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { securityMiddleware } from "./middleware/securityMiddleware.js";
import path from "path";


dotenv.config();
const app = express();

// DB
connectDB();

// Core middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Security middlewares (helmet, xss-clean, mongo-sanitize, rate-limit)
securityMiddleware(app);


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// Routes
app.use("/api/auth", authRoutes);


// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running in http://localhost:${PORT}`)
);
