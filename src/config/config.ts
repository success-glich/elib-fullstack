import {config as dotenv} from 'dotenv';
dotenv();

const _config ={
    port:process.env.PORT,
    databaseUri:process.env.MONGODB_URI,
    env:process.env.NODE_ENV,
    jwtSecret:process.env.JWT_SECRET,
}

export const config = Object.freeze(_config); 