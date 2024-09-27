import Image from 'next/image'
import React from 'react'
import { DarkModeToggle } from '@/app/_components/dashboard/dark-mode-toggle'
import { MainNav } from '@/app/_components/dashboard/main-nav'
import { Search } from '@/app/_components/dashboard/search'
import { ThemeProvider } from '@/app/_components/dashboard/theme-provider'
import { UserNav } from '@/app/_components/dashboard/user-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
              <DarkModeToggle />
            </div>
          </div>
        </div>
        {children}
      </div>
    </ThemeProvider>
  )
}
