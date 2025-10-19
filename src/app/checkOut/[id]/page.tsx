"use client";

import React, { useContext, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { checkoutSchema, CheckoutSchemaForm } from "@/schema/checkOut.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { mackeCashPayment, mackeOnlinePayment } from "@/apis/checkOutApi";
import { useParams } from "next/navigation";
import { CartContext } from "@/contexts/cartContext";
import { useRouter } from "next/navigation";


export default function CheckOut() {
  const [isLoading, setIsLoading] = useState(false);
  const[isCash , setIscash] = useState('')
  const router = useRouter()

  const context = useContext(CartContext)

   const{id}:{id:string} = useParams()

  const form = useForm<CheckoutSchemaForm>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver:zodResolver(checkoutSchema),
    mode:'all' 

  });

  async function onSubmit(values: CheckoutSchemaForm) {

    if(isCash == 'Cash')
  { 
       const data = await mackeCashPayment(id , values)
       if(data.status=='success')
       {
          context?.handleCart()
          router.push('/allorders')
       }
  }

  else{
    const data  = await mackeOnlinePayment(id,'https://next-ecommerce-17dq.vercel.app',values)
    if(data.status =='success')
  {
      window.location.href = data.session.url
  }

  }
  

  }
   
  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-5 w-[500px] mx-auto shadow-[0_0_15px_rgba(120,160,110)] py-5 px-6 rounded-2xl"
        >
          <h2 className="my-5 text-3xl text-center text-main font-serif mb-10">
            Checkout
          </h2>

          {/* Details */}
          <FormField
            name="details"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input
                    className="border-2 shadow-2xl"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    className="border-2 shadow-2xl"
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    className="border-2 shadow-2xl"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
       
            disabled={isLoading}
            type="submit"
            className="bg-main text-white hover:bg-green-900 w-full mt-4"
          >
            {isLoading ? "Loading..." : "Online Payment"}
          </Button>

           <Button
              onClick={()=>setIscash('Cash')}
            disabled={isLoading}
            type="submit"
            className="bg-main text-white hover:bg-green-900 w-full mt-4"
          >
            {isLoading ? "Loading..." : "Cash Payment"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
