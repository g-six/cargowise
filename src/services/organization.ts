import supabase from "@/utils/supabase/client";
import { NextResponse } from "next/server";
import { createUser } from "./auth";
import { randomUUID } from "node:crypto";

export async function createOrganization(data: {
    name: string;
    email: string;
    phone: string;
}) {
    const user = await createUser(
        data.email,
        `${data.email.split('@').shift()}-${randomUUID().split('-').pop()?.substring(0, 3)}-${data.phone.substring(-4)}`,
        data.phone
    )
    if (!user?.email) {
        console.warn('Error creating user:', user)
        return {
            error: user
        }
    }
    const { data: record, error } = await supabase.from('organizations').insert(data).select('*').single()
	if (error) {
		console.warn('Error creating organization:', error)
		return {
            error
        }
	}

	return record
}


export async function createOrganizationIfNotFound(data: {
    name: string;
    email: string;
    phone: string;
}) {
    const existing = await supabase.from('organizations').select('*').ilike('name', data.name).single()
    if (existing.data) return NextResponse.json(existing.data, { status: 200 })

	return await createOrganization(data)
}

export async function getOrganizationByDomain(domain: string) {
    const { data, error } = await supabase
        .from('domains')
        .select('organizations(*, leagues(*, league_pricing(*)))')
        .ilike('domain', domain)
        .single()

    if (error) {
        console.warn('Error fetching organization by domain:', error)
        return null
    }

    const {leagues, ...organization} = data.organizations as Record<string, any>

    const league = (leagues?.[0] || {}) as Record<string, any>

    return {
        ...organization,
        league,
    }
}