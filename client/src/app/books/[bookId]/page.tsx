import { Button } from "@/components/ui/button";
import Image from "next/image";
import DownloadButton from "./components/DownloadButton";


async function getBookById(id:string){
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
   
    const book = await getBookById(bookId);
    if(!book){
        throw new Error("Book not found")
    }

   
    return (
        <section className="  container grid grid-cols-1 a md:grid-cols-3 gap-10 py-10  px-5">
           
                <div className="col-span-2">
                    <h2 className="mb-5 text-6xl font-bold text-primary/50 leading-[1.1]">{book.title}</h2>
                    <span className="font-semibold">by {book.author.name}</span>
                    <p className="mt-5 text-lg leading-8">{book.description}</p>
                        {/* client component */}
                        <DownloadButton filePath={book.file}/>
                </div>
                <div className="flex justify-start md:justify-end order-1 md:order-2 ">
                    <Image src={book.coverImage} alt={book.title} width={0} height={0} sizes="100vw" style={{width:"auto",height:"auto"}} />
                 

                </div>
           
        </section>
    )
}

export default BookDetail