import { getTeamsForDomain } from "@/services/organization";
import { createTeamIfNotFound } from "@/services/teams";
import { normalizeText } from "@/utils/slug-helper";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export async function POST(request: NextRequest) {
    const data = await request.json()
    const { name } = data
    const team = await createTeamIfNotFound({
        name,
        organization: data.organization,
        year_group: data.year_group,
        slug: name.toLowerCase().split(' ').filter(Boolean).join('-') + '-' + data.year_group,
    })
    return NextResponse.json(team)
}

export async function GET(request: NextRequest) {
    const host = request.headers.get('x-domain') || request.headers.get('host')?.split(':')?.[0] || ''
    const data = await getTeamsForDomain(host)
    const { searchParams } = request.nextUrl
    const filters: Record<string, any> = {}
    for (const filter of `${searchParams.get('filters') || ''}`.split(',')) {
        if (filter) {
            const [key, value] = filter.split(':')
            if (key && value)
            filters[key] = value
        }
    }
    if (data?.records && Object.keys(filters).length) {
        return NextResponse.json(data.records.filter((team: Record<string, any>) => {
            const r = Object.keys(filters).reduce((acc, key) => {
                if (!acc) return acc
                if (team[key]) {
                    return normalizeText(`${team[key]}`.toLowerCase()).includes(normalizeText(`${filters[key]}`.toLowerCase()))
                }
                return false
            }, true)
            return r
        }))
    }
    return NextResponse.json(data)
}