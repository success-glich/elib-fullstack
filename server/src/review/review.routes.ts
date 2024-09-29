import express from 'express';
// import AuthMiddleware from '../middlewares/authenticate.middleware';
import { ReviewController } from './review.controller';


const reviewRouter =express.Router();

// reviewRouter.use(AuthMiddleware.isAuthenticated);

reviewRouter
.route("/:bookId")
.get(ReviewController.getReviewsByBookId)
.post( 
 ReviewController.createReview
)



export default reviewRouter;