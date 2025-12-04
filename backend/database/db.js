import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("Missing MONGO_URI environment variable.");
            process.exit(1);
        }

        // console.log("MONGO URI", process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}
export default connectDB;
