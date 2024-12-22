
import dotenv from "dotenv" ;

dotenv.config() ; 

const config = {
    server: {
        port: process.env.PORT || 3000 ,
    },
    database: {
        url: process.env.DATABASE_URL ,
    },
    auth : {
        jwtSecret: process.env.JWT_SECRET ,
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackUrl: process.env.GOOGLE_CALLBACK_URL,
        },
    } ,
    session: {
        secret: process.env.SESSION_SECRET, 
    },
};

export default config;

