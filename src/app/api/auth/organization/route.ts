import { Team, TeamAthlete } from '@/data'
import { getDomainOrganization, getFreeDomains } from '@/services/domains'
import { createOrganization, createOrganizationIfNotFound, getOrganizationByDomain } from '@/services/organization'
import { compareToken, encrypt, hashToken } from '@/utils/cryptography'
import supabase from '@/utils/supabase/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const {
        name,
		first_name,
		last_name,
		email,
		password,
		phone,
		street_address,
		postal_code,
	} = await request.json()

	const hashed_password = await hashToken(password)

	if (!email || !password) {
		return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
	}

	const { data: record, error } = await supabase
		.from('users')
		.insert({
			email,
			hashed_password,
			phone,
			first_name,
			last_name,
			street_address: street_address,
			postal_code: postal_code,
		})
		.select('*')
		.single()

	if (error) {
		return NextResponse.json({ message: error.message }, { status: 400 })
	} else if (record?.email) {
		const access_token = encrypt(email, password)
		let slug = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		slug = slug.trim().replace(/\s+/g, '-')

        const domains = await getFreeDomains(slug)
        if (domains?.length) {
            slug = slug + '-' + phone.substring(-4) + domains.length
        }

        const organization = await createOrganizationIfNotFound({
            name,
            slug,
            email,
            phone,
        })
		return NextResponse.json(
			{
				message: 'Organization and user created successfully',
				record,
                organization,
				access_token,
                slug,
			},
			{ status: 200 }
		)
	}

	return NextResponse.json({ message: 'Unable to process record' }, { status: 400 })
}

