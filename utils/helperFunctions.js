


import jwt from "jsonwebtoken" ; 
import config from "../config/index.js";


export const generateJWTAccessToken = (jwtPayloadObject) => {
    return jwt.sign(jwtPayloadObject, config.auth.jwtSecret , { algorithm: "HS256" , expiresIn: "1h" });
};



export const validateSchema = (schema) => {
    return (req , res , next) => {
        if (schema.params) {
            const { error } = schema.params.validate(req.params);
            if (error) {
                return res.status(400).json({
                    error: error.details.map((err) => err.message),
                });
            }
        }
        if (schema.body) {
            const { error } = schema.body.validate(req.body );
            if (error) {
                return res.status(400).json({
                    error: error.details.map((err) => err.message),
                });
            }
        }
        if (schema.query) {
            const { error } = schema.query.validate(req.query);
            if (error) {
                return res.status(400).json({
                    error: error.details.map((err) => err.message),
                });
            }
        }
        if (schema.headers) {
            const { error } = schema.headers.validate(req.headers );
            if (error) {
                return res.status(400).json({
                    error: error.details.map((err) => err.message),
                });
            }
        }
        next();
    } ;
} ;








