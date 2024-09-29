"use client"
import { StarIcon, TrendingUpIcon } from "lucide-react";
import { Book } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export interface IReview{
      _id:string;
    comment:string;
    name:string;
    rating:number;
    sentiment:string;
}
function ReviewLists() {

  const [reviews, setReviews] = useState<Array<IReview>>([]);
  const [isLoading,setIsLoading] =useState<boolean>(false);
  const { bookId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/reviews/${bookId}`).then(res => {
      console.log(res.data);
      setReviews(res.data.data);

    }).catch(err => {
      console.log("something went wrong");
    }).finally(()=>{
      setIsLoading(false);
    })
  }, []);

  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <h2 className="text-3xl font-bold">Customer Reviews</h2>
        <p className="text-muted-foreground">See what our customers are saying about our products.</p>
      </div>
      <div className="grid gap-6">

        {isLoading && [...Array(3)].map((_,index)=>(
            <div className="flex items-center space-x-4" key={index}>
            <Skeleton className="h-12 w-12 rounded-full" /> 
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          
        ))}

        {reviews?.length>0 && (
          reviews.map((review,index)=>(
            <ReviewCard key={review._id} name={review.name}  rating={review.rating} comment={review.comment} sentiment={review.sentiment} />
          ))
        )}
        {/* <ReviewCard /> */}
        {/* <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/user.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Alex Smith</h3>
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground">
              I was a bit hesitant at first, but this product has exceeded my expectations. It's well-made, efficient,
              and has made my life so much easier. Highly recommend!
            </p>
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="w-6 h-6 fill-primary" />
              <div className="text-sm font-medium">Positive</div>
            </div>
          </div>
        </div> */}
       
      </div>
      {/* <div className="grid gap-4">
        <h2 className="text-3xl font-bold">Sentiment Analysis</h2>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="w-6 h-6 fill-primary" />
            <div className="text-lg font-medium">Mostly Positive</div>
          </div>
          <p className="text-muted-foreground">
            The majority of customer reviews for this product are positive, with an average rating of 4.1 out of 5
            stars. Customers are praising the product's features, quality, and ease of use.
          </p>
        </div>
      </div> */}
    </div>
  )
}

export default ReviewLists