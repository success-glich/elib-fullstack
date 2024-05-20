"use client"
import React, { useState } from 'react'
import ToppingCard from './ToppingCard';
export type Topping = {
    id: string;
    name: string;
    price: number;
    image: string;
    isAvailable: boolean;
};

const data: Topping[] = [
    {
        id: "101", name: "Chicken", image: '/chicken.png', price: 50, isAvailable: true
    },
    {
        id: "102", name: "jelapeno", image: '/jelapeno.png', price: 50, isAvailable: true
    },
    {
        id: "103", name: "Cheese", image: '/cheese.png', price: 50, isAvailable: true
    }
]
const ToppingList = () => {

    const [selectedToppings, setSelectedToppings] = useState([data[0]]);

    const handleCheckBoxCheck = (topping: Topping) => {

        const isAlreadyExists = selectedToppings.some((elem) => elem.id === topping.id);
        if (isAlreadyExists) {
            setSelectedToppings((prev) => prev.filter(elem => elem.id !== topping.id));
            return;
        }

        setSelectedToppings(prev => [...prev, topping]);

    }
    return (
        <section className='mt-6'>
            <h3>Extra toppings</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {
                    data.map(topping => (
                        <ToppingCard
                            key={topping.id}
                            topping={topping}
                            selectedToppings={selectedToppings}
                            handleCheckBoxCheck={handleCheckBoxCheck}
                        />

                    ))
                }
            </div>
        </section>
    )
}

export default ToppingList