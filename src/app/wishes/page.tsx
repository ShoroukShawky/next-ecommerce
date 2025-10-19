"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTheWishList } from "@/apis/wisheApi";
import WishListItem from "../_components/wisheItems/wishItem";
import { WishListType } from "@/interfaces/wishListInterface";

export default function Wishes() {

  const [isLoading, setIsloading] = useState(false);
  const [allProducts, setAllProducts] = useState<WishListType[]>([]);


  async function handleGetWishList() {
  const data = await getTheWishList();
  console.log("WISHLIST RESPONSE:", data);
  setAllProducts(data?.data|| []);
}


  useEffect(() => {
    handleGetWishList();
  }, []);

  return (
    <div className="container">
      <div className="bg-slate-200 p-10 my-10">
        <div className="flex justify-between">
          <h2 className="flex items-center gap-3 text-3xl">
            My Wish List
          </h2>
        </div>

       
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <WishListItem
              key={product._id}
              product={product}
              setAllProducts={setAllProducts}
            />
          ))
        ) : (
          <p>No items in wishlist</p>
        )}
      </div>
    </div>
  );
}
