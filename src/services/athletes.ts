import { slugifyAthlete } from "@/utils/slug-helper";
import supabase from "@/utils/supabase/client";

export async function getAthlete(slug: string) {
	const { data, error } = await supabase.from('athletes').select('*, users(*)').eq('slug', slug).single();
	if (error) {
		console.warn('Error fetching athlete:', error)
		return null
	}

    return data
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
    user: string;
}) {
    if (!data.slug) {
        data.slug = slugifyAthlete(data)
        const existing = await supabase.from('athletes').select('slug').ilike('slug', data.slug as string).single()
        console.log(existing)
        return existing
    }
    const { number, role, team, ...athlete_record } = data
	const { data: athlete, error } = await supabase.from('athletes').insert(athlete_record).select('*').single();
	if (error) {
		console.warn('Error creating athlete:', error)
		return null
	}

    return athlete;
}
