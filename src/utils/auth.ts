import { NextRequest } from "next/server"
import supabase from "./supabase/client"

export async function getAuthUser(request: NextRequest) {
        const [, access_token] = request.headers.get('authorization')?.split(' ') || []
        if (!access_token) return {
            error: 'Invalid access token'
        }
    
        const session = await supabase.from('sessions').select('*, users(*)').eq('access_token', access_token).single()

        if (!session.data?.users) return {
            error: 'Invalid session'
        }
    
        const user = session.data.users.email || ''
        return {
            user,
            error: user ? undefined : 'User not found'
        }
}