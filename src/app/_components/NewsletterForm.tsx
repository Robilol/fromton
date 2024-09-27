'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck } from 'lucide-react'
import type { FC } from 'react'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import Button from '@/app/_components/Button'
import { createClient } from '../../../utils/client'

const LeadFormSchema = z.object({
  email: z
    .string({ required_error: 'Obligatoire' })
    .email({ message: 'Obligatoire' }),
})

export type LeadFormData = typeof LeadFormSchema._output

const NewsletterForm: FC = () => {
  const supabase = createClient()
  
  const [isSubscribed, setIsSubscribed] = useState(false)

  const createLead = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert({ email, from: 'subscribe' })
        .single()

      if (error) throw error

      setIsSubscribed(true)
      return data
    } catch (error) {
      console.error('Error creating lead:', error)
      throw error
    }
  }

  const methods = useForm<LeadFormData>({
    resolver: zodResolver(LeadFormSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = (data: LeadFormData) => {
    return toast.promise(createLead(data.email), {
      loading: 'Inscription',
      success: <b>Inscrit !</b>,
      error: <b>Vous êtes déjà inscrit 😉</b>,
    })
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center gap-8 md:flex-row"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              placeholder="Votre email"
              className="w-72 input"
            />
            <span className="absolute -bottom-6 left-2 text-xs text-red-500">
              {errors.email?.message}
            </span>
          </div>
          <Button
            label={isSubscribed ? 'Inscrit' : "S'inscrire"}
            disabled={isSubscribed}
            loading={methods.formState.isSubmitting}
            icon={
              isSubscribed ? <CircleCheck className="w-6 h-6" /> : undefined
            }
            type="submit"
          />
        </form>
      </FormProvider>
    </>
  )
}

export default NewsletterForm
