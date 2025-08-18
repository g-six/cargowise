import { Logo } from '@/app/logo'
import { Heading } from '@/components/heading'
import type { Metadata } from 'next'
import RegisterForm from './form'
import { signUpNewUser } from './actions'

export const metadata: Metadata = {
  title: 'Register',
}

export default async function Login() {
  return (
    <div className="grid w-full max-w-sm grid-cols-1 gap-8">
      <div className='flex gap-x-2 items-center'><Logo className="h-8 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" /><Heading>Cargowise</Heading></div>
      <Heading>Create your account</Heading>
      <form action={signUpNewUser}>
        <RegisterForm />
      </form>
    </div>
  )
}
