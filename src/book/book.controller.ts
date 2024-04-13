import { NextFunction, Request, Response } from "express"


const BookController ={
    
    createBook: async (req:Request, res:Response, next:NextFunction)=>{
            
        const files = req.files as{[fieldname:string]:Express.Multer.File[]}
        console.log('files',files );
        // console.log(req.files)
        res.status(200).json({
            message: "createBook"
        })
    }

}
export default BookController;