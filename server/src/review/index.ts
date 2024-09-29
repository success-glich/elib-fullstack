import ReviewModel from "./review";
import ReviewService from "./review.services";

const reviewService = new ReviewService(ReviewModel);
export default reviewService;