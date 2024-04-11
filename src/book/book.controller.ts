import { NextFunction, Request, Response } from "express"


const BookController ={
    
    createBook: async (req:Request, res:Response, next:NextFunction)=>{

        res.status(200).json({
            message: "createBook"
        })
    }

}
export default BookController;