import supabase from "@/utils/supabase/client";

export async function getLocations(query: string) {
    const { data: records } = await supabase.from('addresses')
        .select('*')
        .or(`slug.ilike.%${query}%,name.ilike.%${query}%,street_1.ilike.%${query}%,city_town.ilike.%${query}%,province_state.ilike.%${query}%,country.ilike.%${query}%`)
        .limit(10);
    return records;
}