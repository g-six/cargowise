import supabase from "@/utils/supabase/client";

export async function getDomainOrganization(domain: string) {
	const { data, error } = await supabase.from('domains').select('*, organizations(*, addresses(*), organization_themes(brand))').eq('domain', domain).single();
	if (error) {
		console.warn('Error fetching domain organization:', error)
		return null
	}
    const { organizations: { organization_themes: theme, addresses: address, ...organization }, ...d } = data
    if (organization?.slug) {
        const announcements = await supabase.from('announcements').select('*').eq('organization', organization.slug).order('created_at', { ascending: false }).limit(2)
        organization.announcements = announcements.data || []
    }
	return {
        ...d,
        ...organization,
        address,
        theme,
    }
}