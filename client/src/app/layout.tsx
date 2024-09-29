import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils"
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
 
const manrope = Manrope({
  subsets: ["latin"],
  variable: '--font-manrope'
});

export const metadata: Metadata = {
  title: "Elib-share ebook",
  description: "The popular website to share ebook in Nepal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          manrope.variable
        )}
      >
        <Header />
        <main>
          {children}
        </main>

        <Footer />

        </body>
    </html>
  );
}
