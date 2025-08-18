'use server'

import supabase from '@/utils/supabase/client'

export async function signUpNewUser(formData: FormData): Promise<any> {
	const email = formData.get('email') as string
	const password = formData.get('password') as string
	if (!email || !password) {
		throw new Error('Email and password are required')
	}
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: 'https://example.com/welcome',
		},
	})

	console.log('Sign up data:', data)
	if (error) {
		console.error('Error signing up:', error)
		throw new Error(error.message)
	}
	return data
}
