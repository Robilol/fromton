import React from 'react'
import { createClient } from '../../../../utils/server'
import { revalidatePath } from 'next/cache'
import { ProposalTable } from '@/app/_components/dashboard/proposal-table'

async function fetchProposals() {
  const supabase = createClient()
  const { data: proposals, error } = await supabase
    .from('cheese_proposals')
    .select('*, cheese_shops(*), profiles(*)')
    .eq('status', 'pending')

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return proposals
}

export default async function ProposalsList() {
  const proposals = await fetchProposals()

  const handleProposalsChange = async () => {
    'use server'
    revalidatePath('/dashboard/proposals')
  }

  console.dir(proposals, { depth: null });



  return (
    <div className="container mx-auto py-8">
      <ProposalTable proposals={proposals} onProposalsChange={handleProposalsChange} />
    </div>
  )
}
