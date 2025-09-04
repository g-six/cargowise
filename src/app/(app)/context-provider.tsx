'use client'

import { createContext, useContext, useReducer } from "react"

export const Context = createContext<Record<string, any> | null>(null)

export const DispatchContext = createContext<any>({})

export default function AppContextProvider({ children, organization = {}, user = {}, athletes = [] }: { children: React.ReactNode; organization?: Record<string, any>; user?: Record<string, any>;  athletes?: Record<string, any>[] }) {
    const [data, dispatch] = useReducer(appReducer, {
        organization,
        user,
        athletes: athletes || user.athletes || [] as Record<string, any>[],
        teams: organization?.teams || [] as Record<string, any>[],
    })

    return <Context value={data}>
        <DispatchContext value={dispatch}>{children}</DispatchContext>
    </Context>
}

function appReducer(state: Record<string, any>, newState: Record<string, any> | undefined) {
    if (newState === undefined) return {}
    return { ...state, ...newState }
}

export function useAppContext() {
    return useContext(Context)
}

export function useAppDispatch() {
    return useContext(DispatchContext)
}