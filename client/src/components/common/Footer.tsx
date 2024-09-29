import { BookIcon, FacebookIcon, InstagramIcon, Link, TwitterIcon } from 'lucide-react'
import React from 'react'

function Footer() {
  return (

        <footer className="bg-muted py-8 md:py-12">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 md:flex-row md:justify-between">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <Link href="#" className="flex items-center gap-2" >
                <BookIcon className="h-6 w-6" />
                <span className="text-lg font-bold">Ebook App</span>
              </Link>
              <p className="text-center text-sm text-muted-foreground md:text-left">
                Discover a world of digital books at your fingertips.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary" >
                <TwitterIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" >
                <FacebookIcon className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" >
                <InstagramIcon className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" >
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      )
}

export default Footer