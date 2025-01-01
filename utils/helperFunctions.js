
import jwt from "jsonwebtoken" ; 
import config from "../config/index.js";
import geoip from "geoip-lite";


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

const BASE62_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function generateRandomString(length= 8) {
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * BASE62_CHARS.length);
        randomString += BASE62_CHARS[randomIndex];
    }
    return randomString;
}


export const getGeolocation = (ipAddress) => {
    const geo = geoip.lookup(ipAddress);
    return geo ? {
        ip: ipAddress || "Unknown",
        city: geo.city || "Unknown",
        region: geo.region || "Unknown",
        country: geo.country || "Unknown",
        postalCode: geo.postal || "Unknown",
        latitude: geo.ll ? geo.ll[0] : "Unknown",
        longitude: geo.ll ? geo.ll[1] : "Unknown",
        timezone: geo.timezone || "Unknown",
    } : {};
};





