
import jwt from "jsonwebtoken" ; 
import config from "../config/index.js";
import ipinfo from "ipinfo";

export const helperFunctions = {} ;


helperFunctions.generateJWTAccessToken = (jwtPayloadObject) => {
    return jwt.sign(jwtPayloadObject, config.auth.jwtSecret , { algorithm: "HS256" , expiresIn: "1h" });
};



helperFunctions.validateSchema = (schema) => {
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
helperFunctions.generateRandomString = (length= 8) => {
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * BASE62_CHARS.length);
        randomString += BASE62_CHARS[randomIndex];
    }
    return randomString;
};



helperFunctions.getGeolocation = async(ipAddress) => {
    try {
        if (ipAddress === "::1" || ipAddress === "127.0.0.1") {
            return {
                ip: ipAddress,
                city: "Localhost",
                region: "Localhost",
                country: "Localhost",
                postalCode: "Unknown",
                latitude: "0.0",
                longitude: "0.0",
                timezone: "Localhost",
            };
        }
        const token = config.ipinfo.token ; 
        const details = await ipinfo(ipAddress, token);
        return {
            ip: details.ip || "Unknown",
            city: details.city || "Unknown",
            region: details.region || "Unknown",
            country: details.country || "Unknown",
            postalCode: details.postal || "Unknown",
            latitude: details.loc ? details.loc.split(",")[0] : "Unknown",
            longitude: details.loc ? details.loc.split(",")[1] : "Unknown",
            timezone: details.timezone || "Unknown",
        };
    } catch (error) {
        console.error("Error fetching IP info:", error.message);
        return {
            ip: ipAddress || "Unknown",
            city: "Unknown",
            region: "Unknown",
            country: "Unknown",
            postalCode: "Unknown",
            latitude: "Unknown",
            longitude: "Unknown",
            timezone: "Unknown",
        };
    }
};




