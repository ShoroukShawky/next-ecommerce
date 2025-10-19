'use client'
import { addToCart } from '@/apis/cartApi'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/contexts/cartContext'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'



export default function MyButton({id}:{id:string}) {

    const [isLoading , setIsLoading]= useState(false)
 const context = useContext(CartContext)
  




    async function handleAddToCart() {
        setIsLoading(true)
        const data = await addToCart(id)
        if(data.status == 'success')
        {
            toast.success(data.message ,{duration:3000})
             context?.handleCart()
        }
        else{
            toast.error('Please login to can add product to cart' , {duration:3000})
        }
        setIsLoading(false)
    }
    
  return <>
    <Button disabled = {isLoading} onClick ={handleAddToCart}className='hover:bg-green-900 my-3 w-3/4 bg-main'>Add to Cart</Button>
  </>
}
