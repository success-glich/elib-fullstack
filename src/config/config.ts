import {config as dotenv} from 'dotenv';
dotenv();

const _config ={
    port:process.env.PORT,
    databaseUri:process.env.MONGODB_URI,
    env:process.env.NODE_ENV,
    jwtSecret:process.env.JWT_SECRET,
    cloudApiKey:process.env.CLOUDINARY_API_KEY,
    cloudApiSecret:process.env.CLOUDINARY_API_SECRET,
    cloudName:process.env.CLOUDINARY_NAME,
}

export const config = Object.freeze(_config); 