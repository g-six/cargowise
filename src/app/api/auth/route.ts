import { Team, TeamAthlete } from '@/data'
import { getOrganizationByDomain } from '@/services/organization'
import { compareToken, encrypt, hashToken } from '@/utils/cryptography'
import supabase from '@/utils/supabase/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const host = request.headers.get('x-domain') || request.headers.get('host')?.split(':')?.[0] || ''
    const organization = await getOrganizationByDomain(host)
    const jwt = request.headers.get('Authorization')
	if (!jwt || !jwt.startsWith('Bearer ')) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	}

	const [, access_token] = jwt.split(' ')

	const {
		data,
	} = await supabase.from('sessions').select(`*, 
        user(
            *,
            athletes(
                slug, first_name, last_name, date_of_birth, 
                team_attendance(*), 
                team_athletes(
                    team(slug, name, age_group, year_group)
                )
            ),
            organization_members(
                *, 
                athletes(*)
            ),
            team_managers(
                teams(*, 
                    team_athletes(number, role, 
                        athlete(*)
                    )
                )
            )
        )`).eq('access_token', access_token).single()
    if (!data?.user)
		return NextResponse.json(
			{
				message: 'Incorrect credentials',
			},
			{ status: 401 }
		)
    const { team_managers, ...user} = data.user

    if (!organization) return NextResponse.json(
			{
				message: 'No organization found',
			},
			{ status: 401 }
		)
	const safe: Record<string, any> = {
		access_token,
	}

    const { organization_managers } = organization
    const athletes: Record<string, any>[] = []
    const household_teams: string[] = []

    if (user.athletes?.length)
    for (const atx of user.athletes) {
        const { team_athletes, team_attendance, ...athlete } = atx
        // atx.teams = team_athletes?.map((ta: { teams: Team }) => ta.teams) || []
        for (const ta of team_athletes || []) {
            const { team_calendar, ...team } = ta.team;
            const a = athletes.findIndex(at => at.slug === athlete.slug)
            if (household_teams.indexOf(team.slug) === -1) household_teams.push(team.slug)
            if (a !== -1) {
                if (!athletes[a].teams) athletes[a].teams = []
                if (athletes[a].teams.findIndex((t: Team) => t.slug === team.slug) === -1) {
                    athletes[a].teams.push(team)
                }
            } else {
                athletes.push({
                    ...athlete,
                    teams: [team],
                })
            }
        }
    }

    let { data: schedule } = await supabase.from('team_calendar').select('*, location(*), team_attendance(athlete, is_going, status)').in('team', household_teams).order('start_date', { ascending: true }).order('start_time', { ascending: true }).limit(20)

    if (!schedule) schedule = []

    const organization_calendar: Record<string, any>[] = []

    if (organization_managers.find((om: Record<string, string>) => om.user === user.email)) {
        const [{ data }, { data: teams }] = await Promise.all([
            supabase.from('athletes').select(`*, users(email, phone, first_name))`).range(0, 99),
            supabase.from('teams').select(`*, team_calendar(*, location(*))`).eq('organization', organization.slug).range(0, 99)
        ]);
        if (data?.length) athletes.push(...data);
        for (const t of teams || []) {
            if (t.team_calendar?.length) {
                for (const tc of t.team_calendar) {
                    if (organization_calendar.findIndex(oc => oc.id === tc.id) === -1) {
                        organization_calendar.push({
                            ...tc,
                            team_name: t.name,
                        })
                    }
                }
            }
        }
    } else if (user.organization_members?.length) {
        for (const om of user.organization_members) {
            if (om.athletes) {
                const { team_athletes, ...a } = om.athletes
                if (athletes.findIndex(at => at.slug === a.slug) === -1) {
                    athletes.push({
                        ...a,
                        teams: team_athletes?.map((ta: { teams: Team }) => ta.teams) || []
                    })
                }
            }
        }
        for (const atx of user.athletes || []) {
            const { team_athletes, ...a } = atx
            if (athletes.findIndex(at => at.slug === a.slug) === -1) {
                athletes.push({
                    ...a,
                    teams: team_athletes?.map((ta: { teams: Team }) => ta.teams) || []
                })
            }
        }
    }

    if (team_managers?.length) {
        // User is managing teams
        safe.teams = team_managers.map((tm: {
            teams: (Team & {
                team_athletes: TeamAthlete[]
            })
        }) => {
            const { team_athletes, ...team } = tm.teams
                const athletes = team_athletes?.map((ta: Record<string, any>) => ({
                    role: ta.role,
                    number: ta.number,
                    ...ta.athlete
                })) || []

                return {
                    ...team,
                    athletes
                }
            
        }).flat()
    }

	Object.keys(user).forEach((key) => {
		if (!['hashed_password', 'temp_code', 'access_token'].includes(key)) {
			safe[key] = user[key]
		}
	})
	if (!user) {
		return NextResponse.json(
			{
				message: 'Incorrect credentials',
			},
			{ status: 401 }
		)
	}
	return NextResponse.json(
		{
			message: 'Session found',
			user: safe,
            organization,
            athletes,
            schedule: ((schedule.length ? schedule : organization_calendar) || []).map(s => {
                return {
                    ...s,
                    athletes: athletes.filter(a => a.teams?.length).filter(a => s.team && a.teams?.findIndex((t: Team) => t.slug === s.team) !== -1).map(a => {
                        return {
                            ...a,
                            is_going: s.team_attendance.find((ta: any) => ta.athlete === a.slug)?.is_going || false,
                            status: s.team_attendance.find((ta: any) => ta.athlete === a.slug)?.status || 'unknown',
                            teams: undefined,
                        }
                    })
                }
            }),
		},
		{ status: 200, headers: { 'Set-Cookie': `access_token=${access_token}; Path=/; HttpOnly`, 'X-Access-Token': access_token } }
	)

	// Here you would typically fetch user data based on the session
	// For demonstration, we return a mock user object
}

