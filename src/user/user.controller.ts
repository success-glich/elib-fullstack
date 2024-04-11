import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

class UserController {
    static createUser = async(req:Request, res:Response, next:NextFunction)=>{
        // validation

        const {name,email,password} = req.body;

        if(!name || !email || !password){
            const error = createHttpError(400, 'All field are required.');
            return next(error);
        }
        // Process
        // Response
         res.json({
            message:"user created successfully"
         })
    }
}

export  default UserController;