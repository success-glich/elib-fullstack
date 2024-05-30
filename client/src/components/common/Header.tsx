import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Header = () => {
    return (
        <header className='bg-secondary'>

            <nav className='container py-5 flex items-center justify-between'>
                <div>
                    <Link href={"/"} >
                        <div className='flex items-center gap-1'>
                            <div className="relative">
                               <span className='text-primary'> <Hexagon /></span>
                                <BookIcon />
                            </div>
                            <span className="text-xl font-bold uppercase tracking-tight text-primary-500">
                                EBook Nepal
                            </span>
                        </div>
                    </Link>
                </div>
                <div className='flex items-center space-x-4'>
                    <Button variant={"outline"} className='border-primary/50 border-b-2'>Sign Up</Button>
                    <Button>Sign In</Button>
                </div>

            </nav>
        </header>
    )
}

export default Header
const Hexagon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 24 24"
        fill="#facc15"
        stroke="#facc15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-hexagon">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
);

const BookIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="#000"
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
    </svg>
);
