'use client'

import { SearchIcon, UserCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC, useEffect, useState } from 'react'
import { SearchModal } from '@/app/_components/SearchModal'
import { createClient } from '../../../utils/client'
import { Session } from '@supabase/supabase-js'

export const Navbar: FC = () => {
  const supabase = createClient()
  const [displaySearch, setDisplaySearch] = useState<boolean>(false)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-20 flex justify-center p-1 lg:p-4">
      <div className="relative flex h-16 flex-row items-center justify-center gap-2 overflow-hidden rounded-full border border-black/5 bg-white px-8 py-2 shadow-fromton-navbar transition duration-500 ease-in-out lg:gap-4">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={50} height={1} />
        </Link>
        <h1 className="font-bungee text-2xl">Fromton</h1>
        <Link href={session ? '/account' : '/api/auth/signin'}>
          <UserCircleIcon className="h-8 w-8" />
        </Link>
        <button onClick={() => setDisplaySearch(true)}>
          <SearchIcon className="h-6 w-6" />
        </button>
      </div>
      <SearchModal
        isOpen={displaySearch}
        onClose={() => setDisplaySearch(false)}
      />
    </div>
  )

  // return (
  //   <div className="flex flex-row items-center gap-2 bg-white">
  //     <div className="flex flex-row items-center justify-center gap-12">
  //       <Image src="/logo.svg" alt="logo" width={100} height={1} />
  //       <h1 className="font-bungee text-xl">Fromton</h1>
  //     </div>
  //     <div className="flex flex-col items-center justify-center gap-4">
  //       <p className="text-center text-2xl text-white">
  //         {session && <span>Logged in as {session.user?.name}</span>}
  //       </p>
  //       <Link
  //         href={session ? "/api/auth/signout" : "/api/auth/signin"}
  //         className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
  //       >
  //         {session ? "Sign out" : "Sign in"}
  //       </Link>
  //     </div>
  //   </div>
  // );
}
