'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CategoryType } from '@/interfaces/catecories'

export default function SubCategorieItems({ prod }: { prod: CategoryType }) {

  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6'>
      <div
        className='cursor-pointer p-5 shadow rounded-2xl flex flex-col text-center font-bold transition-shadow duration-500 hover:shadow-main hover:shadow-md'
      >
        <span className='text-main mt-5'>{prod.name}</span>
      </div>
    </div>
  )
}
