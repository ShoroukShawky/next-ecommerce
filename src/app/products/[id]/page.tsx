
import getSingleProductApi from '@/apis/singleProductApi'
import { ProductIterface } from '@/interfaces/productEnterface'
import React from 'react'
import Image from 'next/image'
import MyButton from '@/app/_components/myButton'
import WishButton from '@/app/_components/myIcon'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params 
  
  console.log("Page rendered with ID:", id)

  const data:ProductIterface = await  getSingleProductApi(id)
  return <>
  <div className='flex flex-wrap gap-10 justify-center items-center'>
    <div className='w-60 rounded-2xl'>
    <Image alt="" src={data.imageCover} width={300} height={300} className='object-cover w-full'/>
    </div>
    <div className='w-2/3 text-center shadow-2xl p-20 mt-10 mb-5 rounded-2xl'>
    <h3>{data.title}</h3>
    <p className='text-gray-400 my-3'>{data.description}</p>
    <p>{data.category.name}</p>
       <div className='flex justify-between my-5 items-center'>
           <span>{data.price} EGP</span>
            <span>{data.ratingsAverage} <i className='fa-solid fa-star text-rating'></i></span>
        </div> 
         <div className='flex justify-between'>  
       <MyButton id={data._id}/>
      <WishButton id={data._id}/>
       </div>
       
        </div>
  </div>
  </>
}
