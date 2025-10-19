import React from 'react'
import { BrandsType } from '@/interfaces/brandsInterfacs'
import getBrands from '@/apis/brandsApi'
import BrandItems from './[id]/brandItem'



export default async function page() {

const data:BrandsType[] = await getBrands()



  return <>
  <h1 className='text-main text-center mt-5 text-5xl'>All Brands</h1>
    <div className='flex flex-wrap gap-4 justify-center mt-10 mb-10'>
      {data.map((prod:BrandsType)=>
      <BrandItems key={prod._id} prod ={prod}/>
      )}
    </div>
    </>
}
