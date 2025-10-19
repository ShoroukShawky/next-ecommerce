'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BrandsType } from '@/interfaces/brandsInterfacs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function BrandItems({ prod }: { prod: BrandsType }) {
  const [open, setOpen] = useState(false)

  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6'>
      <div
        onClick={() => setOpen(true)}
        className='cursor-pointer p-5 shadow rounded-2xl flex flex-col text-center font-bold transition-shadow duration-500 hover:shadow-main hover:shadow-md'
      >
        <Image width={200} height={200} src={prod.image} className='w-full' alt={prod.name} />
        <span className='text-main mt-5'>{prod.name}</span>
      </div>

     
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl text-main font-bold">{prod.name}</DialogTitle>
          </DialogHeader>
          <h2 className='text-blue-600'>{prod.slug}</h2>
          <Image
            src={prod.image}
            width={200}
            height={200}
            alt={prod.name}
            className="mx-auto rounded-xl"
          />
          <button onClick={()=> setOpen(false)} className='bg-slate-400 w-20 rounded-2xl p-2 text-white font-bold absolute right-4 bottom-4 hover:bg-slate-700 cursor-pointer'>Close</button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
