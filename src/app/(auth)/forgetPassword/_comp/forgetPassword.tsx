"use client"
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgetSchema, forgetSchemaForm } from '@/schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from "@/components/ui/form"
import { signIn } from 'next-auth/react'
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation'


export default function Login() {
  const router = useRouter()
   const [isLoading , setIsLoading] = useState(false)

    const form = useForm<forgetSchemaForm>(
     {
      resolver:zodResolver(forgetSchema),
       defaultValues:
       {
            email:"",
       }

     })
     const firstError = Object.keys(form.formState.errors)[0]

   async function onSubmit(value:forgetSchemaForm)
  {
     setIsLoading(true);
     try{
        const options = {
            url :"https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" ,
            method :'POST',
            data:value
        }

          const {data} = await axios.request(options)
        if(data.statusMsg == 'success')
        {
         console.log(data)
          setIsLoading(false)
           router.push('/verifycode')
          
        }
        
      }
      catch (error){
      
       setIsLoading(false);
      }
  }
  

  return <>
 <div className='flex flex-col justify-center items-center mt-5'>
  
   <Form {...form}>
     <form onSubmit ={form.handleSubmit(onSubmit)} className=' my-5  w-[500px] mx-auto shadow-[0_0_15px_rgba(120,160,110)]  py-2 px-5 rounded-2xl'>
    
   <h2 className='my-5 text-3xl text-center text-main font-serif mb-10'>Forget Password</h2>
         {/*email*/}
      <FormField
    name='email'
    control={form.control}
    render={({field})=>
    (
      <FormItem className='my-5'>
        <FormLabel>Email</FormLabel>
      <FormControl>
     
          <Input className=" border-2 shadow-2xl" type='email' {...field}/>
        
      
      </FormControl>
      {firstError == "email" && <FormMessage/>}
      </FormItem>
    )}
    ></FormField>
 
  <div className='flex justify-between mt-10 mb-5'>
    
  <Button
     disabled={isLoading}
       type="submit"
     className="bg-main text-white   cursor-pointer flex  hover:bg-green-900"
    >
       {isLoading ? "Loading..." : "Continue"}
     </Button>
   </div>
     </form>
   </Form>
    
   
 </div>
  </>
}
