import Input from '@/app/_components/form/Input'
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className="mt-4 flex w-full flex-col items-start gap-4">
      <Input label="Email" name="email" type="email" />
      <Input label="Password" name="password" type="password" />
      <div className="flex flex-row gap-4">
      <button
        className="button !bg-cheese ml-auto disabled:opacity-50 mt-4 disabled:pointer-events-none"
        formAction={login}
      >
        Log in
      </button>
      <button
        className="button !bg-cheese ml-auto disabled:opacity-50 mt-4 disabled:pointer-events-none"
        formAction={signup}
      >
        Sign up
      </button>
      </div>
    </form>
  )
}