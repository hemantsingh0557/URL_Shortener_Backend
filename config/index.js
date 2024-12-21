
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
    } ,
};

export default config;

