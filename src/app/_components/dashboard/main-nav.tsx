'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  
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
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/reviews" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Avis
      </Link>
      <Link
        href="/dashboard/proposals"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/proposals" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Propositions
      </Link>
    </nav>
  )
}
