'use server'

import supabase from '@/utils/supabase/client'

export async function signInWithEmail(formData: FormData): Promise<any> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  })

  console.log(data, error)
}