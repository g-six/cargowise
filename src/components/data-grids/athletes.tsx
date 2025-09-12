'use client'

import { useContext, useState } from "react"
import { Avatar } from "@/components/avatar"
import { Subheading } from "@/components/heading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table"
import { fetchData } from "@/utils/api"
import { UserCircleIcon } from "@heroicons/react/20/solid"
import { Athlete, Team, TeamAthlete } from "@/data"
import { AddAthleteForm } from "@/components/dialogs/add-athlete"
import { AthleteForm } from "@/components/dialogs/view-athlete"
import { BadgeButton } from "@/components/badge"
import { Context, DispatchContext } from "@/app/context-provider"
import Loader from "@/components/loader"
import { useParams } from "next/navigation"
import Card from "./card"

export default function AthletesGrid(p: { 'data-teams'?: Record<string, any>[] }) {
    const params = useParams()
    const ctx = useContext(Context)
    const setCtx = useContext(DispatchContext)
    const [loading, toggleLoading] = useState(false)
    const [team, setTeam] = useState<Team>(p["data-teams"]?.[0] as Team)
    const [athletes, setAthletes] = useState<(Athlete & { teams?: Team[] })[]>(params.slug ? team.athletes || [] : ctx?.athletes || [])
    const [data, setData] = useState<{
        my: {
            athletes: (TeamAthlete & { teams: Team[] })[]
            teams: Team[]
        },
        athletes: (Athlete & { teams: Team[] })[]
    }>({
        my: {
            athletes: [],
            teams: []
        },
        athletes: []
    })

    const getData = async (record?: Record<string, any>) => {
        if (team) {
            fetchData('/api/team/' + team.slug).then(handleTeamRoster)
        } else if (ctx?.athletes) {
            toggleLoading(false)
            setData(prev => ({
                ...prev,
                my: {
                    ...prev.my,
                    athletes: ctx?.athletes || []
                }
            }))
        }
    }

    function handleTeamRoster(res?: Record<string, any>) {
        const team = (res as any) || { athletes: [] }
        if (team?.athletes) {
            setAthletes(team.athletes)
        }
        if (team.year_group) {
            fetchData('/api/athletes?filters=year:' + team.year_group).then(res => {
                if (res?.length) {
                    const athletes = data?.athletes || []
                    for (const r of res) {
                        if (athletes.findIndex(a => a.slug === r.slug) === -1) {
                            athletes.push(r)
                        }
                    }
                    setData(prev => ({
                        ...prev,
                        athletes
                    }) as typeof data)
                }
            })
            setData({ my: { athletes: team.athletes, teams: [team] }, athletes: [] })
        }
    }

    function handleResponse(res?: Record<string, any>) {
        const { records = [] } = res as any
        const athletes = data?.athletes || []
        athletes.push(...records.filter((r: Athlete) => {
            return athletes.findIndex(a => a.slug === r.slug) === -1
        }))
        setData(prev => {
            return {
                ...prev,
                athletes,
            } as typeof data
        })
    }

    function handleEdit(record: TeamAthlete) {
        // Handle edit action
    }

    function handleDelete(record: TeamAthlete) {
        // Handle delete action
        if (team) {
            fetchData('/api/team/' + team.slug + '/athlete/' + record.slug, { method: 'DELETE' }).then(getData)
        }
    }

    if (loading) return <Loader />
    
    return <>
            <section className="flex max-sm:flex-col gap-2 justify-between items-center mt-14">
                <Subheading>Athletes</Subheading>
                {p['data-teams']?.length === 1 && <AddAthleteForm data-people={data?.athletes || []} data-team={p['data-teams'][0] as Team} onComplete={getData} />}
            </section>
            <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-full">
                {athletes.map(a => <Card key={a.slug} title={a.last_name} contents={a.first_name} href={`/my/athlete/${a.slug}`} />)}
            </section>
    </>
}