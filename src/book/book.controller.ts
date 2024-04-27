import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../helper/ApiResponse";
import createHttpError from "http-errors";
import CloudinaryService from "../helper/cloudinary";
import BookModel from "./book.model";
import bookServices from ".";
import { User } from "../user/user.types";

interface UserRequest extends Request {
  user?: User | null;
}

const BookController = {
  createBook: async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const { genre, title } = req.body;

      if (
        [genre, title].some(
          (field) => field === undefined || field.trim() === ""
        )
      ) {
        next(createHttpError(400, "All field are required."));
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const coverImagePath = files?.coverImage[0]?.path;
      const filePath = files?.file[0]?.path;

      if (!coverImagePath || !filePath) {
        next(createHttpError(400, "Cover image & file are required."));
      }
      const coverImage = await CloudinaryService.uploadImage(coverImagePath);
      const file = await CloudinaryService.uploadImage(filePath);

      if (!coverImage || !file) {
        next(createHttpError(500, "Error uploading cover Image or file."));
      }

      const createdBook = await bookServices.createBook({
        genre,
        title,
        coverImage: coverImage?.secure_url!,
        file: file?.secure_url!,
      });

      if (!createdBook) {
        next(createHttpError(500, "Error creating book."));
      }

      res
        .status(201)
        .json(new ApiResponse(201, createdBook, "Book created successfully."));
    } catch (err) {
      if (err instanceof Error) {
        next(createHttpError(500, err.message));
      }
      next(createHttpError(500, "Error While creating book."));
    }
  },
  deleteBookById: async (req: UserRequest, res: Response) => {
    try {
      const { id } = req.params;

      //businessLogin
      const toBeDeletedBook = await BookModel.findById(id);
      if (!toBeDeletedBook) {
        return res
          .status(404)
          .json(new ApiResponse(404, null, "Book not found."));
      }
      if (toBeDeletedBook.author === req.user) {
        return res
          .status(403)
          .json(
            new ApiResponse(
              403,
              null,
              "You are not authorized to delete this book."
            )
          );
      }

      res
        .status(200)
        .json(new ApiResponse(200, null, "Book deleted successfully."));
    } catch (error) {}
  },
};
export default BookController;
