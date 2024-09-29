import mongoose, {Schema } from "mongoose";
import { Book } from "./book.types";

const bookSchema: Schema<Book> = new mongoose.Schema(
  {
    title:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    coverImage:{
        type:String,
        required:true
    },
    description:{

      type:String,
      required:true
    },
    file:{
        type:String,
        required:true
    },
    genre:{
         type:String,
         required:true
    },
    reviews:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review",
    }]
  
  },
  { timestamps: true }
);
const BookModel: mongoose.Model<Book> = mongoose.model("Book", bookSchema);

export default BookModel;