import React from 'react'
import { CheeseTable } from '@/app/_components/dashboard/cheese-table'
import { createClient } from '../../../../utils/server'
import { Cheese } from '@/types/cheese'
export default async function CheesesPage({
  params,
}: {
  params: { cheeseId: string }
}) {
  const supabase = createClient()
  const { data, error } = await supabase.from('cheeses').select('*, milk_types(name), dough_types(name), crust_types(name)').returns<Cheese[]>()

  return (
    <div className="container mx-auto py-8">
      <CheeseTable cheeses={data || []} />
    </div>
  )
}
