import { removeTeamAthlete, updateTeamAthlete } from "@/services/teams"
import { createAthlete, getAthleteWithSlugLike } from "@/services/athletes"
import { addToTeam, getTeam } from "@/services/teams"
import { slugifyAthlete } from "@/utils/slug-helper"
import supabase from "@/utils/supabase/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const slug = request.nextUrl.pathname.split('/').pop() || ''
    const team = await getTeam(slug)
    if (!team) {
        return new Response('Not Found', { status: 404 })
    }
    return NextResponse.json(team)
}

export async function POST(request: NextRequest) {
    const [, access_token] = request.headers.get('authorization')?.split(' ') || []
    if (!access_token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const session = await supabase.from('sessions').select('*, users(*)').eq('access_token', access_token).single()

    if (!session.data?.users) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const user = session.data.users.email || ''
    if (!user) return NextResponse.json({ message: 'Unauthorized. User not found' }, { status: 401 })

    const tokens = request.nextUrl.pathname.split('/')
    const team = await getTeam(tokens[3])
    if (!team) {
        return new Response('Not Found', { status: 404 })
    }
    const { date_of_birth, player_first_name, player_last_name, role, number } = await request.json()
    let slug = slugifyAthlete({
        first_name: player_first_name,
        last_name: player_last_name,
        date_of_birth,
        number,
    })
    const athletes = await getAthleteWithSlugLike(slug)
    if (athletes?.length) {
        slug = `${slug}-${athletes.length + 1}`
    }
    const athlete = await createAthlete({
        date_of_birth,
        first_name: player_first_name,
        last_name: player_last_name,
        slug,
        user,
        team: tokens[3],
    })

    if (!athlete) return NextResponse.json({ message: 'Failed to create athlete' }, { status: 500 })

    const ta = await addToTeam({
        team: team.slug,
        athlete: slug,
        number,
        role
    })
    return NextResponse.json({
        ...ta,
        ...athlete
    })
}

export async function PUT(request: NextRequest) {
    const [, access_token] = request.headers.get('authorization')?.split(' ') || []
    if (!access_token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const session = await supabase.from('sessions').select('*, users(*)').eq('access_token', access_token).single()

    if (!session.data?.users) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const user = session.data.users.email || ''
    if (!user) return NextResponse.json({ message: 'Unauthorized. User not found' }, { status: 401 })

    const tokens = request.nextUrl.pathname.split('/')

    const { number, role } = await request.json()
    if (tokens.length === 6) {
        if (!number || !role) {
            // New to the team
            const added = await addToTeam({
                team: tokens[3],
                athlete: tokens[5],
                number,
                role,
            })
            if (!added) {
                return NextResponse.json({
                    message: 'There was an error - athlete not added', 
                    team: tokens[3],
                    athlete: tokens[5],
                }, { status: 400 })
            }
            return NextResponse.json(added)
        } else {
            const updated = await updateTeamAthlete({
                team: tokens[3],
                athlete: tokens[5],
                number,
                role
            })
            if (!updated) {
                return NextResponse.json({
                    message: 'There was an error - athlete not updated',
                    team: tokens[3],
                    athlete: tokens[5],
                }, { status: 400 })
            }
            return NextResponse.json(updated)
        }

    }
    return NextResponse.json({ tokens })
}

export async function DELETE(request: NextRequest) {
    const [, access_token] = request.headers.get('authorization')?.split(' ') || []
    if (!access_token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const session = await supabase.from('sessions').select('*, users(*)').eq('access_token', access_token).single()

    if (!session.data?.users) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const user = session.data.users.email || ''
    if (!user) return NextResponse.json({ message: 'Unauthorized. User not found' }, { status: 401 })

    const tokens = request.nextUrl.pathname.split('/')
    if (tokens.length === 6) {
        const removed = await removeTeamAthlete({
            team: tokens[3],
            athlete: tokens[5]
        })
        if (!removed) {
            return NextResponse.json({ message: 'Athlete not found in team' }, { status: 400 })
        }
        
        return NextResponse.json(removed)
    }
    return NextResponse.json({ tokens })
}