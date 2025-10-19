"use client"
import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
export default function loading() {
  return <>
 <div className='flex justify-center items-center h-[500px]'> <RotatingLines
  visible={true}
  height="100"
  width="100"
  color="green"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>
  </>
}
