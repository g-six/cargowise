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
		return NextResponse.json(
            { message: 'Session not found', token, error },
            { status: 401 }
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
