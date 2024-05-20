import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import React from 'react'
import ToppingList from './ToppingList';
import { ShoppingCart } from 'lucide-react';

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


                <Dialog>
                    <DialogTrigger className='text-primary bg-primary/15 hover:bg-primary/25 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none  ease-linear transition-all duration-150'> Choose </DialogTrigger>
                    <DialogContent className='max-w-3xl p-0'>
                        <div className='flex '>
                            <div className='w-1/3 bg-white rounded p-8 flex items-center justify-center '>
                                <Image
                                    src={'/file.png'}
                                    alt={product.name}
                                    width={450}
                                    height={450}
                                />
                            </div>
                            <div className='w-2/3 p-8'>
                                <h3 className='text-xl font-bold'>{product.name}</h3>
                                <p className='mt-2'>{product.description}</p>
                                <div>

                                    <h4 className='mt-6 '>Choose the size</h4>
                                    <RadioGroup defaultValue="small" className="grid grid-cols-3 gap-4 mt-2">
                                        <div>
                                            <RadioGroupItem value="small" id="small" className="peer sr-only" aria-label='small' />
                                            <Label
                                                htmlFor="small"
                                                className="flex flex-col items-center justify-between bg-white rounded-md border-2  bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                aria-label='small'

                                            >
                                                Small
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                value="medium"
                                                id="medium"
                                                className="peer sr-only"
                                                aria-label='medium'
                                            />
                                            <Label
                                                htmlFor="medium"
                                                className="flex flex-col items-center bg-white justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                Medium
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                value="large"
                                                id="large"
                                                className="peer sr-only"
                                                aria-label='large' />
                                            <Label
                                                htmlFor="large"
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                Large
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div>

                                    <h4 className='mt-6 '>Choose the crust</h4>
                                    <RadioGroup defaultValue="thin" className="grid grid-cols-3 gap-4 mt-2">
                                        <div>
                                            <RadioGroupItem value="thin" id="thin" className="peer sr-only" aria-label='thin' />
                                            <Label
                                                htmlFor="thin"
                                                className="flex flex-col items-center justify-between bg-white rounded-md border-2  bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                aria-label='thin'

                                            >
                                                Thin
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                value="thick"
                                                id="thick"
                                                className="peer sr-only"
                                                aria-label='thick'
                                            />
                                            <Label
                                                htmlFor="thick"
                                                className="flex flex-col items-center bg-white justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                Thick
                                            </Label>
                                        </div>

                                    </RadioGroup>
                                </div>

                                <ToppingList />

                                <div className='flex items-center justify-between mt-12'>
                                    <span className='font-bold text-xl'>Rs. 400</span>
                                    <Button><ShoppingCart size={20} /> <span className='ml-2'>Add to Cart</span> </Button>
                                </div>


                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </CardFooter>
        </Card>

    )
}

export default ProductCard