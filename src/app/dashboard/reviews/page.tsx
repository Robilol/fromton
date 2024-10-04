import React from 'react'
import { UserTable } from '@/app/_components/dashboard/user-table'
import { createClient } from '../../../../utils/server'
import { Tables } from '../../../../schema.gen'
import { ReviewTable } from '@/app/_components/dashboard/review-table'


export default async function reviewList() {
  const supabase = createClient()

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*, cheeses(name), cheese_shops(name)')

    console.log(reviews)

  if (error) {
    console.error('Error fetching users:', error)
  }

  return (
    <div className="container mx-auto py-8">
      <ReviewTable reviews={reviews || []} />
    </div>
  )
}
