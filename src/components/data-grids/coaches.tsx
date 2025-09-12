'use client'

import { useContext, useState } from "react"
import { Avatar } from "@/components/avatar"
import { Subheading } from "@/components/heading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table"
import { fetchData } from "@/utils/api"
import { UserCircleIcon } from "@heroicons/react/20/solid"
import { Athlete, Team, TeamAthlete, TeamCoach } from "@/data"
import { AddAthleteForm } from "@/components/dialogs/add-athlete"
import { AthleteForm } from "@/components/dialogs/view-athlete"
import { BadgeButton } from "@/components/badge"
import { Context, DispatchContext } from "@/app/context-provider"
import Loader from "@/components/loader"
import { useParams } from "next/navigation"
import Card from "./card"
import { AddCoachForm } from "../dialogs/add-coach"

export default function CoachesGrid(p: { 'data-teams'?: Record<string, any>[] }) {
    const params = useParams()
    const ctx = useContext(Context)
    const setCtx = useContext(DispatchContext)
    const [loading, toggleLoading] = useState(false)
    const [team, setTeam] = useState<Team>(p["data-teams"]?.[0] as Team)
    const [coaches, setCoaches] = useState<(Athlete & { teams?: Team[] })[]>(params.slug ? team?.coaches || [] : ctx?.coaches || [])

    function handleEdit(record: TeamAthlete) {
        // Handle edit action
    }

    if (loading) return <Loader />
    
    return <>
            <section className="flex max-sm:flex-col gap-2 justify-between items-center mt-14">
                <Subheading>Athletes</Subheading>
                {p['data-teams']?.length === 1 && <AddCoachForm data-people={[]} data-team={p['data-teams'][0] as Team} />}
            </section>
            <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-full">
                {coaches.map(c => <Card key={c.slug} title={c.last_name} contents={c.first_name} href={`/my/coach/${c.slug}`} />)}
            </section>
    </>
}