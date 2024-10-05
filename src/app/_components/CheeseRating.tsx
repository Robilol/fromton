'use client'

import { StarIcon } from 'lucide-react'
import React, { useEffect, type FC } from 'react'
import Rating from 'react-rating'
import ReviewButton from '@/app/_components/ReviewButton'
import { createClient } from '../../../utils/client'
import { User } from '@supabase/supabase-js'
import { Tables } from '../../../schema.gen'
import { GetCheeseDetails } from '@/types/cheese'

interface CheeseRatingProps {
  cheese: GetCheeseDetails
  user: User | null
}

const CheeseRating: FC<CheeseRatingProps> = ({ cheese, user }) => {
  const supabase = createClient()
  const [review, setReview] = React.useState<Tables<'reviews'> | null>(null)
  const [isFetching, setIsFetching] = React.useState(true)

  useEffect(() => {
    const fetchReview = async () => {
      if (user && cheese) {
        setIsFetching(true)
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('cheese_id', cheese.id)
          .eq('profile_id', user.id)
          .single()

        if (error) {
          console.error('Error fetching review:', error)
        } else {
          setReview(data)
        }
        setIsFetching(false)
      }
    }

    fetchReview()
  }, [user, cheese, supabase])

  return (
    <>
      <div className="mt-4">
        <div className="flex flex-row items-center gap-1">
          {/*@ts-expect-error types*/}
          <Rating
            className="!flex flex-row items-center gap-1"
            initialRating={cheese?.reviews?.length > 0 ? cheese.reviews.reduce((acc, review) => acc + review.rating, 0) / cheese.reviews.length : 0}
            emptySymbol={<StarIcon className="h-6 w-6 text-primary" />}
            fullSymbol={
              <StarIcon className="h-6 w-6 text-primary fill-primary" />
            }
            fractions={2}
            readonly
          />
          <span>({cheese?.reviews?.length > 0 ? cheese.reviews.reduce((acc, review) => acc + review.rating, 0) / cheese.reviews.length : 0})</span>
        </div>
        <p>{cheese?.reviews?.length} avis</p>
      </div>
      <div className="mt-4 flex flex-row justify-between">
        {review && (
          <div className="mt-4">
            <div className="flex flex-row items-center gap-1">
              {/*@ts-expect-error types*/}
              <Rating
                className="!flex flex-row items-center gap-1"
                initialRating={review.rating}
                emptySymbol={<StarIcon className="h-6 w-6 text-primary" />}
                fullSymbol={
                  <StarIcon className="h-6 w-6 text-primary fill-primary" />
                }
                fractions={2}
                readonly
              />
              <span>({review.rating})</span>
            </div>
            <p>Votre avis</p>
          </div>
        )}
        <ReviewButton cheese={cheese} user={user} />
      </div>
    </>
  )
}

export default CheeseRating
