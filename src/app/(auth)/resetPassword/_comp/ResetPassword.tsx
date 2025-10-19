"use client"
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPasswordSchema, resetPasswordSchemaForm } from '@/schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from "@/components/ui/form"
import axios from "axios";
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<resetPasswordSchemaForm>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'all',
    defaultValues: {
      email: "",
      newPassword: "",
    }
  })

  const firstError = Object.keys(form.formState.errors)[0]

  async function onSubmit(value: resetPasswordSchemaForm) {
    setIsLoading(true)
    try {
      const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", value)
      console.log(data)
      router.push('/login')
    } catch (error: any) {
      console.log(error.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='my-5 w-[500px] mx-auto shadow-[0_0_15px_rgba(120,160,110)] py-2 px-5 rounded-2xl'>
          <h2 className='my-5 text-3xl text-center text-main font-serif mb-10'>Reset Password</h2>

          {/* Email */}
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem className='my-5'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="border-2 shadow-2xl" type='email' {...field} />
                </FormControl>
                {firstError == "email" && <FormMessage />}
              </FormItem>
            )}
          />

          {/* Password with show/hide */}
          <FormField
            name='newPassword'
            control={form.control}
            render={({ field }) => (
              <FormItem className='my-5'>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border-2 shadow-2xl pr-10"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-600"
                    >
                      {showPassword ? <Eye size={18}/> : <EyeOff size={18}/>}
                    </button>
                  </div>
                </FormControl>
              <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-between mt-10 mb-5'>
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-main text-white cursor-pointer flex hover:bg-green-900"
            >
              {isLoading ? "Loading..." : "Reset"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
