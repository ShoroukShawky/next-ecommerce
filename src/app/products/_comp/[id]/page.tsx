'use client'
import getSingleProductApi from '@/apis/singleProductApi'
import { ProductIterface } from '@/interfaces/productEnterface'
import React from 'react'
import Image from 'next/image'
import MyButton from '@/app/_components/myButton'
import WishButton from '@/app/_components/myIcon'

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params 
  console.log("Page rendered with ID:", id)

  const data:ProductIterface = await  getSingleProductApi(id)
  return <>
  <div className='flex flex-wrap justify-center items-center'>
    <div className='w-1/3'>
    <Image alt="" src={data.imageCover} width={300} height={300} className='object-cover w-full'/>
    </div>
    <div className='w-2/3 text-center'>
    <h3>{data.title}</h3>
    <p className='text-gray-400 my-3'>{data.description}</p>
    <p>{data.category.name}</p>
       <div className='flex justify-between my-5 items-center'>
           <span>{data.price} EGP</span>
            <span>{data.ratingsAverage} <i className='fa-solid fa-star text-rating'></i></span>
        </div> 
         <div className='flex justify-between'>  
       
      <WishButton id={data._id}/>
       </div>
       
        </div>
  </div>
  </>
}
