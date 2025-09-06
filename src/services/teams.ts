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

export async function getTeam(slug: string): Promise<Record<string, any> | null> {
    const { data, error } = await supabase
        .from('teams')
        .select('*, team_athletes(*, athletes(*, organization_members(relationship_to_athlete, users(first_name, email, phone)))), team_coaches(*, users(first_name, last_name, email, phone)))')
        .ilike('slug', slug)
        .single()

    if (error) {
        console.warn('Error fetching team by slug:', error)
        return null
    }

    const {team_athletes, team_coaches: coaches, ...team} = data as Record<string, any>

    return {
        ...team,
        coaches: (coaches || []).map((tc: Record<string, any>) => {
            const { users, ...rest } = tc
            return {
                ...rest,
                ...users,
            }
        }),
        athletes: team_athletes.map((ta: Record<string, any>) => {
            const { athletes: { organization_members, ...athlete }, ...rest } = ta
            if (organization_members?.length) {
                athlete.guardians = organization_members.map((om: Record<string, any>) => om.users).flat()
            } else {
                console.log('No organization members for athlete', athlete.first_name)
            }
            return {
                ...rest,
                ...athlete,
            }
        }),
    }
}

export async function addToTeam(data: {
    team: string;
    athlete: string;
    number?: number;
    role?: string;
}) {
    let number = data.number || -1
    if (number === -1) {
        const existing = await supabase.from('team_athletes').select('number').eq('team', data.team).order('number', { ascending: false }).limit(1).single();
        if (existing?.data?.number) number = existing?.data?.number + 1
        else number = 40
    }
    const { data: record } =  await supabase.from('team_athletes').upsert({
        ...data,
        number,
    }).select().single()
    return record
}

export async function updateTeamAthlete(data: {
    team: string;
    athlete: string;
    number: number;
    role: string;
}) {
    let { number, role } = data
    const existing = await supabase.from('team_athletes').select('number').eq('team', data.team).eq('number', number).limit(1).single();
    if (existing.data) {
        console.warn('Error updating athlete: number already in use');
        return;
    }
    return await supabase.from('team_athletes').update({
        number,
        role,
    }).eq('team', data.team).eq('athlete', data.athlete)
}

export async function removeTeamAthlete(data: {
    team: string;
    athlete: string;
}) {
    const { data: record, error } = await supabase.from('team_athletes').delete().match(data).select('*').single()
	if (error) {
		console.warn('Error removing athlete:', error)
		return {
            error
        }
	}

	return record
}