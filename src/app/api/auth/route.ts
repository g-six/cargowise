import supabase from '@/utils/supabase/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const jwt = request.headers.get('Authorization')
    if (!jwt || !jwt.startsWith('Bearer ')) {
        return NextResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
        )
    }
    const [, token] = jwt.split(' ')
	const {
		data: { user },
        error,
	} = await supabase.auth.getUser(token)
	let metadata = user?.user_metadata

	if (!user) {
        const refresh_token = request.headers.get('x-refresh-token') || '';
        if (!refresh_token) return NextResponse.json(
            { message: 'Session not found', token },
            { status: 401 }
        )
        const { data, error } = await supabase.auth.refreshSession({ refresh_token })
        const { session } = data
		
        return NextResponse.json(
            {
                message: 'Session found',
                ...session,
            },
            { status: 200 }
        )
	}

    return NextResponse.json(
        {
            message: 'Session found',
            user,
        },
        { status: 200 }
    )

	// Here you would typically fetch user data based on the session
	// For demonstration, we return a mock user object
}
