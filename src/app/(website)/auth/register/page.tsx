import React from 'react'
import {RegisterForm} from '@/app/_components/RegisterForm'

export default async function Register() {
  return (
    <div>
      <div className="container mx-auto flex justify-center">
        <div className="bg-white max-w-md rounded-3xl p-8 border border-black shadow-[30px_35px_2px_2px_rgba(0,0,0,0.5)]">
          <h1 className="text-3xl">Inscription</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
