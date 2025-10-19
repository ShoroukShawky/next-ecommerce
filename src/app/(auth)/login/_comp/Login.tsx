'use client'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema, loginSchemaForm } from '@/schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react' 

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) 

  const form = useForm<loginSchemaForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const firstError = Object.keys(form.formState.errors)[0]

  async function onSubmit(value: loginSchemaForm) {
    setIsLoading(true)
    const res = await signIn('credentials', {
      email: value.email,
      password: value.password,
      redirect: false,
      callbackUrl: '/',
    })

    if (res?.ok) {
      toast.success('Logged in successfully', { duration: 4000 })
      router.push('/')
    } else {
      toast.error(res?.error ?? 'Invalid credentials', { duration: 4000 })
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-5 w-[500px] mx-auto shadow-[0_0_15px_rgba(120,160,110)] py-5 px-6 rounded-2xl"
        >
          <h2 className="my-5 text-3xl text-center text-main font-serif mb-10">Login</h2>

       
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="border-2 shadow-2xl" type="email" {...field} />
                </FormControl>
                {firstError === 'email' && <FormMessage />}
              </FormItem>
            )}
          />

      
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
                      type={showPassword ? 'text' : 'password'}
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
                {firstError === 'password' && <FormMessage />}
              </FormItem>
            )}
          />

          <div className="flex justify-between mt-10 mb-5">
            <Link href="/forgetPassword" className="text-main font-bold underline">
              I forgot my password
            </Link>
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-main text-white hover:bg-green-900"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </div>
        </form>
      </Form>

      <Button className="bg-main hover:bg-green-900 font-bold mt-5">
        Create New Account
      </Button>
    </div>
  )
}
