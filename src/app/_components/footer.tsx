
"use client"

import Link from "next/link"
import logo from "../../assets/images/freshcart-logo.svg"
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-200">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="logo"></Image>
          </Link>

      
          <nav className="flex gap-4 text-sm">
            <Link href="/about" className="font-bold text-gray-600 hover:bg-gray-300 px-2 py-2 rounded-2xl">About</Link>
            <Link href="/contact" className="font-bold text-gray-600 hover:bg-gray-300 px-2 py-2 rounded-2xl">Contact</Link>
             <Link href="/contact" className="font-bold text-gray-600 hover:bg-gray-300 px-2 py-2 rounded-2xl">Privacy Policy</Link>
          </nav>

       
          <div className="flex gap-4">
        <div className="flex gap-4">
       <Link href=""><Facebook className="h-6 w-6 hover:text-primary" /></Link>
      <Link href=""><Instagram className="h-6 w-6 hover:text-primary" /></Link>
     <Link href=""><Twitter className="h-6 w-6 hover:text-primary" /></Link>
</div>
          </div>
        </div>

     
        <div className="mt-8 border-t border-t-gray-300 pt-4 text-center text-sm text-muted-foreground">
          © 2025 FreshCart. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

