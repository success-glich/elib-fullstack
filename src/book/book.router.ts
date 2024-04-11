import express from 'express';
import BookController from './book.controller';


const bookRouter =express.Router();

//routes
bookRouter.post('/',BookController.createBook);
// bookRouter.post('/login',UserController.loginUser);

export default bookRouter;