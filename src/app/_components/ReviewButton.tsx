'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { type FC, useState, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import Button from '@/app/_components/Button'
import Modal from '@/app/_components/Modal'
import RatingInput from '@/app/_components/form/RatingInput'
import SelectSearch from '@/app/_components/form/SelectSearch'
import TextArea from '@/app/_components/form/TextArea'
import { Tables } from '../../../schema.gen'
import { User } from '@supabase/supabase-js'
import { createClient } from '../../../utils/client'

interface ReviewButtonProps {
  cheese: Tables<'cheeses'>
  user: User | null
}

const createReviewSchema = z.object({
  rating: z.number({ required_error: 'Obligatoire' }),
  review: z.string().optional(),
  shopId: z.number({ required_error: 'Obligatoire' }),
})

type createReviewFormData = typeof createReviewSchema._output

const ReviewButton: FC<ReviewButtonProps> = ({ cheese, user }) => {
  const router = useRouter()
  const supabase = createClient()
  const [ratingModalOpen, setRatingModalOpen] = useState<boolean>(false)
  const [cheeseShops, setCheeseShops] = useState<Tables<'cheese_shops'>[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchCheeseShops = async () => {
      const { data, error } = await supabase
        .from('cheese_shops')
        .select('*')
      if (error) {
        console.error('Error fetching cheese shops:', error)
      } else {
        setCheeseShops(data)
      }
    }
    fetchCheeseShops()
  }, [])

  const methods = useForm<createReviewFormData>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 0,
    },
  })

  const onSubmit = async (data: createReviewFormData) => {
    if (!user) {
      toast.error('Vous devez être connecté pour noter')
      return
    }

    setIsLoading(true)
    const { error } = await supabase
      .from('reviews')
      .insert({
        cheese_id: cheese.id,
        profile_id: user?.id,
        rating: data.rating,
        review: data.review ?? null,
        cheese_shop_id: data.shopId,
      })
    setIsLoading(false)

    if (error) {
      toast.error('Une erreur est survenue')
    } else {
      toast.success('Noté !')
      setRatingModalOpen(false)
    }
  }

  return (
    <>
      <Button
        label="Noter"
        onClick={() =>
          user ? setRatingModalOpen(true) : router.push('/login')
        }
        type="button"
      />
      <Modal
        className="w-full max-w-lg"
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
      >
        <div className="flex flex-col">
          <span className="font-podkova text-3xl">Noter {cheese?.name}</span>
          <FormProvider {...methods}>
            <form
              className="mt-4 flex w-full flex-col items-start gap-4"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <RatingInput name="rating" />
              <TextArea
                rows={5}
                name="review"
                label="Commentaire"
                className="w-full"
              />
              <SelectSearch
                label="Fromagerie"
                name="shopId"
                data={cheeseShops.map((cheeseShop) => ({
                  id: cheeseShop.id,
                  label: cheeseShop.name,
                }))}
              />
              <Button
                className="mt-4 self-end"
                type="submit"
                label="Noter"
                loading={isLoading}
              />
            </form>
          </FormProvider>
        </div>
      </Modal>
    </>
  )
}

export default ReviewButton
