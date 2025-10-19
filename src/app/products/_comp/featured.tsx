import getProductApi from '@/apis/productsApi'
import { ProductIterface } from '@/interfaces/productEnterface'
import React from 'react'
import ProductItems from './ProductItems'

export default async function Featured() {
const data:ProductIterface[] = await getProductApi()

  return <>
   <h1 className='text-main text-center mt-5 text-5xl'>All Products</h1>
  <div className='flex flex-wrap gap-4 justify-center mt-10'>
    {data.map((prod:ProductIterface)=>
    <ProductItems key={prod._id} prod ={prod}/>
    )}
  </div>
  </>
}
