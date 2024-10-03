'use client'

import Link from 'next/link'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

import { IconBuildingCottage, IconBuildingStore } from '@tabler/icons-react'
import { SearchIcon, WrenchIcon, XCircleIcon } from 'lucide-react'
import { SearchbarButton } from '@/app/_components/searchbar/SearchbarButton'
import { Skeleton } from '@/components/ui/skeleton'
import { createClient } from '../../../../utils/client'
import { Tables } from '../../../../schema.gen'
import { Cheese } from '@/types/cheese'

export const Searchbar: FC = () => {
  const supabase = createClient()
  const [search, setSearch] = useState<string>('')
  const [cheeses, setCheeses] = useState<Cheese[]>([])
  const [cheeseShops, setCheeseShops] = useState<Tables<'cheese_shops'>[]>([])
  const [isFetchingCheeses, setIsFetchingCheeses] = useState<boolean>(false)
  const [isFetchingCheeseShops, setIsFetchingCheeseShops] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      if (search.length >= 3) {
        setIsFetchingCheeses(true)
        setIsFetchingCheeseShops(true)

        const { data: cheeseData, error: cheeseError } = await supabase
          .from('cheeses')
          .select('*, milk_types(name), dough_types(name), crust_types(name)')
          .ilike('name', `%${search}%`)
          .returns<Cheese[]>()

        if (cheeseError) {
          console.error('Error fetching cheeses:', cheeseError)
        } else {
          setCheeses(cheeseData)
        }
        setIsFetchingCheeses(false)

        const { data: cheeseShopData, error: cheeseShopError } = await supabase
          .from('cheese_shops')
          .select('*')
          .ilike('name', `%${search}%`)

        if (cheeseShopError) {
          console.error('Error fetching cheese shops:', cheeseShopError)
        } else {
          setCheeseShops(cheeseShopData)
        }
        setIsFetchingCheeseShops(false)
      }
    }

    fetchData()
  }, [search])

  console.log(cheeses)

  return (
    <div className="relative flex w-full flex-col items-center gap-2 rounded-3xl border-2 border-black bg-white p-8">
      <div className="flex w-full flex-row items-center gap-4 rounded-full border border-black/25 bg-yellow px-4 py-2 shadow-fromton-searchbar ring-black focus-within:ring-1">
        <SearchIcon className="h-8 w-8" />
        <input
          type="text"
          placeholder="Rechercher des fromages, fromageries et producteurs"
          className="w-full flex-1 border-none bg-transparent outline-none placeholder:italic placeholder:text-inherit focus:outline-none focus:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search?.length > 0 && (
          <button onClick={() => setSearch('')}>
            <XCircleIcon className="h-8 w-8" />
          </button>
        )}
      </div>
      <div className="flex w-full flex-col rounded-lg bg-white p-2">
        <span className="mt-2 text-black/60">Je recherche des...</span>
        <div className="mt-4 flex flex-row items-start gap-4">
          <SearchbarButton label="Fromages" icon={<WrenchIcon />} />
          <SearchbarButton label="Fromageries" icon={<IconBuildingStore />} />
          <SearchbarButton label="Producteurs" icon={<IconBuildingCottage />} />
        </div>
        <div className="mt-2 flex flex-col divide-y divide-black/60">
          <div className="flex flex-col gap-4 py-4">
            <span className="text-black/60">Fromages</span>
            {isFetchingCheeses ? (
              <div className="flex flex-row items-center gap-2 px-2 py-1">
                <Skeleton className="h-[50px] w-[50px] rounded-full" />
                <Skeleton className="h-5 w-72" />
              </div>
            ) : cheeses && cheeses.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {cheeses?.map((cheese) => (
                  <li key={`cheese-${cheese.id}`}>
                    <Link
                      className="flex h-full w-full flex-row items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-primary/50"
                      href={`/cheese/${cheese.slug}`}
                    >
                      <img
                        className="h-[50px] w-[50px] rounded-full"
                        src="https://placehold.co/50x50"
                        alt=""
                      />
                      <span>{cheese.name}</span>
                      <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                      <span>Lait de {cheese?.milk_types?.name}</span>
                      <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                      <span>Pâte {cheese.dough_types?.name}</span>
                      <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                      <span>Croûte {cheese.crust_types?.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <span>Aucun résultat</span>
            )}
          </div>
          <div className="flex flex-col gap-4 py-4">
            <span className="text-black/60">Fromageries</span>
            {isFetchingCheeseShops ? (
              <div className="flex flex-row items-center gap-2 px-2 py-1">
                <Skeleton className="h-[50px] w-[50px] rounded-full" />
                <Skeleton className="h-5 w-72" />
              </div>
            ) : cheeseShops && cheeseShops.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {cheeseShops?.map((cheeseShop) => (
                  <li key={`cheese-${cheeseShop.id}`}>
                    <Link
                      className="flex h-full w-full flex-row items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-primary/50"
                      href={`/shop/${cheeseShop.id}`}
                    >
                      <img
                        className="h-[50px] w-[50px] rounded-full"
                        src="https://placehold.co/50x50"
                        alt=""
                      />
                      <span>{cheeseShop.name}</span>
                      <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                      <span>{cheeseShop.address}</span>
                      <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                      <span>{cheeseShop.zip_code}</span>
                      <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                      <span>{cheeseShop.city}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <span>Aucun résultat</span>
            )}
          </div>
          <div className="flex flex-col gap-4 py-4">
            <span className="text-black/60">Producteurs</span>
            <span>Aucun résultat</span>
          </div>
        </div>
      </div>
    </div>
  )
}
