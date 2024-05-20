"use client";
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'

export type Topping = {
    id: string;
    name: string;
    price: number;
    image: string;
    isAvailable: boolean;
};

export type PropType = {
    topping: Topping,
    selectedToppings: Topping[]
    handleCheckBoxCheck: (topping: Topping) => void
}

const ToppingCard = ({ topping, handleCheckBoxCheck, selectedToppings }: PropType) => {

    const isCurrentSelected = selectedToppings.some((element) => element.id === topping.id);

    return (
        <Button
            variant={"outline"}
            className={cn(" relative flex flex-col h-36", isCurrentSelected ? "border-primary" : "")}
            onClick={() => handleCheckBoxCheck(topping)}
        >
            <Image src={topping.image} alt={topping.name} width={80} height={80} />
            <p>Rs.{topping.price} </p>
            {isCurrentSelected && <CircleCheck className='absolute top-1 right-1 text-primary' />}
        </Button>
    )
}

export default ToppingCard