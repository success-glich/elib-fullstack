
  import { Error } from "mongoose";
  import ReviewModel from "./review";

  export enum SentimentType{
    // eslint-disable-next-line no-unused-vars
    negative="NEGATIVE",
    
    // eslint-disable-next-line no-unused-vars
    positive="POSITIVE",
    // eslint-disable-next-line no-unused-vars
    neutral="NEUTRAL"

  }
  class ReviewService {
    constructor(private readonly reviewModel: typeof ReviewModel) {}
  
    async createReview(options: {comment:string,sentiment:SentimentType}) {
      try {
        const book = await this.reviewModel.create(options);
        return book;
      } catch (err) {
        
       throw new Error(err instanceof Error ? err.message:"error while inserting data on database server"  );
      }
    }
    async deleteReviewById(id:string){
      try {
        const book = await this.reviewModel.findByIdAndDelete(id);
        return book;
      } catch (err) {
        throw new Error("Error deleting book");
      }
    }
    async getReviewsByBookId(bookId:string) {
      try {
      const books = await this.reviewModel.find({
        book: bookId,
      });
        return books;
      } catch (err) {
        throw new Error("Error getting reviews");
      }
    }
    // async getBookById(id:string){
    //   try {
    //     const book = await this.bookModel.findById(id).populate("author");
    //     return book;
    //   } catch (err) {
    //     throw new Error("Error getting book");
    //   }
    // }
    // async updateBookById(id:string,options:updatedBook){
    //   try {
    //     const book = await this.bookModel.findByIdAndUpdate(id,options,{new:true});
    //     return book;
    //   } catch (err) {
    //     throw new Error("Error updating book");
    //   }
    // }
  
  
  }
  export default ReviewService;
  