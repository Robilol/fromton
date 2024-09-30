'use client'

import { StarIcon } from 'lucide-react'
import React, { useEffect, type FC } from 'react'
import Rating from 'react-rating'
import ReviewButton from '@/app/_components/ReviewButton'
import { createClient } from '../../../utils/client'
import { User } from '@supabase/supabase-js'
import { Tables } from '../../../schema.gen'

interface CheeseRatingProps {
  cheese: Tables<'cheeses'>
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
          .eq('user_id', user.id)
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
    <div className="mt-4 flex flex-row justify-between">
      {review && (
        <div className="mt-4">
          <div className="flex flex-row items-center gap-1">
            {/*@ts-expect-error types*/}
            <Rating
              className="!flex flex-row items-center gap-1"
              initialRating={review.rating}
              emptySymbol={<StarIcon className="h-6 w-6 text-yellow" />}
              fullSymbol={
                <StarIcon className="h-6 w-6 text-yellow fill-yellow" />
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
  )
}

export default CheeseRating
