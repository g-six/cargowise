'use client'

import { useEffect } from "react"

export default function LogoutPage() {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    useEffect(() => {
        location.href = '/'
    }, [])
    return <>Logging out...</>
}