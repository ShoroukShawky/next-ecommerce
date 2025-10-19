"use client"
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { verifyCodeSchema, verifyCodeSchemaForm } from '@/schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from "@/components/ui/form"
import axios from "axios";
import { useRouter } from 'next/navigation'


export default function Login() {
  const router = useRouter()
   const [isLoading , setIsLoading] = useState(false)

    const form = useForm<verifyCodeSchemaForm>(
     {
      resolver:zodResolver(verifyCodeSchema),
      
       defaultValues:
       {
            resetCode:"",
       }

     })
     const firstError = Object.keys(form.formState.errors)[0]

   async function onSubmit(value:verifyCodeSchemaForm)
  {
     setIsLoading(true);
     try{
        const options = {
            url :"https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" ,
            method :'POST',
            data:value
        }

          const {data} = await axios.request(options)
        
         console.log(data)
          setIsLoading(false)
           router.push('/resetPassword')
          
        
      }
      catch (error:any){
       console.log(error.response.data.message)  
       setIsLoading(false);
      }
  }
  

  return <>
 <div className='flex flex-col justify-center items-center mt-5'>
  
   <Form {...form}>
     <form onSubmit ={form.handleSubmit(onSubmit)} className=' my-5  w-[500px] mx-auto shadow-[0_0_15px_rgba(120,160,110)]  py-2 px-5 rounded-2xl'>
    
   <h2 className='my-5 text-3xl text-center text-main font-serif mb-10'>Verify Code</h2>
         {/*email*/}
      <FormField
    name='resetCode'
    control={form.control}
    render={({field})=>
    (
      <FormItem className='my-5'>
        <FormLabel>Code</FormLabel>
      <FormControl>
     
          <Input className=" border-2 shadow-2xl" type='' {...field}/>
        
      
      </FormControl>
      {firstError == "resetCode" && <FormMessage/>}
      </FormItem>
    )}
    ></FormField>
 
  <div className='flex justify-between mt-10 mb-5'>
    
  <Button
     disabled={isLoading}
       type="submit"
     className="bg-main text-white   cursor-pointer flex  hover:bg-green-900"
    >
       {isLoading ? "Loading..." : "Verify"}
     </Button>
   </div>
     </form>
   </Form>
    
   
 </div>
  </>
}
