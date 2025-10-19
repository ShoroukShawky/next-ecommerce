"use client";
import { clearCart, getCart } from "@/apis/cartApi";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import CartItem from "../_components/cartItem/cartItem";
import { CartProductType, CartType } from "@/interfaces/cartInterface";
import toast from "react-hot-toast";
import Link from "next/link";
import { CartContext } from "@/contexts/cartContext";


export default function Cart() {

  
  const [isLoading , setIsloading] = useState(false)
   const context = useContext(CartContext)
   const [cartData , setCartdata] = useState<CartType | undefined>(undefined)
  

  async function handleGetCart() {
    const data = await  context?.handleCart()
    setCartdata(data)
    console.log("cartData:", cartData);

  }


  async function handleClearCart(){
     setIsloading(true)
   
           const data = await clearCart()
           if(data.message=='success')
           {
              context?.handleCart()
               context?.setAllProducts([])
              context?. setTotalPrice(0)
              toast.success('Cart is clear' , {duration:3000})
               setIsloading(false)
   
           }

          }
          

  useEffect(() => {
    handleGetCart();
  }, []);

  return (
    <>
      
        <div className="container">
          <div className="bg-slate-200 p-10 my-10">
            <div className="flex justify-between">
           
              <h2 className="flex items-center gap-3 text-3xl">
                <ShoppingCart /> Shopping Cart
              </h2>
              <Button disabled={isLoading} onClick={handleClearCart} className=" hover:bg-red-900 cursor-pointer bg-red-600  text-white p-3">Clear Cart</Button>
            </div>
           <div className="flex gap-10 mt-5 ml-5">
             <h3 className="text-blue-500 my-2">
              Total cart price: { context?.totalPrice} EGP
            </h3>
            { context?.totalPrice == 0 ?
            <div className="flex gap-5 justify-center items-center"> <h1>Cart is empty</h1>
                 <Link href='/products'>  <Button className="bg-main  cursor-pointer mt-2" >Show Products</Button> </Link>
            </div> :
            <Link href={`/checkOut/${cartData?.cartId}`} className='mt-1'><Button className="bg-main cursor-pointer">Check Out</Button></Link>
            }
           </div>
            
            { context?.allProducts.map((product) => (
              <CartItem
                key={product.product._id}
                product={product}
              />
            ))}
          </div>
        </div>
      
    </>
  );
}
