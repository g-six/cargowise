import { Team, TeamAthlete } from "@/data";
import { filterAthletes } from "@/services/athletes";
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
        const athletes = await filterAthletes(filters)
        return NextResponse.json(athletes)
    }

    const { error, user } = await getAuthUser(request)

    if (!user || error) return NextResponse.json({ error }, { status: 401 })

    const [resultsForManagers, myAthleteResults] = await Promise.all([
        supabase.from('team_managers').select('*, teams(*, team_athletes(*))').eq('user', user),
        supabase.from('athletes').select('*, team_athletes(teams(*))').eq('user', user),
    ]);
    if (resultsForManagers.data?.length) {
        const records = resultsForManagers.data.map(a => {
            const { team_athletes, ...athlete } = a
            const teams = team_athletes?.map((ta: { teams: Team[] }) => ta.teams) || []
            return { ...athlete, teams }
        })
        return NextResponse.json({ domain, records })
    }
    if (myAthleteResults.data?.length) {
        const records = myAthleteResults.data.map(a => {
            const { team_athletes, ...athlete } = a
            const teams = team_athletes?.map((ta: { teams: Team[] }) => ta.teams) || []
            return { ...athlete, teams }
        })
        return NextResponse.json({ domain, records })
    }
    return NextResponse.json({ message: 'You need to be a manager of an organization to view all athletes', domain })
}
