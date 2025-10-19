import React from 'react'
import { ProductIterface } from '@/interfaces/productEnterface'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import Link  from 'next/link'
import MyButton from '@/app/_components/myButton'
import WishButton from '@/app/_components/myIcon'

export default function ProductItems({prod}:{prod:ProductIterface}) {
  return (
   
    <div className='w-full sm:w-1/2 md:w-w-1/3 lg:w-1/6'>
        <div className='p-5 shadow-xl transition-shadow duration-500 rounded-2xl hover:shadow-main flex flex-col '>
          <Link href={`/products/${prod._id}`}>
            <Image width={200} height={200} src={prod.imageCover} className='w-full ' alt="" />
            <span className='text-main mt-5'>{prod.category.name}</span>
            <p className="line-clamp-1">{prod.title}</p>
           <div className='flex justify-between my-5'>
            <span>{prod.price} EGP</span>
            <span>{prod.ratingsAverage} <i className='fa-solid fa-star text-rating'></i></span>
           </div>
           </Link>
       <div className='flex justify-between'>  
          <MyButton id={prod._id}/>
          <WishButton id={prod._id}/>
       </div>
        </div>
    </div>
  )
}
