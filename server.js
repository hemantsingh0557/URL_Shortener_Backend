
import express from "express" ;
import { dbConnection } from "./startup/dbConnection.js";
import { expressStartup } from "./startup/expressStartup.js";
import config from "./config/index.js";

// eslint-disable-next-line no-unused-vars
import passport from "./config/passport.js";


const app = express() ;

const startServer = async() => {
    await dbConnection() ;
    await expressStartup(app) ;
    app.listen(config.server.port , ()=> {
        console.log(`Server is running on http://localhost:${config.server.port}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start the server:", error);
});

