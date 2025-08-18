import supabase from "@/utils/supabase/client";

export async function getLeague(slug: string) {
	const { data: {
        organizations,
        league_pricing,
        league_cards: cards,
        ...data
    }, error } = await supabase.from('leagues').select('*, league_pricing(*), league_cards(*), organizations(*, organization_themes(brand))').eq('slug', slug).single();
	if (error) {
		console.warn('Error fetching league:', error)
		return null
	}

    const pricing = league_pricing as Record<string, any>[]
    pricing.sort((a, b) => a.fee - b.fee);

    (cards as Record<string, any>[]).sort((a, b) => a.sequence - b.sequence)

    const { organization_themes: theme, ...organization } = organizations
	return {
        ...data,
        organization,
        theme,
        pricing,
        cards,
    }
}