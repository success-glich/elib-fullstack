/* eslint-disable @typescript-eslint/ban-ts-comment */
import { LoadingSpinner } from '@/components/common/TableLoader';
import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { deleteBook, getBooks } from '@/http/api';
import { Book } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CirclePlus, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const BooksPage = () => {
    // todo: add loading spinner, and error message

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['books'],
        queryFn: getBooks,
        staleTime: 10000, // in Milli-seconds
    });  
    const { toast } = useToast()
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:deleteBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            // console.log('Book created successfully');
            toast({
                title: 'Book deleted successfully',
                description: 'The book has been deleted successfully',
                variant:'success'
            });
            // navigate('/dashboard/books');
        },
        });
        
        const handleDelete = (id: string) => {
            mutation.mutate(id);
        };

    if (isError) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }
    return (
        <div>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Books</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link to="/dashboard/books/create">
                    <Button>
                        <CirclePlus size={20} />
                        <span className="ml-2">Add book</span>
                    </Button>
                </Link>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Books</CardTitle>
                    <CardDescription>
                        Manage your books and view their sales performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>



                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead className="hidden md:table-cell">Author name</TableHead>
                                <TableHead className="hidden md:table-cell">Created at</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && (
                                <TableRow >
                                    <TableCell colSpan={6} align='center' className=" sm:table-cell ">
                                        <LoadingSpinner />
                                    </TableCell>

                                </TableRow>
                            )}

                            {data?.data?.data.map((book: Book) => {
                                return (
                                    <TableRow key={book._id}>
                                        <TableCell className="hidden sm:table-cell">
                                            <img
                                                alt={book.title}
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={book.coverImage}
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{book.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{book.genre}</Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {book.author.name}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {book.createdAt}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                                    <Link to ={`/dashboard/books/edit/${book._id}`}>
                                                    <DropdownMenuItem >Edit</DropdownMenuItem>
                                                    </Link>
                                                    
                                                    <DropdownMenuItem  onClick={()=>handleDelete(book._id)} className='bg-red-500 text-white hover:bg-red-400 cursor-pointer focus:bg-red-400 focus:text-white' >Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong> products
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default BooksPage;
