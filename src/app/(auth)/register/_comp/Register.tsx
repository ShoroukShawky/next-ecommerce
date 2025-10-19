"use client"
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema, registerSchemaForm } from '@/schema/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function Register() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const form = useForm<registerSchemaForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      rePassword: "",
      phone: ""
    }
  })

  async function onSubmit(value: registerSchemaForm) {
    setIsLoading(true)
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", value)
      if (data.message === "success") {
        setIsLoading(false)
        form.reset()
        router.push('/login')
      }
    } catch (error) {
     
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-10 w-[600px] mx-auto shadow-[0_0_15px_rgba(120,160,110)] py-6 px-6 rounded-2xl"
      >
        <h2 className="my-5 text-center text-main mb-10 font-serif text-3xl font-bold">
          Register Now
        </h2>

        {/* Name */}
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="border-2 shadow-2xl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="border-2 shadow-2xl" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    className="border-2 shadow-2xl pr-10"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>

               
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-main"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          name="rePassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>Confirm Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    className="border-2 shadow-2xl pr-10"
                    type={showRePassword ? "text" : "password"}
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>

               
                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-main"
                >
                  {showRePassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
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
                <Input className="border-2 shadow-2xl" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit + Link */}
        <div className="flex justify-between mt-10 mb-5">
          <Link href="/login" className="text-main font-bold underline">
            Do you have an account? Login
          </Link>
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-main text-white cursor-pointer flex hover:bg-green-900"
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
