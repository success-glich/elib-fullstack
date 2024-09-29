"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface IReview {
    name:string,
    rating:string,
    comment:string
}
async function addReview(bookId:string,payload:IReview){
    try {
      const  res= await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/reviews/${bookId}`,payload);
        console.log(res.data);
        console.log("bookId", bookId, "payload", payload)
    } catch (error) {   
        console.log(error);
        
    }
}

function AddReview() {
    const {bookId}=useParams();
    const router =useRouter();

  
    const[inputs,setInputs] = useState({
        name:"",
        rating:"",
        comment:""
    });
    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value} = e.target;
        setInputs({...inputs,[name]:value})
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const {name,rating,comment} =inputs;
        if([name,rating,comment].some(field=>field.trim()==="" || field===undefined)){
            return alert("all field are required");
        }
          try {
          await addReview(bookId as string,inputs);
          // router.refresh();
          window.location.reload();

          setInputs(
           {
                name:"",
                rating:"",
                comment:""
            }
        );
             
          } catch (error) {
              alert("Something wrong to add reviews");

          }
    }
  return (
    <div className="mt-12">
    <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
    <form className="bg-white rounded-lg shadow-md p-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" placeholder="Enter your name"  value={inputs.name} onChange={handleChangeInput}/>
      </div>
      <div className="mb-4">
        <Label htmlFor="rating">Rating</Label>
        <Select onValueChange={(value)=>setInputs(prev=>({...prev,rating:value}))} >
          <SelectTrigger>
            <SelectValue placeholder="Select a rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 stars</SelectItem>
            <SelectItem value="4">4 stars</SelectItem>
            <SelectItem value="3">3 stars</SelectItem>
            <SelectItem value="2">2 stars</SelectItem>
            <SelectItem value="1">1 star</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="comment">Review</Label>
        <Textarea id="comment"  placeholder="Write your review" name="comment" value={inputs.comment} onChange={handleChangeInput} />
      </div>
      <Button type="submit" className="w-full">
        Submit Review
      </Button>
    </form>
  </div>
  )
}

export default AddReview