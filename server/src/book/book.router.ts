import express from 'express';
import BookController from './book.controller';
import multer from 'multer';
import path from 'path';
import { upload } from '../middlewares/multer.middleware';
import AuthMiddleware from '../middlewares/authenticate.middleware';


const bookRouter =express.Router();

bookRouter.get("/",BookController.getAllBooks);
bookRouter.get("/:bookId", BookController.getBookById);

bookRouter.use(AuthMiddleware.isAuthenticated);

bookRouter
.route("/")
.post( 
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
 BookController.createBook
)


  bookRouter
  .route("/:bookId")
  .put(
    upload.fields([{
    name:"coverImage",maxCount:1
  },{
    name:"file",maxCount:1
  }]),
  BookController.updateBookById
  ).delete(BookController.deleteBookById)


// bookRouter.post('/login',UserController.loginUser);

export default bookRouter;