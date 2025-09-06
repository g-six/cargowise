import { removeTeamAthlete, updateTeamAthlete } from "@/services/teams"
import { createAthlete, getAthleteWithSlugLike } from "@/services/athletes"
import { addToTeam, getTeam } from "@/services/teams"
import { slugifyAthlete } from "@/utils/slug-helper"
import supabase from "@/utils/supabase/client"
import { NextRequest, NextResponse } from "next/server"
import { hashToken } from "@/utils/cryptography"

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

    if (tokens[4] === 'athlete') {
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
    } else if (tokens[4] === 'coach') {
        const { email, first_name, last_name, phone } = await request.json()
        let user = await supabase.from('users').select('email, first_name, last_name, phone').eq('email', email).single()
        if (!user?.data) {
            // Create user       
            const password = email[0].toUpperCase() + Math.random().toString(36).slice(-4) + '.' + phone.slice(-4)
            const hashed_password = await hashToken(password)

            user = await supabase.from('users').insert({
                email,
                first_name,
                last_name,
                phone,
                hashed_password
            }).select('email, first_name, last_name, phone').single()
        }

        if (user?.data) {
            let member = await supabase.from('team_coaches').select('*').eq('team', team.slug).eq('coach', user.data.email).single()

            if (!member?.data) {
                member = await supabase.from('team_coaches').insert({
                    team: team.slug,
                    coach: user.data.email,
                    rank: 1,
                }).select('*').single()
            }

            return NextResponse.json({
                ...member.data,
                ...user.data,
            })
        }

        return NextResponse.json({ message: 'Not implemented',
            email, first_name, last_name, phone
         }, { status: 501 })
    }
}

export async function PUT(request: NextRequest) {
    const [, access_token] = request.headers.get('authorization')?.split(' ') || []
    if (!access_token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const session = await supabase.from('sessions').select('*, users(*, organization_managers(user))').eq('access_token', access_token).single()

    if (!session.data?.users) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const user = session.data.users.email || ''
    if (!user) return NextResponse.json({ message: 'Unauthorized. User not found' }, { status: 401 })

    const tokens = request.nextUrl.pathname.split('/')

    if (tokens.length < 6) {
        return NextResponse.json({ tokens, message: 'Bad Request' }, { status: 400 })
    }

    const { number, role } = await request.json()
    if (tokens.length === 6) {
        // Add coach to team
        if (tokens[4] === 'coach') {
            return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
        }

        // Add athlete to team
        if (tokens[4] === 'athlete') {
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