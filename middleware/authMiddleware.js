import jwt from "jsonwebtoken";
import config from "../config/index.js" ;


export async function authenticateToken(req , res , next) {
    try {
        const token = await req.headers.authorization.split(" ")[1] ;
        const decodedToken = jwt.verify(token , config.auth.jwtSecret ) ;
        const { userId } = decodedToken ;
        req.userId = userId ;
        next() ;
    }
    catch(error) {
        res.status(401).json({ error }) ;
    }
}


