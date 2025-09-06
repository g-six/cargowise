import supabase from "@/utils/supabase/client";

export async function getDomainOrganization(domain: string) {
	const { data, error } = await supabase.from('domains').select('*, organizations(*, teams(*, team_athletes(number, role, athlete(first_name, last_name, date_of_birth))), addresses(*), organization_themes(brand), organization_managers(user))').eq('domain', domain).single();
	if (error) {
		console.warn('Error fetching domain organization:', error)
		return null
	}
    const { organizations: { organization_themes: theme, addresses: address, organization_managers: managers, teams, ...organization }, ...d } = data
    
    if (organization?.slug) {
        const announcements = await supabase.from('announcements').select('*').eq('organization', organization.slug).is('active', true).order('created_at', { ascending: false }).limit(2)
        organization.announcements = announcements.data || []
    }
	return {
        ...d,
        ...organization,
        teams: (teams || []).map((t: Record<string, any>) => {
            const { team_athletes, ...team } = t
            return {
                ...team,
                athlete_count: (team_athletes || []).length
            }
        }),
        managers,
        address,
        theme,
    }
}

export async function getFreeDomains(domain: string) {
	const { data, error } = await supabase.from('domains').select('*, organizations(*, addresses(*), organization_themes(brand))').ilike('domain', `${domain}%`);
	if (error) {
		console.warn('Error fetching domain organization:', error)
		return null
	}

    return data
}