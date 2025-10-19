import React from 'react'
import CategorieItems from './[id]/categorieItem'
import { CategoryType } from '@/interfaces/catecories'
import getCategorie from '@/apis/categorieApi'
import SubCategorieItems from './[id]/subCategorieItem'



export default async function page() {

const data:CategoryType[] = await getCategorie()



  return <>
  <h1 className='text-main text-center mt-5 text-5xl'>All Brands</h1>
    <div className='flex flex-wrap gap-10 justify-center mt-10 mb-10'>
      {data.map((prod:CategoryType)=>
      <CategorieItems key={prod._id} prod ={prod}/>
      )}

    </div>
    </>
}
