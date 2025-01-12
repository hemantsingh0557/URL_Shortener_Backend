import express from "express";
import { dbConnection } from "./startup/dbConnection.js";
import { expressStartup } from "./startup/expressStartup.js";
import config from "./config/index.js";
import { redisConnection } from "./startup/redisConnection.js";
import cors from "cors";

const app = express();

const allowedOrigins = [
    `http://localhost:${config.server.port}`,
    "https://url-shortener-backend-api.vercel.app",
    "http://localhost:8080",
    // Add any frontend URLs that will access this API
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {return callback(null, true);}
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "X-Powered-By", "ETag"],
    maxAge: 86400, // 24 hours
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