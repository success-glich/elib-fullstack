import { Book } from '@/types';
import React from 'react'
import BookCard from './BookCard';

const BookList =  async () => {

 const response = await fetch(`${process.env.BACKEND_API}/books`,{cache:"no-store"});
  if(!response.ok) throw new Error("Error while fetching the books.")
 const {data:books}:{data:Book[]} = await response.json();
  
  return (
    <div className="grid grid-cols-3  gap-4">

          {books.map((book:Book) => (
              <BookCard key={book._id} book={book}/>
          ))}  
        
    </div>
  )
}

export default BookList