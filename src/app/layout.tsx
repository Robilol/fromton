import { Analytics } from '@vercel/analytics/react'
import cx from 'classnames'
import type { Metadata } from 'next'
import { Bungee_Shade, Podkova, Telex, Open_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import localFont from 'next/font/local'

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

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-opensans',
})

const polySansBulky = localFont({ src: './fonts/PolySans-Bulky.woff2', variable: '--font-polySansBulky' })
const polySansBulkyWide = localFont({ src: './fonts/PolySans-BulkyWide.woff2', variable: '--font-polySansBulkyWide' })
const polySansMedian = localFont({ src: './fonts/PolySans-Median.woff2', variable: '--font-polySansMedian' })
const polySansSlim = localFont({ src: './fonts/PolySans-Slim.woff2', variable: '--font-polySansSlim' })

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cx(
        'scroll-smooth',
        bungeeShade.variable,
        polySansBulky.variable,
        polySansBulkyWide.variable,
        polySansMedian.variable,
        polySansSlim.variable,
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
              success: {
                iconTheme: {
                  primary: 'green',
                  secondary: 'white',
                },
                className:
                '!rounded-lg !bg-success !border-2 !border-black !shadow-fromton-input !px-8 !py-4',
              },
              
              error: {
                iconTheme: {
                  primary: 'white',
                  secondary: 'red',
                },
                className:
                '!rounded-lg !bg-danger !border-2 !border-black !shadow-fromton-input !px-8 !py-4 !text-white',
              },
            }}
          />
          <Analytics />
        </body>
    </html>
  )
}
