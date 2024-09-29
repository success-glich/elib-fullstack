import mongoose, {  Schema } from "mongoose";
import { Review } from "./review.types";



const reviewSchema: Schema<Review> = new mongoose.Schema(
  {
    comment:{
        type:String,
        required:true
    },
    name:{
      type:String,
      required:true
    },
    rating:{
        type:Number,
        required:true
    },
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User",
    //     required:true
    // },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },
    sentiment:{
        type:String,
        required:true,
    }
 
  },
  { timestamps: true }
);
const ReviewModel: mongoose.Model<Review> = mongoose.model("Review", reviewSchema);

export default ReviewModel;