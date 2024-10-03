'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createClient } from '../../../utils/client'
import Input from './form/Input'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const registerSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(4),
        confirm: z.string().min(4),
        // username: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ['confirm'],
    })

export type RegisterFormData = z.infer<typeof registerSchema>



export const RegisterForm: FC = () => {
    const router = useRouter()
    const methods = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    })


    const handleSubmit: SubmitHandler<RegisterFormData> = async ({ email, password }) => {
        const supabase = createClient()
        const { error } = await supabase.auth.signUp({ email, password, })

        if (error) {
            console.error(error)
            toast.error(error.message)
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
                    {/* <Input name="username" label="Nom d'utilisateur" /> */}
                    <Input name="email" type="email" label="Adresse email" />
                    <Input name="password" type="password" label="Mot de passe" />
                    <Input
                        name="confirm"
                        type="password"
                        label="Confirmation du mot de passe"
                    />
                    <div className="flex flex-row gap-4 mt-4 justify-between w-full">
                        <Link href="/auth/login" className='button !bg-white'>Se connecter</Link>
                        <input
                            disabled={!methods.formState.isDirty || !methods.formState.isValid}
                            type="submit"
                            value="S'inscrire"
                            className="button !bg-cheese ml-auto disabled:opacity-50 disabled:pointer-events-none"
                        />
                    </div>
                </form>
            </FormProvider>
            {/* <hr className="border-black" />
      <div className="flex flex-col gap-4">
        {providers &&
          Object.values(providers)
            .filter((provider) => provider.type === 'oauth')
            .map((provider) => (
              <div key={provider.name}>
                <button
                  className="button w-full"
                  onClick={() => signIn(provider.id)}
                >
                  <span>Se connecter avec {provider.name}</span>
                </button>
              </div>
            ))}
      </div> */}
        </div>
    )
}