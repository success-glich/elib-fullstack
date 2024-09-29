import express from 'express';
import BookController from './book.controller';
import { upload } from '../middlewares/multer.middleware';
import AuthMiddleware from '../middlewares/authenticate.middleware';
import { authorizeRole } from '../middlewares/authorization.middlware';
import { USER_ROLE } from '../user/user.types';


const bookRouter =express.Router();

bookRouter.get("/",BookController.getAllBooks);
bookRouter.get("/:bookId", BookController.getBookById);

bookRouter.use(AuthMiddleware.isAuthenticated);
bookRouter.use(authorizeRole(USER_ROLE.admin));

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