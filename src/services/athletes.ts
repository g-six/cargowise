import { slugifyAthlete } from "@/utils/slug-helper";
import supabase from "@/utils/supabase/client";

export async function getAthlete(slug: string) {
	const { data, error } = await supabase.from('athletes').select(`*, 
        household:organization_members(relationship_to_athlete,contact:users(email, phone, first_name, last_name)),
        plays_for:team_athletes(role, number, 
            team(slug, name, year_group, 
                coaches:team_coaches(
                    contact:users(first_name, last_name, email, phone)
                )
            )
        )
    `).eq('slug', slug).single();
	if (error) {
		console.warn('Error fetching athlete:', error)
		return null
	}

    if (!data) return null;

    let household: {
        relationship_to_athlete: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    }[] = [];
    if (data?.household?.length) {
        for (const h of data.household) {
            if (h.contact) {
                household.push({
                    ...h.contact,
                    relationship_to_athlete: h.relationship_to_athlete
                });
                break;
            }
        }
    }

    const { plays_for, ...athlete } = data as Record<string, any>;
    let teams: Record<string, any>[] = [];

    for (const p of plays_for || []) {
        if (p.team) {
            teams.push({
                ...p.team,
                role: p.role,
                number: p.number
            });
        }
    }

    return {
        ...athlete,
        household,
        teams
    } as Record<string, any> & { household: typeof household; teams: typeof teams; };
}

export async function filterAthletes(filters: Record<string, any>) {
    let records: Record<string, any>[] = [];
    if (filters.year) {
        const { data, error } = await supabase.from('athletes').select('*').gte('date_of_birth', `${filters.year}-01-01`).lte('date_of_birth', `${filters.year}-12-31`);
        if (error) {
            console.warn('Error fetching athlete:', error)
            return null
        }
        if (data?.length) records = data;
    }
    if (filters.name) {
        const { data, error } = await supabase.from('athletes').select('*').or(`first_name.ilike.${filters.name}%,last_name.ilike.${filters.name}%`);

        if (error) {
            console.warn('Error fetching athlete:', error)
            return null
        }
        if (data?.length) records = data;
    }

    return records
}

export async function getAthleteWithSlugLike(slug: string) {
	const { data, error } = await supabase.from('athletes').select('slug').ilike('slug', `${slug}%`);
	if (error) {
		console.warn('Error fetching athlete:', error)
		return null
	}

    return data
}

export async function createAthlete(data: {
    team: string;
    first_name: string;
    last_name: string;
    slug?: string;
    role?: string;
    number?: number;
    date_of_birth: string;
    user?: string;
}) {
    if (!data.slug) {
        data.slug = slugifyAthlete(data)
        const existing = await supabase.from('athletes').select('slug').ilike('slug', data.slug as string).single()
        console.log(existing)
        return existing
    }
    const { user, number, role, team, ...athlete_record } = data
	const { data: athlete, error } = await supabase.from('athletes').insert(athlete_record).select('*').single();
	if (error) {
		console.warn('Error creating athlete:', error)
		return null
	}

    if (number || role || team) {
        return await supabase.from('team_athletes').insert({
            athlete: athlete.slug,
            team,
            number: number || null,
            role: role || 'N/A'
        }).select('*, athlete(*)').single();
    }

    return athlete;
}
