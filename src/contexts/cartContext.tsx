"use client";
import { getCart } from "@/apis/cartApi";
import React, { createContext, useEffect, useState } from "react";
import { CartProductType, CartType } from "@/interfaces/cartInterface"; 



interface CartContextType {
  numOfCartItems: number | null;
  allProducts: CartProductType[];
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setAllProducts: React.Dispatch<React.SetStateAction<CartProductType[]>>;
  setNumOfCartItems: React.Dispatch<React.SetStateAction<number | null>>;
  handleCart: () => Promise<CartType>;
}


export const CartContext = createContext<CartContextType | null>(null);


export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [allProducts, setAllProducts] = useState<CartProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [numOfCartItems, setNumOfCartItems] = useState<number | null>(null);

  async function handleCart() {
  
  try{
      const data = await getCart();
      
      setAllProducts(data?.data?.products);
      setTotalPrice(data?.data?.totalCartPrice);

      let sum = 0;
      data?.data?.products.forEach((product: CartProductType) => {
        sum += product.count;
      });
      setNumOfCartItems(sum);
       return data
    }
    catch(error)
    {
        console.log(error)
    }

   
  }

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        allProducts,
        totalPrice,
        setTotalPrice,
        setAllProducts,
        setNumOfCartItems,
        handleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
