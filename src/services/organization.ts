import supabase from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function createOrganization(data: {
    name: string;
    email: string;
    phone?: string;
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
    phone?: string;
}) {
    const existing = await supabase.from('organizations').select('*').eq('name', data.name).eq('email', data.email).single()
    if (existing.data) return NextResponse.json(existing.data, { status: 200 })

	return await createOrganization(data)
}