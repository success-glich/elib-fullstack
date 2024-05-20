import BookModel from "./book.model";
import BookService from "./book.services";

const bookServices = new BookService(BookModel);
export default bookServices;