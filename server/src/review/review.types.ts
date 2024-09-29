import { User } from "../user/user.types";
import { Book } from "../book/book.types";

export interface Review{

    _id:string;
    comment:string;
    // user:User;
    name:string;
    rating:number;
    book:Book
    sentiment:string;
    createdAt:Date;
    updatedAt:Date;

}

export interface updatedBook {
    genre: string;
    title: string;
    coverImage?: string;
    file?: string;
  }