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
import { GetCheeses } from '@/types/cheese'
import Button from '../Button'
import { ProposalModal } from './ProposalModal'
import { toast } from 'react-hot-toast'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SearchbarProps {
  onResultClick?: () => void
}

export const Searchbar: FC<SearchbarProps> = ({ onResultClick }) => {
  const supabase = createClient()
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState<Tables<'cheese_shops'>[] | GetCheeses[] | Tables<'cheese_producers'>[] | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<'cheese' | 'shop' | 'producer'>('cheese')
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      if (search.length >= 3) {
        setIsFetching(true)

        switch (selectedCategory) {
          case 'cheese':
            const { data: cheeseData, error: cheeseError } = await supabase
              .from('cheeses')
              .select('*, milk_types(name), dough_types(name), crust_types(name)')
              .ilike('name', `%${search}%`)
              .returns<GetCheeses[]>()

            if (cheeseError) {
              console.error('Error fetching cheeses:', cheeseError)
            } else {
              setData(cheeseData)
            }
            break

          case 'shop':
            const { data: cheeseShopData, error: cheeseShopError } = await supabase
              .from('cheese_shops')
              .select('*')
              .ilike('name', `%${search}%`)

            if (cheeseShopError) {
              console.error('Error fetching cheese shops:', cheeseShopError)
            } else {
              setData(cheeseShopData)
            }
            break

          case 'producer':
            const { data: producerData, error: producerError } = await supabase
              .from('cheese_producers')
              .select('*')
              .ilike('name', `%${search}%`)

            if (producerError) {
              console.error('Error fetching cheese producers:', producerError)
            } else {
              setData(producerData)
            }
            break
        }

        setIsFetching(false)
      } else {
        setData(null)
      }
    }

    fetchData()
  }, [search, selectedCategory])

  const handleCategoryChange = (category: 'cheese' | 'shop' | 'producer') => {
    setSelectedCategory(category)
    setSearch('')
    setData(null)
  }

  const handleProposalOpen = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      toast.error('Vous devez être connecté pour proposer un fromage')
      return
    }

    setIsProposalModalOpen(true)
  }


  return (
    <>
      <div className="relative flex w-full flex-col items-center gap-2 rounded-3xl border-2 border-black bg-white p-8">
        <div className="flex w-full flex-row items-center gap-4 rounded-full border-2 border-black bg-primary px-4 py-2 shadow-fromton-input ring-black focus-within:ring-1">
          <SearchIcon className="h-8 w-8" />
          <input
            autoComplete="off"
            type="text"
            placeholder={`Rechercher des ${selectedCategory === 'cheese' ? 'fromages' : selectedCategory === 'shop' ? 'fromageries' : 'producteurs'}`}
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
        <div className="flex w-full flex-col rounded-lg p-2">
          <div className="flex flex-row items-start gap-4">
            <SearchbarButton label="Fromages" icon={<WrenchIcon />} selected={selectedCategory === 'cheese'} onClick={() => handleCategoryChange('cheese')} />
            <SearchbarButton label="Fromageries" icon={<IconBuildingStore />} selected={selectedCategory === 'shop'} onClick={() => handleCategoryChange('shop')} />
            <SearchbarButton label="Producteurs" icon={<IconBuildingCottage />} selected={selectedCategory === 'producer'} onClick={() => handleCategoryChange('producer')} />
          </div>
          <div className="mt-4 flex flex-col divide-y divide-black/60">
            {isFetching ? (
              <div className="flex flex-row items-center gap-2 px-2 py-1">
                <Skeleton className="h-[50px] w-[50px] rounded-full" />
                <Skeleton className="h-5 w-72" />
              </div>
            ) : data && data.length > 0 ? (
              <ScrollArea className="max-h-[400px]">
                <ul className="flex flex-col gap-2">
                  {data?.map((item) => {
                    switch (selectedCategory) {
                      case 'cheese':
                        return (
                          <li key={`${(item as GetCheeses).id}`}>
                            <Link
                              onClick={onResultClick}
                              className="flex h-full w-full flex-row items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-primary/50"
                              href={`/cheese/${(item as GetCheeses).slug}`}
                            >
                              <img
                                className="h-[50px] w-[50px] rounded-full"
                                src="https://placehold.co/50x50"
                                alt=""
                              />
                              <span>{(item as GetCheeses).name}</span>
                              <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                              <span>Lait de {(item as GetCheeses).milk_types?.name}</span>
                              <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                              <span>Pâte {(item as GetCheeses).dough_types?.name}</span>
                              <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                              <span>Croûte {(item as GetCheeses).crust_types?.name}</span>
                            </Link>
                          </li>
                        );
                      case 'shop':
                        return (
                          <li key={`${(item as Tables<'cheese_shops'>).id}`}>
                            <Link
                              onClick={onResultClick}
                              className="flex h-full w-full flex-row items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-primary/50"
                              href={`/shop/${item.id}`}
                            >
                              <img
                                className="h-[50px] w-[50px] rounded-full"
                                src="https://placehold.co/50x50"
                                alt=""
                              />
                              <span>{(item as Tables<'cheese_shops'>).name}</span>
                              <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                              <span>{(item as Tables<'cheese_shops'>).address}</span>
                              <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                              <span>{(item as Tables<'cheese_shops'>).city}</span>
                            </Link>
                          </li>
                        );
                      case 'producer':
                        return (
                          <li key={`${(item as Tables<'cheese_producers'>).id}`}>
                            <Link
                              onClick={onResultClick}
                              className="flex h-full w-full flex-row items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-primary/50"
                              href={`/producer/${item.id}`}
                            >
                              <img
                                className="h-[50px] w-[50px] rounded-full"
                                src="https://placehold.co/50x50"
                                alt=""
                              />
                              <span>{(item as Tables<'cheese_producers'>).name}</span>
                              <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                              <span>{(item as Tables<'cheese_producers'>).address}</span>
                              <div className="h-2 w-2 rounded-full bg-primary/70"></div>
                              <span>{(item as Tables<'cheese_producers'>).city}</span>
                            </Link>
                          </li>
                        );
                      default:
                        return null;
                    }
                  })}
                </ul>
              </ScrollArea>
            ) : data && data.length === 0 && (
              <div className="flex flex-col gap-2 mt-4 items-center justify-center mx-auto rounded-3xl border-2 border-black bg-white p-2">
                <span className="text-xl">Aucun résultat</span>
                {selectedCategory === 'cheese' ? (
                  <Button label="Proposer un fromage" onClick={handleProposalOpen} />
                ) : selectedCategory === 'shop' ? (
                  <Button label="Proposer une fromagerie" onClick={handleProposalOpen} />
                ) : selectedCategory === 'producer' ? (
                  <Button label="Proposer un producteur" onClick={handleProposalOpen} />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
      <ProposalModal isOpen={isProposalModalOpen} onClose={() => setIsProposalModalOpen(false)} category={selectedCategory} />
    </>
  )
}
