"use client";
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import {
  addToWishList,
  removeFromWishList,
  getTheWishList,
} from "@/apis/wisheApi";

export default function WishButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isWished, setIsWished] = useState(false); 

  
  useEffect(() => {
    async function checkWishList() {
      try {
        const data = await getTheWishList();
        const exists = data.data.some((item: any) => item._id === id);
        setIsWished(exists);
      } catch (err) {
        console.log(err);
      }
    }
    checkWishList();
  }, [id]);

  
  async function handleToggleWish() {
    setIsLoading(true);
    try {
      if (isWished) {
      
        const res = await removeFromWishList(id);
        if (res.status === "success") {
          toast.success("Removed from wishlist");
          setIsWished(false);
        }
      } else {
       
        const res = await addToWishList(id);
        if (res.status === "success") {
          toast.success("Added to wishlist ");
          setIsWished(true);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggleWish}
      disabled={isLoading}
      className="transition-all duration-300"
    >
      <Heart
        size={28}
        className={`cursor-pointer ${
          isWished ? "text-red-600 fill-red-600" : "text-gray-700"
        } hover:scale-110`}
      />
    </button>
  );
}
