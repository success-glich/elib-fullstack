import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/user.router";
const app = express();

// routes HTTP Method -> PUT,POST, PUT,PATCH, DELETE
app.get('/',(req,res)=>{
        //   const error=  throw new Error('something wen wrong')
    const error = createHttpError(400,"something went wrong")
    throw error;
    res.status(200).json({
        success:true,
        message:"Welcome to elib apis."
    })

})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users",userRouter);

// * Global error handler
 app.use(globalErrorHandler);

export default app;