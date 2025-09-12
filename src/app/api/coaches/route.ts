import { Team } from "@/data";
import { filterCoaches } from "@/services/coaches";
import { getAuthUser } from "@/utils/auth";
import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams, hostname } = request.nextUrl
    const domain = request.headers.get('x-domain') || request.headers.get('host')?.split(':')?.[0] || hostname || '' 
    const filters: Record<string, any> = {}
    for (const filter of `${searchParams.get('filters') || ''}`.split(',')) {
        if (filter) {
            const [key, value] = filter.split(':')
            filters[key] = value
        }
    }
    if (Object.keys(filters).length) {
        const athletes = await filterCoaches(filters)
        return NextResponse.json(athletes)
    }

    const { error, user } = await getAuthUser(request)

    if (!user || error) return NextResponse.json({ error }, { status: 401 })

    const results = await supabase.from('team_managers').select('*, teams(*, team_coaches(*))').eq('user', user)
    
    if (results.data?.length) {
        const records = results.data.map(a => {
            const { teams, ...managers } = a
            
            return { ...managers, teams }
        })
        return NextResponse.json({ domain, records })
    }
    
}
