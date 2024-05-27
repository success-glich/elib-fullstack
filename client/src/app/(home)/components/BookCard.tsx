import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Book } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BookCard = ({book}:{book:Book}) => {
  return (
    <Card >
           
    <CardContent className="p-6">
     <div className="flex gap-5 ">
      <Image src={book.coverImage} alt =" book" sizes='100vw' height={0} width={0} style={{width:"auto",height:"12rem"}}  />
      <div>
        <h2 className="text-xl font-bold   text-balance line-clamp-3">{book.title}</h2>
        <p className="font-bold text-primary mt-1  ">{book.author.name}</p>
        <Link href={`/books/${book._id}`}><Button className="rounded-sm mt-5">Read More</Button> </Link>
      </div>
     </div>
    </CardContent>
   
  </Card>
  )
}

export default BookCard