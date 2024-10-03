import React from 'react'
import { UserTable } from '@/app/_components/dashboard/user-table'
import { createClient } from '../../../../utils/server'
import { Tables } from '../../../../schema.gen'


export default async function userList({
  params,
}: {
  params: { cheeseId: string }
}) {
  const supabase = createClient()

  const { data: users, error } = await supabase
    .from('profiles')
    .select('*')

    console.log(users)

  if (error) {
    console.error('Error fetching users:', error)
  }

  return (
    <div className="container mx-auto py-8">
      <UserTable users={users || []} />
    </div>
  )
}
