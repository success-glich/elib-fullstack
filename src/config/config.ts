import {config as dotenv} from 'dotenv';
dotenv();

const _config ={
    port:process.env.PORT,
    databaseUri:process.env.MONGODB_URI,
    env:process.env.NODE_ENV,
}

export const config = Object.freeze(_config); 