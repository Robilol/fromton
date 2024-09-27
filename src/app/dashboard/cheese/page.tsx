import React from 'react'
import { CheeseTable } from '@/app/_components/dashboard/cheese-table'
import { createClient } from '../../../../utils/server'
export default async function CheesesPage({
  params,
}: {
  params: { cheeseId: string }
}) {
  const supabase = createClient()
  const { data, error } = await supabase.from('cheeses').select('*')

  return (
    <div className="container mx-auto py-8">
      <CheeseTable cheeses={data} />
    </div>
  )
}
