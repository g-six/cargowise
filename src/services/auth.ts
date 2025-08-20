import { hashToken } from '@/utils/cryptography';
import supabase from '@/utils/supabase/client';
import { sendTextMessage } from './open-phone';

export async function getUser(id: string) {
    const { data, error } = await supabase.auth.admin.getUserById(id);
    if (error) {
        console.warn('Error fetching user:', error)
        return null
    }
    return data
}

export async function createUser(email: string, password: string, phone: string) {
    const hashed_password = await hashToken(password);

    const { data, error } = await supabase.from('users').insert({
        email,
        hashed_password,
        phone,
    }).select('*').single();
    if (error) {
        console.warn('Error creating user:', error)
        return null
    } else {
        await sendTextMessage(phone, `Your account has been created successfully!\n Your password is: ${password}`)
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
