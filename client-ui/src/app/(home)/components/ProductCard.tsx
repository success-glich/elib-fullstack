import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react'

export type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}
type PropsTypes = {
    product: Product
}

const ProductCard = ({
    product
}: PropsTypes) => {
    return (
        <Card className='border-none rounded-xl'>
            <CardHeader className='flex items-center justify-center'>
                <Image src={product.image} alt={product.name} width={200} height={200} />
            </CardHeader>
            <CardContent>
                <h2 className='text-xl font-bold'>{product.name}</h2>
                <p className='mt-2'>{product.description}</p>
            </CardContent>
            <CardFooter className='flex items-center mt-4 justify-between '>
                <p>
                    <span>From </span>
                    <span className='font-bold'>Rs. {product.price}</span>
                </p>
                <Button className='text-primary bg-primary/15 hover:bg-primary/25 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none  ease-linear transition-all duration-150'>
                    Choose
                </Button>
            </CardFooter>
        </Card>

    )
}

export default ProductCard