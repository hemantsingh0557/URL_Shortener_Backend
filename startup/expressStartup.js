import express from "express" ;
import { allRoutes } from "../routes/index.js";
import { helperFunctions } from "../utils/helperFunctions.js";
import { authenticateToken } from "../middleware/index.js";
import { authRoutes } from "../routes/authRoute.js";
import passport from "../config/passport.js";
import session from "express-session";
import config from "../config/index.js";
import { UAParser } from "ua-parser-js";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerPath = path.join(__dirname, "../docs/swagger.json");

const handler = (controller) =>{
    return (req , res) => {
        const userAgentString = req.headers["user-agent"];
        const userIpAddress = req.headers["x-forwarded-for"] || req.ip;
        const uaParser = new UAParser();
        const userAgentData = uaParser.setUA(userAgentString).getResult();
        const userDeviceType = userAgentData.device.type || "desktop"; // Mobile, tablet, or desktop
        const userOsType = userAgentData.os.name || "Unknown"; //  Windows, Android, macOS, iOS
        const payload = {
            ...(req.body || {}),
            ...(req.params || {}),
            ...(req.query || {}),
            userId: req.userId, 
            userIpAddress, 
            userDeviceType, 
            userOsType, 
        };
        controller(payload)
            .then(async(result) => {
                if (result.data && result.data.redirectUrl) {
                    return res.redirect(result.data.redirectUrl) ; 
                }
                res.status(result.statusCode).json(result) ;
            })
            .catch(async(error) => {
                res.status(error.statusCode || 500 ).json(error) ;
            }) ;
    } ;
} ;


export async function expressStartup(app) {

    app.use(session({
        secret: config.session.secret ,
        resave: false,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.json()) ;
    app.use("/auth", authRoutes); 
    app.get( "/" , (req, res) => {
        res.send("This is URL Shortener Backend") ;
    } );
    allRoutes.forEach((route) => {
        const { method, path, schema = {}, auth = false, controller } = route;
        const middleware = [] ;
        if( schema ) { middleware.push(helperFunctions.validateSchema(schema)) ; }
        if( auth ) { middleware.push(authenticateToken) ; }
        app[method](path , ...middleware , handler(controller) ) ;
    });
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}



