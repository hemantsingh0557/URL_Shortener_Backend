import express from "express" ;
import { allRoutes } from "../routes/index.js";
import { validateSchema } from "../utils/helperFunctions.js";
import { authenticateToken } from "../middleware/index.js";



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
    app.use(express.json()) ;
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



