import { LoginForm } from "@/app/_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex justify-center">
      <div className="bg-white max-w-md rounded-3xl p-8 border-2 border-black shadow-fromton-input">
        <h1 className="text-3xl font-polySansBulkyWide">Connexion</h1>
        <LoginForm />
      </div>
    </div>
  )
}