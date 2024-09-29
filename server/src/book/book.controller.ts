import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../helper/ApiResponse";
import createHttpError from "http-errors";
import CloudinaryService from "../helper/cloudinary";
import BookModel from "./book.model";
import bookServices from ".";
import { User } from "../user/user.types";
import { Express } from "express";
import { updatedBook } from "./book.types";

interface UserRequest extends Request {
  user?: User | null;
}

const BookController = {
  createBook: async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const { genre, title,description} = req.body;

      if (
        [genre, title,description].some(
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

      // * business logic
      const createdBook = await bookServices.createBook({
        genre,
        title,
        description,
        author:req.user?._id as string,
        coverImage: coverImage?.secure_url as string,
        file: file?.secure_url as string,
      });
      if (!createdBook) {
        next(createHttpError(500, "Error creating book."));
      }
     return res
        .status(201)
        .json(new ApiResponse(201, createdBook, "Book created successfully."));
    } catch (err) {
      console.log("Error while creating books::",err)
      if (err instanceof Error) {
        next(createHttpError(500, err.message));
      }
      next(createHttpError(500, "Error While creating book."));
    }
  },

  deleteBookById: async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { bookId } = req.params;

      //businessLogin
      const toBeDeletedBook = await BookModel.findById(bookId);
      console.log(" to be delete",toBeDeletedBook)
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

      await CloudinaryService.removeOnCloudinary(toBeDeletedBook.coverImage);
      await CloudinaryService.removeOnCloudinary(toBeDeletedBook.file);


      await bookServices.deleteBookById(toBeDeletedBook._id);

      res
        .status(200)
        .json(new ApiResponse(200, null, "Book deleted successfully."));
    } catch (err) {
      if (err instanceof Error) {
        next(createHttpError(500, err.message));
      }
      next(createHttpError(500, "Error While creating book."));
    }
  },
  updateBookById: async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { bookId } = req.params;
      const { genre, title } = req.body;

      const toBeUpdatedBook: updatedBook = { genre, title };

      const book = await bookServices.getBookById(bookId);

      if (!book) {
        next(createHttpError(404, "Book not found!"));
      }

      // const createdBook = await bookServices.createBook({
      //   genre,
      //   title,
      //   coverImage: coverImage?.secure_url!,
      //   file: file?.secure_url!,
      // });

      if (
        [genre, title].some(
          (field) => field === undefined || field.trim() === ""
        )
      ) {
        next(createHttpError(400, "All field are required"));
      }
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const coverImagePath = files?.coverImage[0]?.path;
      const filePath = files?.file[0]?.path;

      if (coverImagePath && filePath) {
        await CloudinaryService.removeOnCloudinary(book?.coverImage as string);
        await CloudinaryService.removeOnCloudinary(book?.file as string);

        const coverImage = await CloudinaryService.uploadImage(coverImagePath);
        const file = await CloudinaryService.uploadImage(filePath);

        toBeUpdatedBook["coverImage"] = coverImage?.secure_url || "";
        toBeUpdatedBook["file"] = file?.secure_url || "";
      } else if (coverImagePath) {
        await CloudinaryService.removeOnCloudinary(book?.coverImage as string);

        const coverImage = await CloudinaryService.uploadImage(coverImagePath);

        toBeUpdatedBook["coverImage"] = coverImage?.secure_url || "";
      } else if (filePath) {
        await CloudinaryService.removeOnCloudinary(book?.file as string);

        const file = await CloudinaryService.uploadImage(filePath);

        toBeUpdatedBook["file"] = file?.secure_url || "";
      }

      const newUpdatedBook = bookServices.updateBookById(
        bookId,
        toBeUpdatedBook
      );

      return res
        .status(200)
        .json(
          new ApiResponse(200, newUpdatedBook, "Book updated successfully.")
        );
    } catch (err) {
      console.log("Error while updating book!");
      if (err instanceof Error) {
        next(createHttpError(500, err.message));
      }
      next(createHttpError(500, "Error While updating book."));
    }
  },
  getAllBooks: async (
    _: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      
      //  delaying server
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const allBooks = await bookServices.getAllBooks();

      return res.status(200).json(
        new ApiResponse(200,allBooks,"Books found successfully!",)
      )
    } catch (err) {
      console.log("Error while updating book!");
      if (err instanceof Error) {
        next(createHttpError(500, err.message));
      }
      next(createHttpError(500, "Error While listing book."));
    }
  },
  getBookById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {bookId}= req.params;
      
      const book = await bookServices.getBookById(bookId);

      return res.status(200).json(
        new ApiResponse(200,book,"Books found successfully!",)
      )
    } catch (err) {
      console.log("Error while getting book by id!");
      if (err instanceof Error) {
        next(createHttpError(500, err.message));
      }
      next(createHttpError(500, "Error While updating book."));
    }
  },
  
};
export default BookController;
