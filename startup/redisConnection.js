import redisClient from "../config/redis.js";

export const redisConnection = async() => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis successfully.");
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
        process.exit(1); 
    }
};
