
import { getBookById, updateBook } from '@/http/api';
// import { Book } from '@/types/book';
import {Book} from "../types.ts";
import BookForm from '@/components/common/BookForm.tsx';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function EditPage(){
    const { id } = useParams(); 

    const {error, data,isLoading } = useQuery({
        queryKey: ['book', { id}],
        queryFn: ()=>getBookById(id as string)
      });
      const book =  data?.data.data as unknown as Book;

    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(error){
        return <div>something went wrong.</div>
    }
    return (
        <section>
            <BookForm book ={book} />
        </section>
    );
}

export default EditPage;
