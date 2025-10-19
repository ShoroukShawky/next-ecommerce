"use client";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../components/ui/button";
import { cn } from "@/lib/utils";
import { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { CartContext } from "@/contexts/cartContext";

export default function Navbar() {
  const { data } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const context = useContext(CartContext);

  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/categories", label: "Categories" },
    ...(data
      ? [
          { href: "/wishes", label: "Wishes" },
          { href: "/allorders", label: "Orders" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="logo" priority />
          </Link>

          {/* Right side (cart + buttons) */}
          <div className="flex items-center gap-4">
            {/* Cart always visible */}
            {data && (
              <Link href="/cart" className="relative">
                <ShoppingCart className="cursor-pointer h-7 w-7 text-gray-700 hover:text-green-600" />
                {context?.numOfCartItems != 0 && (
                  <span className="bg-main text-white rounded-full w-5 h-5 flex justify-center items-center text-xs absolute top-[-8px] right-[-8px]">
                    {context?.numOfCartItems}
                  </span>
                )}
              </Link>
            )}

            {/* Hamburger for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-green-700"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex gap-4 items-center">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 font-semibold rounded-xl transition",
                  pathname === link.href
                    ? "bg-main text-white"
                    : "text-gray-600 hover:bg-gray-200"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex gap-5 items-center">
            {data ? (
              <>
                <Button
                  onClick={() => signOut()}
                  className="bg-red-700 hover:bg-red-800"
                >
                  LogOut
                </Button>
                <h3 className="text-main font-medium">Hi {data.user?.name}</h3>
              </>
            ) : (
              <>
                <Link href="/register">
                  <Button className="bg-main hover:bg-green-800">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-transparent border border-main text-main hover:bg-green-800 hover:text-white">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="flex flex-col items-start gap-3 mt-3 pb-4 border-t lg:hidden">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md font-medium transition",
                  pathname === link.href
                    ? "bg-main text-white"
                    : "text-gray-600 hover:bg-gray-200"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 w-full mt-2">
              {data ? (
                <>
                  <Button
                    onClick={() => signOut()}
                    className="bg-red-700 hover:bg-red-800 w-full"
                  >
                    LogOut
                  </Button>
                  <p className="text-main font-medium">
                    Hi {data.user?.name}
                  </p>
                </>
              ) : (
                <>
                  <Link href="/register" className="w-full">
                    <Button className="bg-main hover:bg-green-800 w-full">
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/login" className="w-full">
                    <Button className="bg-transparent border border-main text-main hover:bg-green-800 hover:text-white w-full">
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
