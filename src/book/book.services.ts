// interface CreateUserOptions {
//   name: string;
//   email: string;
//   password: string;

interface CreateBookOptions {
  genre: string;
  title: string;
  coverImage: string;
  file: string;
}
import BookModel from "./book.model";

// }
class BookService {
  constructor(private readonly bookModel: typeof BookModel) {}

  async createBook(options: CreateBookOptions) {
    try {
      const book = await this.bookModel.create(options);
      return book;
    } catch (err) {
      throw new Error("Error creating book");
    }
  }
  async deleteBookById(id:string){
    try {
      const book = await this.bookModel.findByIdAndDelete(id);
      return book;
    } catch (err) {
      throw new Error("Error deleting book");
    }
  }
  async getAllBooks() {
    try {
      const books = await this.bookModel.find();
      return books;
    } catch (err) {
      throw new Error("Error getting books");
    }
  }
  async getBookById(id:string){
    try {
      const book = await this.bookModel.findById(id);
      return book;
    } catch (err) {
      throw new Error("Error getting book");
    }
  }
  async updateBookById(id:string,options:CreateBookOptions){
    try {
      const book = await this.bookModel.findByIdAndUpdate(id,options,{new:true});
      return book;
    } catch (err) {
      throw new Error("Error updating book");
    }
  }


}
export default BookService;
