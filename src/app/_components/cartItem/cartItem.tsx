"use client";
import { removeFromeCart, updateCart } from "@/apis/cartApi";
import { CartContext } from "@/contexts/cartContext";
import { CartProductType } from "@/interfaces/cartInterface";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function CartItem({
  product,
  setTotalPrice,
}: {
  product: CartProductType;
  setTotalPrice: any;
}) {
  const [isLoading, setIsloading] = useState(false);
 const context = useContext(CartContext)
   
  async function handleDelete() {
    setIsloading(true);
    try {
      const data = await removeFromeCart(product.product._id);
      if (data.status == "success") {
         context?.handleCart()
     
        toast.success("Product Removed successfully", { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error", { duration: 3000 });
    } finally {
      setIsloading(false);
    }
  }

  async function handleUpdateCart(newCount: number) {
    setIsloading(true);
    try {
      const data = await updateCart(product.product._id, newCount);
      if (data.status == "success") {
       
        if (newCount == 0) {
          toast.success("Product removed from cart");
        } else {
           context?.handleCart()
          toast.success("Product updated successfully", { duration: 3000 });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error", { duration: 3000 });
    } finally {
      setIsloading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-b-slate-300 py-6 gap-6 md:gap-10 w-full">
    
      <div className="flex flex-col sm:flex-row items-center  sm:gap-8 w-full md:w-auto">
      <div className="flex justify-center items-center gap-20">
          <Image
          src={product.product.imageCover}
          alt={product.product.title}
          width={120}
          height={120}
          className="w-50 h-55 object-cover  rounded-lg"
        />
        <div className="text-center flex flex-col gap-5 sm:text-left space-y-2">
          <h3 className="text-lg font-semibold text-main">
            {product.product.title}
          </h3>
          <h4 className="text-gray-700">
            Price:{" "}
            <span className="text-main font-semibold">{product.price} EGP</span>
          </h4>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="mt-2 bg-red-500 text-white disabled:bg-slate-400 rounded-lg px-4 py-2 flex gap-2 justify-center items-center mx-auto sm:mx-0 text-sm hover:bg-red-700 transition-all"
          >
            <Trash size={16} /> Remove
          </button>
      </div>
        </div>
      </div>

     
      <div className="flex items-center justify-center gap-3">
        <button
          disabled={isLoading}
          onClick={() => handleUpdateCart(product.count - 1)}
          className="bg-transparent border-2 rounded-full border-main text-main hover:bg-green-800 hover:text-white w-10 h-10 text-2xl text-center cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-400 transition-all"
        >
          -
        </button>
        <h4 className="text-xl font-semibold">
          {isLoading? <i className="fa-solid fa-spinner fa-spin text-main"></i> : product.count}</h4>
        <button
          disabled={isLoading}
          onClick={() => handleUpdateCart(product.count + 1)}
          className="bg-transparent border-2 border-main rounded-full text-main w-10 h-10 text-2xl text-center hover:bg-green-800 hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-400 flex justify-center items-center transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
}
