import supabase from "@/utils/supabase/client";


export async function filterCoaches(filters: Record<string, any>) {
    let records: Record<string, any>[] = [];
    if (filters.name) {
        const { data, error } = await supabase.from('users').select('*, coach:team_coaches(*)').or(`first_name.ilike.${filters.name}%,last_name.ilike.${filters.name}%`);

        if (error) {
            console.warn('Error fetching coach:', error)
            return null
        }
        if (data?.length) records = data;
    }

    return records
}