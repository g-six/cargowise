import supabase from "@/utils/supabase/client";
import { NextResponse } from "next/server";
import { createUser } from "./auth";
import { randomUUID } from "node:crypto";

export async function createOrganization(data: {
    name: string;
    email: string;
    phone: string;
    slug: string;
}) {
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
    slug: string;
}) {
    const existing = await supabase.from('organizations').select('*').eq('slug', data.slug).single()
    if (existing.data?.slug) return NextResponse.json(existing.data, { status: 200 })

	return await createOrganization(data)
}

export async function getOrganizationByDomain(domain: string): Promise<Record<string, any> | null> {
    const { data, error } = await supabase
        .from('domains')
        .select('has_registration, organizations(*, teams(*), organization_managers(*), leagues(*, league_pricing(*)))')
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

export async function getTeamsForDomain(domain: string): Promise<Record<string, any> | null> {
    const { data, error } = await supabase
        .from('domains')
        .select('has_registration, organizations(*, teams(*))')
        .ilike('domain', domain)
        .single()

    if (error) {
        console.warn('Error fetching organization by domain:', error)
        return null
    }

    const {teams, ...organization} = data.organizations as Record<string, any>

    return {
        ...organization,
        records: teams,
    }
}