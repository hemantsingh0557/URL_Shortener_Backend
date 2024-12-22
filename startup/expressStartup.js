import express from "express" ;
import { allRoutes } from "../routes/index.js";
import { validateSchema } from "../utils/helperFunctions.js";
import { authenticateToken } from "../middleware/index.js";
import { authRoutes } from "../routes/authRoute.js";
import passport from "passport";
import session from "express-session";
import config from "../config/index.js";


const handler = (controller) =>{
    return (req , res) => {
        const payload = {
            ...(res.body || {}) ,
            ...(res.params || {}) ,
            ...(res.query || {}) ,
            userId : req.userId ,
            files : req.files ,
        } ;
        controller(payload)
            .then(async(result) => {
                res.status(result.statusCode).json(result.data) ;
            })
            .catch(async(error) => {
                res.status(error.statusCode || 500 ).json({ message : error.message }) ;
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
        if( schema ) { middleware.push(validateSchema(schema)) ; }
        if( auth ) { middleware.push(authenticateToken) ; }
        app[method](path , ...middleware , handler(controller) ) ;
    });
}



