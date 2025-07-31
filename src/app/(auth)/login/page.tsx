"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthContext } from '@/hooks/useAuth'
import { authSchema } from '@/lib/validators'
import { z } from 'zod'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { login } = useAuthContext()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate form data
      authSchema.parse(formData)
      
      // Attempt login
      await login(formData.email, formData.password)
      
      // Redirect to dashboard on success
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Record<string, string> = {}
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        // Handle login errors
        setErrors({ general: 'Login failed. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen font-bold'>
      {/* Logo Section */}
      <div className='absolute top-6 left-6 lg:top-8 lg:left-8'>
        <Link href="/" className='block'>
          <div className='w-10 h-10 lg:w-12 lg:h-12 bg-[#4479FF] rounded-lg flex items-center justify-center hover:bg-[#3366DD] transition-colors cursor-pointer'>
            <Image src='/regigo 1.svg' alt='Logo' width={50} height={50} />
          </div>
        </Link>
      </div>

      <div className='mx-6 mt-40 lg:flex lg:items-center lg:justify-center lg:mt-0 lg:min-h-screen'>
        <div className='lg:max-w-md lg:w-full lg:px-8'>
          <div className='flex flex-col w-58 lg:w-full'>
            <h1 className='text-2xl font-extrabold lg:text-3xl lg:text-center'>Login</h1>
            <p className='text-gray-600 font-medium lg:text-center lg:mt-2'>Welcome Back!!!</p>
          </div>

          <form onSubmit={handleSubmit} className='flex-col mt-14 lg:mt-8'>
            {errors.general && (
              <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm'>
                {errors.general}
              </div>
            )}

            <div className='mb-6 lg:mb-8'>
              <p className='font-normal mb-2'>Email Address</p>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`border-0 rounded-none border-b-2 focus:ring-0 focus:border-[#0D80F2] ${
                  errors.email ? 'border-red-500' : ''
                }`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
              )}
            </div>

            <div className='mb-8'>
              <p className='font-normal mb-2'>Password</p>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`border-0 rounded-none border-b-2 focus:ring-0 focus:border-[#0D80F2] ${
                  errors.password ? 'border-red-500' : ''
                }`}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
              )}
            </div>

            <div className='flex flex-col items-center'>
              <div className='mt-16 w-full lg:mt-12'>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className='w-full rounded-xs bg-[#4479FF] px-30 py-4 hover:bg-[#3366DD] transition-colors disabled:opacity-50'
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </div>

              <p className='font-normal mt-8 text-center'>
                Don&apos;t have an account?
                <span className='text-[#4479FF] hover:text-[#3366DD] transition-colors'>
                  <Link href="/register-account"> Register</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage