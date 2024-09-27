import { createClient } from '../../../../utils/server'
import AccountForm from './account-form'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  return <AccountForm user={user} />
}