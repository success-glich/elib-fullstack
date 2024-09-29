import { Book } from '@/types';
import React, { useEffect } from 'react'
import BookCard from './BookCard';

const BookList = async () => {
  let books: Book[] = [];
  try {
    const response = await fetch(`${process.env.BACKEND_API}/books`, { cache: "no-store" });
    if (!response.ok) throw new Error("Error while fetching the books.")
    const { data: resData }: { data: Book[] } = await response.json();
    books = resData;
    console.log("books",books)
  } catch (e) {
    console.log(e);
  }



  return (
    <div className="grid grid-cols-3  gap-4">

      {books.map((book: Book) => (
        <BookCard key={book._id} book={book} />
      ))}

    </div>
  )
}

export default BookList