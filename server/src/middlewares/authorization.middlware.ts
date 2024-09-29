import { NextFunction, Request, Response } from "express";
import { User, USER_ROLE } from "../user/user.types";

export type Role = USER_ROLE ;

interface UserRequest extends Request {
    user?: User | null;
  }
  
export const authorizeRole = (...roles:Role[])=>{
    return (req:UserRequest,res:Response,next:NextFunction)=>{
        // console.log(req?.
        if(!roles.includes(req?.user?.role as USER_ROLE)){
            return res.status(403).json({message:"Forbidden"})
        }
        next();
    }

}