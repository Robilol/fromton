import { RegisterForm } from "@/app/_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex justify-center">
      <div className="bg-white max-w-md rounded-3xl p-8 border-2 border-black shadow-fromton-input">
        <h1 className="text-3xl font-polySansBulkyWide">Inscription</h1>
        <RegisterForm />
      </div>
    </div>
  )
}