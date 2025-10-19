"use client";
import { getTheWishList, removeFromWishList } from "@/apis/wisheApi";
import { WishListType } from "@/interfaces/wishListInterface";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import MyButton from "../myButton";

export default function WishListItem({ product,setAllProducts }: { product: WishListType,setAllProducts:any }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    try {
      const data = await removeFromWishList(product._id);
      if (data.status === "success") {
       await getTheWishList().then((res) => setAllProducts(res.data))
        toast.success("Product removed from wishlist successfully", { duration: 3000 });
      } else {
        toast.error("Failed to remove product", { duration: 3000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-b-slate-300 py-6 gap-6 md:gap-10 w-full">
      <div className="flex flex-col sm:flex-row items-center sm:gap-8 w-full md:w-auto">
        <div className="flex justify-center  items-center gap-20">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={120}
            height={120}
            className="w-50 h-55 object-cover rounded-lg"
          />
          <div className="text-center flex flex-col gap-5 sm:text-left space-y-2">
            <h3 className="text-lg font-semibold text-main">{product.title}</h3>
            <h4 className="text-gray-700">
              Price: <span className="text-main font-semibold">{product.price} EGP</span>
            </h4>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="mt-2 bg-red-500 text-white disabled:bg-slate-400 rounded-lg px-4 py-2 flex gap-2 justify-center items-center mx-auto sm:mx-0 text-sm hover:bg-red-700 transition-all"
            >
              <Trash size={16} /> Remove
            </button>
          </div>
         <div className="w-100 ml-50">
           <MyButton id={product._id}/>
         </div>
        </div>
      </div>
    </div>
  );
}
