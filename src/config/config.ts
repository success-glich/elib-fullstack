import {config as dotenv} from 'dotenv';
dotenv();

const _config ={
    port:process.env.PORT
}

export const config = Object.freeze(_config); 