import {config as dotenv} from 'dotenv';
dotenv();

const _config ={
    port:String(process.env.PORT),
    databaseUri:String(process.env.MONGODB_URI),
    env:String(process.env.NODE_ENV),
    jwtSecret:String(process.env.JWT_SECRET),
    cloudinaryApiKey:String(process.env.CLOUDINARY_API_KEY),
    cloudinaryApiSecret:String(process.env.CLOUDINARY_API_SECRET),
    cloudinaryName:String(process.env.CLOUDINARY_NAME),
}

export const config = Object.freeze(_config); 