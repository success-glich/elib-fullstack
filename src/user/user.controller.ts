import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userServices from "./index";
import { ApiResponse } from "../helper/ApiResponse";
class UserController {
    static createUser = async(req:Request, res:Response, next:NextFunction)=>{
        // validation
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            const error = createHttpError(400, 'All field are required.');
            return next(error);
        }

        try{
           const {accessToken,registerUser} = await userServices.createUser({name,email,password});

            return res.status(200).json(new ApiResponse(201,{accessToken,registerUser},"User register successfully."))
        }catch(err){
            console.error("Error creating user:", err);

            const error = createHttpError(400);
            next(error);
        }

        
        // Process
        // Response
        
    }
}

export  default UserController;