import React from 'react'
import {Navbar} from '@/app/_components/Navbar'

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-between bg-[#fdeddd] py-20 pb-6 lg:py-28 lg:pb-12 min-h-dvh">
      <Navbar />
      <div className="container mx-auto flex flex-col gap-8 px-4">
        {props.children}
      </div>
    </main>
  )
}
