import {config as dotenv} from 'dotenv';
dotenv();

const _config ={
    port:process.env.PORT,
    databaseUri:process.env.MONGODB_URI
}

export const config = Object.freeze(_config); 