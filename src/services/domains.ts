import supabase from "@/utils/supabase/client";

export async function getDomainOrganization(domain: string) {
	const { data, error } = await supabase.from('domains').select('*, organizations(*)').eq('domain', domain).single();
	if (error) {
		console.warn('Error fetching domain organization:', error)
		return null
	}
	return data.organizations
}