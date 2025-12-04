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

// try {
//     await client.set("foo", "bar");
//     const value = await client.get("foo");
//     console.log("Redis test value:", value);
// } finally {
//     client.disconnect();
// }

export const storeRefreshToken = async (refreshToken) => {
    await client.set("refreshToken:", refreshToken, "EX", 7 * 24 * 60 * 60); // Expires in 7 days
}