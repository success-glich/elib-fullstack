interface CreateBookOptions {
  genre: string;
  title: string;
  coverImage: string;
  author:string;
  description:string;
  file: string;
}

import { Error } from "mongoose";
import BookModel from "./book.model";
import { updatedBook } from "./book.types";

// }
class BookService {
  constructor(private readonly bookModel: typeof BookModel) {}

  async createBook(options: CreateBookOptions) {
    try {
      const book = await this.bookModel.create(options);
      return book;
    } catch (err) {
      
     throw new Error(err instanceof Error ? err.message:"error uploading data on database server"  );
    }
  }
  async deleteBookById(id:string){
    try {
      const book = await this.bookModel.findByIdAndDelete(id);
      return book;
    } catch (err) {
      throw new Error("Error deleting book");
    }
  }
  async getAllBooks() {
    try {
      const books = await this.bookModel.find().populate("author");
      return books;
    } catch (err) {
      throw new Error("Error getting books");
    }
  }
  async getBookById(id:string){
    try {
      const book = await this.bookModel.findById(id).populate("author reviews");
      return book;
    } catch (err) {
      throw new Error("Error getting book");
    }
  }
  async updateBookById(id:string,options:updatedBook){
    try {
      const book = await this.bookModel.findByIdAndUpdate(id,options,{new:true});
      return book;
    } catch (err) {
      throw new Error("Error updating book");
    }
  }


}
export default BookService;
