import { compareToken, hashToken } from '@/utils/cryptography'
import supabase from '@/utils/supabase/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const jwt = request.headers.get('Authorization')
	if (!jwt || !jwt.startsWith('Bearer ')) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	}

	const [, access_token] = jwt.split(' ')

	const {
		data: { users: user },
		error,
	} = await supabase.from('sessions').select('*, users(*)').eq('access_token', access_token).single()
	let metadata = user?.user_metadata
	const safe: Record<string, string> = {
		access_token,
	}
	Object.keys(user).forEach((key) => {
		if (!['hashed_password', 'temp_code'].includes(key)) {
			safe[key] = user[key]
		}
	})
	if (!user) {
		return NextResponse.json(
			{
				message: 'Incorrect credentials',
			},
			{ status: 401 }
		)
	}

	return NextResponse.json(
		{
			message: 'Session found',
			user: safe,
		},
		{ status: 200 }
	)

	// Here you would typically fetch user data based on the session
	// For demonstration, we return a mock user object
}

export async function POST(request: NextRequest) {
	const {
		guardian_first_name,
		guardian_last_name,
		email,
		password,
		phone,
		street_address,
		postal_code,
		player_first_name,
		player_last_name,
		date_of_birth,
		player_notes,
	} = await request.json()

	const hashed_password = await hashToken(password)
	const hashed_email = await hashToken(email)

	if (!email || !password) {
		return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
	}

	const { data: record, error } = await supabase
		.from('users')
		.insert({
			email,
			hashed_password,
			phone,
			first_name: guardian_first_name,
			last_name: guardian_last_name,
			street_address: street_address,
			postal_code: postal_code,
		})
		.select('*')
		.single()

	if (error) {
		return NextResponse.json({ message: error.message }, { status: 400 })
	} else if (record?.email) {
		const access_token = `${hashed_email}.${hashed_password}`
		let slug = player_first_name.toLowerCase()
		slug = slug + ' ' + player_last_name.toLowerCase()
		slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		slug = slug.trim().replace(/\s+/g, '-') + '-' + email.split('@').shift()
		slug = slug.toLowerCase()
		await Promise.all([
			supabase.from('athletes').insert({
				slug,
				user: email,
				first_name: player_first_name,
				last_name: player_last_name,
				date_of_birth,
			}),
			supabase.from('sessions').insert({ access_token, user: email }),
		])
		return NextResponse.json(
			{
				message: 'User registered successfully',
				record,
				access_token,
			},
			{ status: 200 }
		)
	}

	return NextResponse.json({ message: 'Unable to process record' }, { status: 400 })
}

export async function PUT(request: NextRequest) {
	const { email, password } = await request.json()
	const { data: record } = await supabase.from('users').select('*').eq('email', email).single()
	if (record) {
		const password_correct = await compareToken(password, record.hashed_password)

		if (password_correct) {
			// Only return selected fields, e.g. email and first_name
			const [hashed_password, hashed_email] = await Promise.all([hashToken(password), hashToken(email)])
			const access_token = `${hashed_email}.${hashed_password}`
			await supabase.from('sessions').upsert({ access_token, user: email })
			const safe: Record<string, string> = {
				access_token,
			}
			Object.keys(record).forEach((key) => {
				if (!['hashed_password', 'temp_code'].includes(key)) {
					safe[key] = record[key]
				}
			})
			return NextResponse.json(
				{
					message: 'Session found',
					user: safe,
				},
				{ status: 200 }
			)
		}
	}

	return NextResponse.json(
		{
			message: 'Incorrect credentials\nPlease try again',
		},
		{ status: 401 }
	)

	// Here you would typically fetch user data based on the session
	// For demonstration, we return a mock user object
}
