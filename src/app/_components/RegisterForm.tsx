'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import Input from '@/app/_components/form/Input'
import { createClient } from '../../../utils/client'

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
    confirm: z.string().min(4),
    username: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>


export const RegisterForm: FC = () => {
  const supabase = createClient()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  })

  const register = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
        },
      },
    })
    setIsLoading(false)
    if (error) {
      setError(error.message)
      toast.error('Ce compte existe déjà')
    }
  }

  const handleSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    await register(data)
  }

  console.log(error)

  return (
    <div className="flex flex-col gap-6">
      <FormProvider {...methods}>
        <form
          className="mt-4 flex w-full flex-col items-start gap-4"
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <Input name="username" label="Nom d'utilisateur" />
          <Input name="email" type="email" label="Adresse email" />
          <Input name="password" type="password" label="Mot de passe" />
          <Input
            name="confirm"
            type="password"
            label="Confirmation du mot de passe"
          />
          <input
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
            type="submit"
            value="S'inscrire"
            className="button !bg-yellow ml-auto disabled:opacity-50 mt-4 disabled:pointer-events-none"
          />
        </form>
      </FormProvider>
      <hr className="border-black" />
      <div className="flex flex-col gap-4">
        
      </div>
    </div>
  )
}
