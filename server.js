
import express from "express";
import { dbConnection } from "./startup/dbConnection.js";
import { expressStartup } from "./startup/expressStartup.js";
import config from "./config/index.js";
import { redisConnection } from "./startup/redisConnection.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: ["http://localhost:3030", "https://url-shortener-backend-api.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

const startServer = async() => {
    await dbConnection();
    await redisConnection();
    await expressStartup(app);
    app.listen(config.server.port, () => {
        console.log(`Server is running on http://localhost:${config.server.port}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start the server:", error);
});

