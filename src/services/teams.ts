import supabase from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function createTeam(data: {
    organization: string;
    name: string;
    year_group: number;
}) {
    const { data: record, error } = await supabase.from('teams').insert(data).select('*').single()
	if (error) {
		console.warn('Error creating organization:', error)
		return {
            error
        }
	}

	return record
}


export async function createTeamIfNotFound(data: {
    organization: string;
    name: string;
    slug: string;
    year_group: number;
}) {
    const existing = await supabase.from('teams').select('*').eq('slug', data.slug).single()
    if (existing.data) return NextResponse.json(existing.data, { status: 200 })

	return await createTeam(data)
}