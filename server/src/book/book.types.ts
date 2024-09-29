import { Review } from "../review/review.types";
import { User } from "../user/user.types";


export interface Book{

    _id:string;
    title:string;
    author:User;
    genre:string;
    description:string;
    coverImage:string;
    file:string;
    reviews:Review;
    createdAt:Date;
    updatedAt:Date;

}

export interface updatedBook {
    genre: string;
    title: string;
    coverImage?: string;
    file?: string;
  }