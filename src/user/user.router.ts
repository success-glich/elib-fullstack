import express from 'express';
import UserController from './user.controller';

const userRouter =express.Router();

//routes
userRouter.post('/register',UserController.createUser)

export default userRouter;