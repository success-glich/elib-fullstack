import { NextFunction, Request, Response } from "express"
import { ApiResponse } from "../helper/ApiResponse";
import createHttpError from "http-errors";
import CloudinaryService from "../helper/cloudinary";
import BookModel from "./book.model";


const BookController ={
    
    createBook: async (req:Request, res:Response, next:NextFunction)=>{

        try{
            
        const {genre,  title} = req.body;

        if([genre,title].some(field=>field===undefined || field.trim()==='')){
            
            next(createHttpError(400,'All field are required.'));
        }

        const files = req.files as{[fieldname:string]:Express.Multer.File[]}
      
        // if (
        //     req.files &&
        //     Array.isArray(req.files.coverImage) &&
        //     req.files.coverImage.length > 0
        //   ) {
        //     coverImageLocalPath = req.files.coverImage[0].path;
        //   }

        const coverImagePath = files?.coverImage[0]?.path;
        const filePath = files?.file[0]?.path;

        if(!coverImagePath || !filePath){
            next(createHttpError(400, 'Cover image & file are required.'));
        }
        const coverImage =await CloudinaryService.uploadImage(coverImagePath);
        const file = await CloudinaryService.uploadImage(filePath);

        if(!coverImage || !file){
            next(createHttpError(500, 'Error uploading cover Image or file.'));
        }

      const createdBook=  await BookModel.create({
            genre,
            title,
            coverImage:coverImage?.secure_url,
            file:file?.secure_url
        })

        if(!createdBook){
            next(createHttpError(500, 'Error creating book.'));
        }
        
     

        res.status(201).json( new ApiResponse(201, createdBook, 'Book created successfully.' ));
    }catch(err){

        if(err instanceof Error){
            next(createHttpError(500, err.message));
        }
        next(createHttpError(500, 'Error creating book.'));
    }
    
    },

   

}
export default BookController;