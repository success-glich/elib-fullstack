import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../helper/ApiResponse";
import createHttpError from "http-errors";
import { User } from "../user/user.types";
import reviewService from ".";
import { SentimentType } from "./review.services";
import { analyzeSentiment, getSentiment } from "../utils/getSentimental";

interface UserRequest extends Request {
  user?: User | null;
}
interface IReview {
    bookId:string,
    name:string,
    rating:string,
    comment:string
}
export class ReviewController {
    static async createReview(req:UserRequest,res:Response,next:NextFunction){
        try {
            const {comment,name,rating}= req.body as IReview;
            const {bookId} = req.params;
            if([comment,name,rating].some((field)=>field.trim()==="" || field===undefined)){
                next(createHttpError(400, "All fields are required."));
            }
          
            // const sentiment=SentimentType.positive;
            // const classifier = await loadAndTrainModel();
            // const sentiment = classifier.predict(comment) as SentimentType;
            const sentimentScore =getSentiment(comment);
            const sentiment = analyzeSentiment(sentimentScore) as SentimentType;
            

            const option ={
                name,
                book:bookId,
                rating:Number(rating),
                comment,
                sentiment 
            }

            // reviewService.c
         const review= await  reviewService.createReview(option);

         res.status(201);
         return res.json(new ApiResponse(201,review,"Review created successfully!"));

        } catch (error) {

            if (error instanceof Error)
               return next(createHttpError(500,error?.message));

            return next(createHttpError(500,"Something went wrong"));
            
        }

    }

    static async getReviewsByBookId(req:UserRequest,res:Response,next:NextFunction){
        try {
            const {bookId}= req.params;
            console.log("bookId",bookId);
            const reviews= await reviewService.getReviewsByBookId(bookId);
            console.log("reviews",reviews);
            res.status(200);
            return res.json(new ApiResponse(200, reviews, "Reviews fetched successfully!"));
        } catch (error) {
            if (error instanceof Error)
               return next(createHttpError(500, error?.message));

            return next(createHttpError(500, "Something went wrong"));
        }
    }
}

