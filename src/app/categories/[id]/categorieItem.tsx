'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CategoryType } from '@/interfaces/catecories'
import { getSpecificCategorie } from '@/apis/categorieApi' // مش getSpecificBrand

export default function CategorieItems({ prod }: { prod: CategoryType }) {
  const [isLoading, setIsLoading] = useState(false)
  const [subCategories, setSubCategories] = useState<CategoryType[]>([])
  const [showSubs, setShowSubs] = useState(false)

  async function handleSubCat() {

    if (showSubs) {
      setShowSubs(false)
      return
    }

    setIsLoading(true)
    try {
      const subs = await getSpecificCategorie(prod._id)
      setSubCategories(subs)
      setShowSubs(true)
    } catch (error) {
      console.error('Error fetching subcategories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6">
      <div
        onClick={handleSubCat}
        className="cursor-pointer p-5 shadow rounded-2xl flex flex-col text-center font-bold transition-shadow duration-500 hover:shadow-main hover:shadow-md"
      >
        <Image
          width={200}
          height={200}
          src={prod.image || '/placeholder.png'}
          className="w-full h-70 object-cover rounded-md"
          alt={prod.name}
        />
        <span className="text-main mt-5">{prod.name}</span>
      </div>


      {showSubs && (
        <div className="mt-3 text-center flex flex-wrap gap-2 shadow-lg rounded-2xl font-bold p-5">
          {isLoading ? (
            <p className="text-gray-400 italic">Loading subcategories...</p>
          ) : subCategories.length > 0 ? (
            subCategories.map((sub) => (
              <div
                key={sub._id}
                className="p-2 w-25 border rounded-lg mt-2 text-gray-700 hover:text-main transition-all"
              >
                {sub.name}
              
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No subcategories</p>
          )}
            <button onClick={()=> setShowSubs(false)} className='bg-slate-300 p-2 rounded-2xl cursor-pointer hover:bg-slate-500 ml-40 mt-2'>Close</button>
        </div>
      )}
    </div>
  )
}
