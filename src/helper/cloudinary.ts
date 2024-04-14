import {v2 as cloudinary} from 'cloudinary';
import { config } from '../config/config';
import fs from "node:fs";

cloudinary.config({
    cloud_name:config.cloudinaryName,
    api_key:config.cloudinaryApiKey,
    api_secret:config.cloudinaryApiSecret
});



class CloudinaryService {

     static async uploadImage(localFilePath:string){
       
        try{
            if(!localFilePath) return null;
            const  response = await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto",
                folder:"elib"
            })
            console.log('file is uploaded on cloudinary',response);
            fs.unlinkSync(localFilePath);
            return response;
        }catch(err){
          // * remove the locally saved temporary file as the upload operation got fail
          fs.unlinkSync(localFilePath);
          console.log("error in cloudinary", err);
          return null;
        }
       
    }
    static async removeOnCloudinary(publicId:string){
        try{
            const response = await cloudinary.uploader.destroy(publicId);
            console.log("file is removed from cloudinary", response);
            return response;
        }catch(err){
            console.log("error in cloudinary", err);
            return null;
        }
    }
}

export default CloudinaryService;