'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import Input from './form/Input'
import { createClient } from '../../../utils/client'
import { useRouter } from 'next/navigation'
import Button from './Button'
import Link from 'next/link'

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
  })

export type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm: FC = () => {
  const router = useRouter()
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const handleSubmit: SubmitHandler<LoginFormData> = async ({ email, password }) => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error('Erreur lors de la connexion')
      console.error(error)
    } else {
      router.push('/')
    }
  }



  return (
    <div className="flex flex-col gap-6">
      <FormProvider {...methods}>
        <form
          className="mt-4 flex w-full flex-col items-start gap-4"
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <Input name="email" type="email" label="Adresse email" />
          <Input name="password" type="password" label="Mot de passe" />

          <div className="flex flex-row gap-4 mt-4 justify-between w-full">
            <Link href="/auth/register" className='button !bg-white'>Créer un compte</Link>
            <Button
            loading={methods.formState.isSubmitting}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
            type="submit"
            label="Se connecter"
            className="button !bg-cheese ml-auto disabled:opacity-50 disabled:pointer-events-none"
          />
          </div>
        </form>
      </FormProvider>

    </div>
  )
}