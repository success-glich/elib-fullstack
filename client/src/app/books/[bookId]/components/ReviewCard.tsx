import React from 'react'
import { StarIcon, TrendingUpIcon } from "lucide-react";
import { Book } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IReview } from './ReviewLists';

function ReviewCard({name,comment,sentiment,rating}:Omit<IReview,"_id">) {
  return (
    <div className="flex items-start gap-4">
    <Avatar className="w-10 h-10 border">
      <AvatarImage src="/user.png" alt="@shadcn" />
      <AvatarFallback>Guest</AvatarFallback>
    </Avatar>
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center gap-0.5">
          {/* <StarIcon className="w-5 h-5 fill-primary" />
          <StarIcon className="w-5 h-5 fill-primary" />
          <StarIcon className="w-5 h-5 fill-primary" />
          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
          {Array.from({length:rating},(_,index)=>(
            <StarIcon key={index} className="w-5 h-5 fill-primary" />
          ))}
        </div>
      </div>
      <p className="text-muted-foreground">
        {/* I absolutely love this product! It's been a game-changer in my kitchen. The features are amazing and
        it's so easy to use. Highly recommend! */}

        {comment}
      </p>
      <div className="flex items-center gap-2">
        <TrendingUpIcon className="w-6 h-6 fill-primary" />
        <div className="text-sm font-medium">{sentiment}</div>
      </div>
    </div>
  </div>
  )
}

export default ReviewCard