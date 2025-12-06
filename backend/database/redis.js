import Redis from "ioredis";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;

if (!redisUrl) {
    console.error("Missing UPSTASH_REDIS_REST_URL in environment.");
    process.exit(1);
}

// Upstash provides a TLS-enabled Redis endpoint; ioredis understands the URI directly.
const client = new Redis(redisUrl, { tls: {} });

client.on("error", (err) => {
    console.error("Redis connection error:", err);
});



export const storeRefreshToken = async (userId, refreshToken) => {
    await client.set(`refreshToken:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // Expires in 7 days
}
export const deleteRefreshToken = async (userId) => {
    await client.del(`refreshToken:${userId}`);
}
export const getStoredRefreshToken = async (userId) => {
    return await client.get(`refreshToken:${userId}`);
}