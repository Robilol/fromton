import { IconCheese } from '@tabler/icons-react'
import {
  CalendarIcon,
  DropletIcon,
  MilkIcon,
  RulerIcon,
  StarIcon,
  WeightIcon,
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CheeseRating from '@/app/_components/CheeseRating'
import { OptimalTastingPeriod } from '@/app/_components/OptimalTastingPeriod'
import { ProductionMap } from '@/app/_components/ProductionMap'
import { createClient } from '../../../../../utils/server'


export default async function CheeseDetail({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: cheese, error } = await supabase
    .from('cheeses')
    .select('*, milk_types(*), dough_types(*), crust_types(*), cheeses_to_periods(*)')
    .eq('slug', params.slug)
    .single()

  if (!cheese) {
    return null
  }

  return (
    <div className="flex flex-col gap-8 px-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-black shadow-fromton-input bg-white">
          <img src="https://placehold.co/800x600" alt="" />
        </div>
        <div className="grid grid-rows-2 gap-8">
          <div className="rounded-3xl border border-black shadow-fromton-input bg-white p-4">
            <h1 className="font-podkova text-4xl">{cheese?.name}</h1>
            <div className="mt-4 flex flex-row gap-6">
              <div className="flex w-1/2 flex-col gap-2">
                <p className="flex flex-row items-center gap-2">
                  <MilkIcon className="h-8 w-8" />
                  <span>Lait de {cheese?.milk_types?.name}</span>
                </p>
                <p className="flex flex-row items-center gap-2">
                  <IconCheese className="h-8 w-8" />
                  <span>Pâte {cheese?.dough_types?.name}</span>
                </p>
                <p className="flex flex-row items-center gap-2">
                  <IconCheese className="h-8 w-8" />
                  <span>Croûte {cheese?.crust_types?.name}</span>
                </p>
              </div>
              <div className="flex w-1/2 flex-col gap-2">
                <p className="flex flex-row items-center gap-2">
                  <Image src="/aoc.svg" alt="AOC" width="30" height="30" />
                  <span>Obtenu le {cheese?.aoc_year}</span>
                </p>
                <p className="flex flex-row items-center gap-2">
                  <Image src="/aop.png" alt="AOP" width="30" height="30" />
                  <span>Obtenu le {cheese?.aop_year}</span>
                </p>
                <p className="flex flex-row items-center gap-2">
                  <Image src="/igp.svg" alt="IGP" width="30" height="30" />
                  <span>Obtenu le {cheese?.igp_year}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-black shadow-fromton-input bg-white p-4">
            <h3 className="font-podkova text-3xl">Avis</h3>
            <div className="mt-4">
              <div className="flex flex-row items-center gap-1">
                <StarIcon className="h-6 w-6 fill-cheese text-cheese" />
                <StarIcon className="h-6 w-6 fill-cheese text-cheese" />
                <StarIcon className="h-6 w-6 fill-cheese text-cheese" />
                <StarIcon className="h-6 w-6 text-cheese" />
                <StarIcon className="h-6 w-6 text-cheese" />
                <span>(3.02)</span>
              </div>
              <p>2534 avis</p>
            </div>
            <CheeseRating cheese={cheese} user={user} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full self-start rounded-3xl border border-black shadow-fromton-input bg-white p-4 lg:w-1/2">
          <h2 className="font-podkova text-3xl">Description</h2>
          <div
            className="mt-4 flex flex-col gap-2"
            dangerouslySetInnerHTML={{ __html: cheese?.description || '' }}
          ></div>
        </div>
        <div className="flex w-full flex-col gap-8 lg:w-1/2">
          <div className="rounded-3xl border border-black shadow-fromton-input bg-white p-4">
            <h4 className="font-podkova text-3xl">Période de dégustation</h4>
            <OptimalTastingPeriod periods={cheese?.cheeses_to_periods} />
          </div>
          <div className="rounded-3xl border border-black shadow-fromton-input bg-white p-4">
            <h4 className="font-podkova text-3xl">Caractéristiques</h4>
            <div className="mt-4 flex flex-row gap-6">
              <div className="mt-4 flex flex-col gap-2">
                <p className="flex items-center gap-2">
                  <WeightIcon className="h-6 w-6" />
                  <span>Poids: 250g</span>
                </p>
                <p className="flex items-center gap-2">
                  <RulerIcon className="h-6 w-6" />
                  <span>Dimension: 10,5 à 11,5 cm</span>
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <p className="flex items-center gap-2">
                  <CalendarIcon className="h-6 w-6" />
                  <span>Durée d&apos;affinage : minimum 21 jours</span>
                </p>
                <p className="flex items-center gap-2">
                  <DropletIcon className="h-6 w-6" />
                  <span>Matière grasse : 45%</span>
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-black shadow-fromton-input bg-white p-4">
            <h4 className="font-podkova text-3xl">Zone de production</h4>
            <div className="mt-4 flex justify-center">
              <ProductionMap departments={['2a', '75', '78', '13']} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
