
import express from "express";
import { dbConnection } from "./startup/dbConnection.js";
import { expressStartup } from "./startup/expressStartup.js";
import config from "./config/index.js";
import { redisConnection } from "./startup/redisConnection.js";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
    }),
);

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

