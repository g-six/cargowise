'use client'

import { useContext, useEffect, useState } from "react"
import { Avatar } from "@/components/avatar"
import { Subheading } from "@/components/heading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table"
import { fetchData } from "@/utils/api"
import { UserCircleIcon } from "@heroicons/react/20/solid"
import { Athlete, Team, TeamAthlete } from "@/data"
import { AddAthleteForm } from "@/components/dialogs/add-athlete"
import { AthleteForm } from "@/components/dialogs/view-athlete"
import { BadgeButton } from "@/components/badge"
import { Context, DispatchContext } from "@/app/(app)/context-provider"
import Loader from "@/components/loader"
import { useParams } from "next/navigation"

export default function AthletesTable(p: { 'data-teams'?: Record<string, any>[], 'data-athlete'?: Athlete }) {
    const params = useParams()
    const ctx = useContext(Context)
    const setCtx = useContext(DispatchContext)
    const [loading, toggleLoading] = useState(false)
    const [team, setTeam] = useState<Team>(p["data-teams"]?.[0] as Team)
    const [athletes, setAthletes] = useState<(Athlete & { teams?: Team[] })[]>(params.slug ? team.athletes || [] : ctx?.athletes || [])
    const [athlete, setAthlete] = useState<Athlete | undefined>(p["data-athlete"])
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
            fetchData('/api/team/' + team.slug + '/athlete/' + record.slug, 'DELETE').then(getData)
        }
    }

    if (loading) return <Loader />
    
    return <>
            <section className="flex justify-between items-center mt-14">
                <Subheading>Athletes</Subheading>
                {p['data-teams']?.length === 1 && <AddAthleteForm data-people={data?.athletes || []} data-team={p['data-teams'][0] as Team} onComplete={getData} />}
            </section>
          <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
            <TableHead>
              <TableRow>
                <TableHeader className="w-8 pr-0!">&nbsp;</TableHeader>
                <TableHeader className="w-56">Name</TableHeader>
                <TableHeader>Date of birth</TableHeader>
                {athletes.find(it => it.teams?.length) && <TableHeader>Teams</TableHeader>}
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {athletes.map((record) => (
                <TableRow key={record.slug} title={`Athlete #${record.slug}`}>
                  <TableCell className="pr-0!">
                    <div className="flex items-center gap-2 justify-center w-full">
                      {record.photo_url ? <Avatar src={record.photo_url} className="size-6" /> : <UserCircleIcon className="size-6 opacity-10" />}
                    </div>
                  </TableCell>
                  <TableCell>{record.last_name}, {record.first_name}</TableCell>
                  <TableCell className="font-mono text-xs">{record.date_of_birth}</TableCell>
                  {record.teams && <TableCell className="font-mono text-xs">{record.teams.map(team => <BadgeButton key={team.slug}>{team.name}</BadgeButton>)}</TableCell>}
                  <TableCell>
                    <AthleteForm data-team={team} data-athlete={record as unknown as TeamAthlete} onComplete={getData} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    </>
}