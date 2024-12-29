import Joi from "joi";
import { shortUrlController } from "../controllers/index.js";


export const shortUrlRoutes = [
    {
        method: "post",
        path : "/api/shorten",
        schema : {
            body : Joi.object({
                longUrl: Joi.string().required(),   
                customAlias : Joi.string(),
                topic: Joi.string(), 
            }).required(),
        },
        auth : true ,
        controller : shortUrlController.createShortUrl,
    } ,
] ;