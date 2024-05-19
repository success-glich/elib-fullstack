import express from 'express';
import UserController from './user.controller';

const userRouter =express.Router();

//routes
userRouter.post('/register',UserController.createUser);
userRouter.post('/login',UserController.loginUser);

export default userRouter;