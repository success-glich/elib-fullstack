import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Book } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BookCard = ({book}:{book:Book}) => {
  return (
    <>
  
  <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
      <Image
        src={book.coverImage}
        alt="Book Cover"
        width="200"
        height="300"
        className="w-full h-[300px] object-cover"
        style={{ aspectRatio: "200/300", objectFit: "cover" }}
      />
      <div className="p-6 bg-background">
        <h3 className="text-xl font-bold mb-2">{book.title}</h3>
        <p className="text-muted-foreground mb-4">{book.author.name}</p>
        <p className="text-sm leading-relaxed">
         {book.description}
        </p>
        <Link href={`/books/${book._id}`}><Button className="rounded-sm mt-5">Read More</Button> </Link>
      </div>
  </Card>
        </>
  )
}

export default BookCard