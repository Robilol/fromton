'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation';
import { createClient } from '../../../../utils/client';

export async function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const supabase = createClient()
  const pathname = usePathname();

  const { data: reviews, error } = await supabase
  .from('reviews')
  .select('id')
  .eq('status', 'pending')

  const { data: proposals, error: errorProposals } = await supabase
  .from('cheese_proposals')
  .select('id')
  .eq('status', 'pending')

  console.log(proposals)

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Tableau de bord
      </Link>
      <Link
        href="/dashboard/users"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/users" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Utilisateurs
      </Link>
      <Link
        href="/dashboard/cheeses"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/cheeses" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Fromages
      </Link>
      <Link
        href="/dashboard/reviews"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary relative",
          pathname === "/dashboard/reviews" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Avis
        {reviews && reviews?.length > 0 && (
          <span className="bg-primary text-black w-4 h-4 flex items-center justify-center absolute -top-2 -right-4 rounded-full text-xs">{reviews?.length}</span>
        )}
      </Link>
      <Link
        href="/dashboard/proposals"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary relative",
          pathname === "/dashboard/proposals" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Propositions
        {proposals && proposals?.length > 0 && (
          <span className="bg-primary text-black w-4 h-4 flex items-center justify-center absolute -top-2 -right-4 rounded-full text-xs">{proposals?.length}</span>
        )}
      </Link>
    </nav>
  )
}