export async function POST(request: NextRequest) {
    const host = request.headers.get('x-domain') || request.headers.get('host')?.split(':')?.[0] || ''
    const organization = await getOrganizationByDomain(host)

    if (!organization) return NextResponse.json({ message: 'No organization found' }, { status: 400 })
	const {
		guardian_first_name,
		guardian_last_name,
		email,
		phone,
		street_address,
		postal_code,
		player_first_name,
		player_last_name,
		date_of_birth,
        password,
		player_notes,
	} = await request.json()

	const hashed_password = await hashToken(password)

	if (!email || !password) {
		return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
	}

	const { data: record, error } = await supabase
		.from('users')
		.upsert({
			email,
			hashed_password,
			phone,
			first_name: guardian_first_name,
			last_name: guardian_last_name,
			street_address,
			postal_code,
		})
		.select('*')
		.single()

	if (error) {
		return NextResponse.json({ message: error.message }, { status: 400 })
	} else if (record?.email) {
		const access_token = encrypt(email, password)
		let slug = player_first_name.toLowerCase()
		slug = slug + ' ' + player_last_name.toLowerCase()
		slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		slug = slug.trim().replace(/\s+/g, '-')
		slug = slug.toLowerCase()

        const existing = await supabase.from('athletes').select('slug').eq('slug', slug).single()
        if (existing.data) {
            slug = slug + '-' + date_of_birth.slice(-2) + phone.slice(-2)
        }
		const [athleteResults] = await Promise.all([
			supabase.from('athletes').insert({
				slug,
				first_name: player_first_name,
				last_name: player_last_name,
				date_of_birth,
			}).select('slug').single(),
			supabase.from('sessions').insert({ access_token, user: email }),
		])

        if (athleteResults.data?.slug) await supabase.from('organization_members').insert({
            user: email,
            athlete: athleteResults.data.slug,
            organization: organization.slug,
        });

		return NextResponse.json(
			{
				message: 'User registered successfully',
				record,
				access_token,
			},
			{ status: 200 }
		)
	}

	return NextResponse.json({ message: 'Unable to process record' }, { status: 400 })
}

export async function PUT(request: NextRequest) {
	const { email, password } = await request.json()
	const { data: record } = await supabase.from('users').select('*').eq('email', email).single()
	if (record) {
		const password_correct = await compareToken(password, record.hashed_password)

		if (password_correct) {
			// Only return selected fields, e.g. email and first_name
			const access_token = encrypt(email, password)
			await supabase.from('sessions').upsert({ access_token, user: email }, { onConflict: 'user', ignoreDuplicates: false })
			const safe: Record<string, string> = {
				access_token,
			}
			Object.keys(record).forEach((key) => {
				if (!['hashed_password', 'temp_code'].includes(key)) {
					safe[key] = record[key]
				}
			})
			return NextResponse.json(
				{
					message: 'Session found',
					user: safe,
				},
				{ status: 200 }
			)
		}
	}

	return NextResponse.json(
		{
			message: 'Incorrect credentials\nPlease try again',
		},
		{ status: 401 }
	)

	// Here you would typically fetch user data based on the session
	// For demonstration, we return a mock user object
}
