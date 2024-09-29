import { Button } from "@/components/ui/button";
import Image from "next/image";
import DownloadButton from "./components/DownloadButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon, TrendingUpIcon } from "lucide-react";
import { Book } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ReviewLists from "./components/ReviewLists";
import AddReview from "./components/AddReview";


async function getBookById(id: string) {
  try {

    const response = await fetch(`${process.env.BACKEND_API}/books/${id}`)
    if (!response.ok) throw new Error("Failed to fetch book");
    const data = await response.json();

    console.log("book", data)
    return data.data
  } catch (error) {
    throw new Error('Error fetching book');

  }
}

const BookDetail = async ({ params }: { params: { bookId: string } }) => {
  console.log("params", params)
  const { bookId } = params;


  const book: Book | null = await getBookById(bookId);
  if (!book) {
    throw new Error("Book not found")
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>

          <Image src={book.coverImage} alt={book.title} width={0} height={0} sizes="100vw" className="w-full h-auto rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-500 mb-4">{book.author.name}</p>
          <p className="text-gray-700 mb-8">
            {book.description}
          </p>
        </div>

        <div>
          <DownloadButton filePath={book.file} />

        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <ReviewLists />
      </div>
      <AddReview />
   </div>
  )

}

export default BookDetail