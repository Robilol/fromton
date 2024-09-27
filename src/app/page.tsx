import React from 'react'

import { IconArrowNarrowRight } from '@tabler/icons-react'
import { EarthIcon, Share2, StarIcon } from 'lucide-react'
import Image from 'next/image'
import NewsletterForm from '@/app/_components/NewsletterForm'

export default function HomePage() {
  return (
    <main className="flex flex-col bg-[#fdeddd] min-h-dvh">
      <div className="container mx-auto flex flex-col md:flex-row py-12 md:py-24 lg:py-48">
        <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col justify-center items-center mt-8 md:mt-0">
          <h1 className="font-bungee text-6xl lg:text-8xl">Fromton</h1>
          <h2 className="text-4xl font-podkova text-center mt-8">
            Découvrez et Notez les Meilleurs <br /> Fromages du Monde
          </h2>
        </div>
        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center relative h-36 md:h-auto">
          <Image src="/logo.svg" alt="logo" fill />
        </div>
      </div>
      <div className="bg-white py-12">
        <div className="container mx-auto">
          <h3 className="font-podkova text-4xl text-center font-bold">
            Rejoignez la communauté Fromton et explorez un univers de fromages
          </h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-24 w-full mt-14">
            <a
              href="#newsletter"
              className="bg-white border border-black shadow-fromton-input rounded-3xl px-8 py-10 w-full hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-fromton-hover transition-all duration-300 ease-in-out"
            >
              <StarIcon className="h-28 w-28 fill-cheese text-cheese" />
              <div className="flex flex-col mt-8 gap-6">
                <span className="font-podkova text-4xl font-bold">Notez</span>
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
                <span>Rejoindre la communauté</span>
                <IconArrowNarrowRight className="h-8 w-8 fill-cheese" />
              </div>
            </a>
            <a
              href="#newsletter"
              className="bg-white border border-black shadow-fromton-input rounded-3xl px-8 py-10 w-full hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-fromton-hover transition-all duration-300 ease-in-out"
            >
              <EarthIcon className="h-28 w-28 text-cheese" />
              <div className="flex flex-col mt-8 gap-6">
                <span className="font-podkova text-4xl font-bold">
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
                <span>Rejoindre la communauté</span>
                <IconArrowNarrowRight className="h-8 w-8 fill-cheese" />
              </div>
            </a>
            <a
              href="#newsletter"
              className="bg-white border border-black shadow-fromton-input rounded-3xl px-8 py-10 w-full hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-fromton-hover transition-all duration-300 ease-in-out"
            >
              <Share2 className="h-28 w-28 fill-cheese text-cheese" />
              <div className="flex flex-col mt-8 gap-6">
                <span className="font-podkova text-4xl font-bold">
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
                <span>Rejoindre la communauté</span>
                <IconArrowNarrowRight className="h-8 w-8 fill-cheese" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-12">
        <h4 className="font-podkova text-4xl text-center font-bold">
          Rejoignez la communauté Fromton
        </h4>
        <div className="mt-12 flex flex-col gap-10 items-center">
          <p className="text-xl">
            Inscrivez-vous à la newsletter et soyez informé de la sortie de
            l&apos;application
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div
        className="border-t border-black py-8 scroll-pt-40 md:scroll-pt-0"
        id="newsletter"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
              <Image src="/logo.svg" alt="logo" width={100} height={100} />
              <span className="font-bungee text-3xl">Fromton</span>
            </div>
            <div className="flex flex-col gap-2">
              <span>© 2021-2024 Fromton</span>
              <span>
                Made with love by{' '}
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
