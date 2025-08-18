import supabase from '@/utils/supabase/client';

export async function getUser(id: string) {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
    if (error) {
        console.warn('Error fetching user:', error)
        return null
    }
    return data
}

export async function createUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    if (error) {
        console.warn('Error creating user:', error)
        return null
    }
    return data
}

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if (error) {
        console.warn('Error signing in:', error)
        return null
    }
    return data
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.warn('Error signing out:', error)
        return null
    }
    return true
}
