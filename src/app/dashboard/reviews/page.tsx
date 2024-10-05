import React from 'react'
import { createClient } from '../../../../utils/server'
import { Tables } from '../../../../schema.gen'
import { ReviewTable } from '@/app/_components/dashboard/review-table'
import { revalidatePath } from 'next/cache'

async function fetchReviews() {
  const supabase = createClient()
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*, cheeses(name), cheese_shops(name)')

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return reviews
}

export default async function ReviewList() {
  const reviews = await fetchReviews()

  const handleReviewsChange = async () => {
    'use server'
    revalidatePath('/dashboard/reviews')
  }

  return (
    <div className="container mx-auto py-8">
      <ReviewTable reviews={reviews} onReviewsChange={handleReviewsChange} />
    </div>
  )
}
