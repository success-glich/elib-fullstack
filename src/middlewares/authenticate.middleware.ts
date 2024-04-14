import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import UserModel from "../user/user.models";
import TokenHelper from "../helper/TokenHelper";
import { User } from "../user/user.types";


interface UserRequest extends Request {
    user?: User | null;
}
 

 const AuthMiddleware ={

    isAuthenticated : async (req:UserRequest,res:Response,next:NextFunction)=>{
        const bearerToken = req.headers.authorization;
        if(!bearerToken) {
            const error = createHttpError(401,'Bearer token is not provided.');
           return next(error);
              
        }
        const [bearer,token] =  bearerToken.split(' ');
        if(bearer !== 'Bearer') {
            const error = createHttpError(401, 'Bearer token is not provided.');
            return next(error);
        }
        const {sub} = token;

        try {

            // await UserModel.findById
         const {sub:id}  = await TokenHelper.verifyToken(token);
         const user = await UserModel.findById(id,"-password");
         req.user = user;
        next();
            
        } catch (err) {
            console.log("error message");
            if(err instanceof Error) 
            return next(createHttpError(401,err?.message))

            return next(createHttpError(401, 'Invalid token'));

            
        }
    }
}

export default AuthMiddleware;