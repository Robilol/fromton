import { Analytics } from '@vercel/analytics/react'
import cx from 'classnames'
import type { Metadata } from 'next'
import { Bungee_Shade, Podkova, Telex } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import './globals.css'

import { cookies } from 'next/headers'
import React from 'react'

export const metadata: Metadata = {
  title: 'Fromton - Découvrez et Notez les Meilleurs Fromages du Monde',
  description:
    "Rejoignez la communauté Fromton et explorez un univers de fromages. Notez, découvrez et partagez vos avis sur une variété infinie de fromages. Téléchargez l'app pour une expérience fromagère unique.",
}

const bungeeShade = Bungee_Shade({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-bungee',
})

const podkova = Podkova({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-podkova',
})

const telex = Telex({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-telex',
})

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cx(
        'scroll-smooth',
        bungeeShade.variable,
        podkova.variable,
        telex.variable,
      )}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fbd640" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
        <body className="font-telex">
            {props.children}
          <Toaster
            toastOptions={{
              position: 'bottom-right',
              className:
                '!rounded-lg !bg-white !border !border-black !shadow-fromton-input !px-8 !py-4',
              success: {
                iconTheme: {
                  primary: 'green',
                  secondary: 'white',
                },
              },
            }}
          />
          <Analytics />
        </body>
    </html>
  )
}
