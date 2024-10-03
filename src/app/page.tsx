import React from 'react'

import { IconArrowNarrowRight } from '@tabler/icons-react'
import { EarthIcon, HeartIcon, Share2, StarIcon } from 'lucide-react'
import Image from 'next/image'
import NewsletterForm from '@/app/_components/NewsletterForm'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-dvh bg-yellow">
      <div className='flex flex-row justify-between items-center px-4 py-4 lg:py-9 lg:px-10'>
      <Image src="/logo.svg" alt="logo" height={100} width={100} />
      {/* <div className='container mx-auto flex flex-row items-center justify-center'>
        <ul className='flex flex-row gap-12 font-semibold font-polySansMedian text-xl'>
          <li>Fromages</li>
          <li>Fromageries</li>
          <li>Producteurs</li>
        </ul>
      </div> */}
      <div>
        <Link href="#newsletter" className='button block whitespace-nowrap font-polySansMedian font-semibold'>S&apos;inscrire</Link>
      </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row pb-12 py-0 md:py-24 lg:pt-20 lg:pb-36">
        <div className="w-full order-2 md:order-1 flex flex-col justify-center items-center mt-8 md:mt-0">
          <h1 className="font-bungee text-6xl lg:text-9xl">Fromton</h1>
          <h2 className="text-4xl font-polySansBulkyWide text-center mt-16">
            Découvrez et Notez les Meilleurs <br /> Fromages du Monde
          </h2>
        </div>
        {/* <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center relative h-36 md:h-auto">
          <Image src="/logo.svg" alt="logo" fill />
        </div> */}
      </div>
      <div className="bg-body border-y-2 border-black py-12 lgpy-24">
        <div className="container mx-auto">
          <h3 className="font-polySansBulkyWide text-4xl lg:text-5xl text-center font-bold">
            Rejoignez la communauté Fromton et explorez un univers de fromages
          </h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-24 w-full mt-12 lg:mt-24">
            <a
              href="#newsletter"
              className="bg-[#FFc6e7] border shadow-fromton-input border-black rounded-3xl px-8 py-10 w-full transition-all duration-300 ease-in-out transform hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-fromton-hover hover:rotate-3 hover:scale-[1.02]"
            >
              <StarIcon className="lg:h-28 lg:w-28 h-20 w-20  fill-black" />
              <div className="flex flex-col mt-8 gap-6 font-polySansSlim">
                <span className="font-polySansMedian text-4xl font-bold">Notez</span>
                <p>
                  Partagez vos avis sur les fromages que vous dégustez et aidez
                  les autres à découvrir les meilleures variétés. Votre opinion
                  compte ! Notez chaque fromage et contribuez à une base de
                  données fiable.
                </p>
                <p>
                  Rejoignez une communauté de passionnés et influencez les choix
                  des autres amateurs de fromage. Ensemble, nous pouvons
                  apprécier et évaluer la richesse des fromages du monde entier.
                </p>
              </div>
              <div className="flex gap-4 font-bold items-center mt-8 text-lg">
                <span className="font-polySansBulkyWide">Rejoindre la communauté</span>
                <IconArrowNarrowRight className="h-8 w-8 fill-yellow" />
              </div>
            </a>
            <a
              href="#newsletter"
              className="bg-[#ffe959] border shadow-fromton-input border-black rounded-3xl px-8 py-10 w-full transition-all duration-300 ease-in-out transform hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-fromton-hover hover:-rotate-3 hover:scale-[1.02]"
            >
              <EarthIcon className="h-20 w-20 lg:h-28 lg:w-28 " />
              <div className="flex flex-col mt-8 gap-6 font-polySansSlim">
                <span className="font-polySansMedian text-4xl font-bold">
                  Découvrez
                </span>
                <p>
                  Utilisez notre moteur de recherche pour trouver le fromage
                  idéal par type, origine ou lait utilisé. Explorez une
                  collection détaillée et trouvez ce qui vous convient. Chaque
                  recherche est rapide et intuitive.
                </p>
                <p>
                  Découvrez de nouveaux fromages grâce aux descriptions
                  complètes et aux avis des utilisateurs. Notre outil de
                  recherche vous guide vers les meilleures options disponibles,
                  quelle que soit votre préférence.
                </p>
              </div>
              <div className="flex gap-4 font-bold items-center mt-8 text-lg">
                <span className="font-polySansBulkyWide">Rejoindre la communauté</span>
                <IconArrowNarrowRight className="h-8 w-8 fill-yellow" />
              </div>
            </a>
            <a
              href="#newsletter"
              className="bg-[#b0f6ff] border shadow-fromton-input border-black rounded-3xl px-8 py-10 w-full transition-all duration-300 ease-in-out transform hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-fromton-hover hover:rotate-3 hover:scale-[1.02]"
            >
              <Share2 className="h-20 w-20 lg:h-28 lg:w-28 fill-black" />
              <div className="flex flex-col mt-8 gap-6 font-polySansSlim">
                <span className="font-polySansMedian text-4xl font-bold">
                  Partagez
                </span>
                <p>
                  Goûté un fromage exceptionnel ? Ajoutez des descriptions et
                  photos pour faire découvrir vos trouvailles à la communauté.
                  Enrichissez l&apos;expérience de tous ! Partagez vos découvertes et
                  inspirez d&apos;autres amateurs.
                </p>
                <p>
                  Échangez avec d’autres passionnés et découvrez leurs
                  recommandations. Votre contribution aide à créer une
                  plateforme vivante dédiée à la célébration des fromages du
                  monde entier.
                </p>
              </div>
              <div className="flex gap-4 font-bold items-center mt-8 text-lg">
                <span className="font-polySansBulkyWide">Rejoindre la communauté</span>
                <IconArrowNarrowRight className="h-8 w-8 fill-yellow" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-12 lg:py-24">
        <h4 className="font-polySansBulkyWide text-4xl lg:text-5xl text-center font-bold">
          Rejoignez la communauté Fromton
        </h4>
        <div className="mt-12 flex flex-col gap-10 items-center">
          <p className="text-2xl font-polySansSlim">
            Inscrivez-vous à la newsletter et soyez informé de la sortie de
            l&apos;application
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div
        className="border-t-2 border-black py-12 lg:py-24 scroll-pt-40 md:scroll-pt-0 bg-black"
        id="newsletter"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
              <Image src="/logo.svg" alt="logo" width={100} height={100} />
              <span className="font-bungee text-3xl text-yellow">Fromton</span>
            </div>
            <div className="flex flex-col gap-2 text-white font-polySansSlim">
              <span>© 2021-2024 Fromton</span>
              <span className="flex flex-row gap-2 items-center">
                Made with <HeartIcon className="w-4 h-4 fill-white" /> by{' '}
                <a target="_blank" href="https://www.robin-regis.fr/">
                  Robin Regis
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
