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

export default function CoachesTable(p: { 'data-team'?: Team }) {
    const params = useParams()
    const ctx = useContext(Context)
    const setCtx = useContext(DispatchContext)
    const [loading, toggleLoading] = useState(false)
    const [team, setTeam] = useState<Team>(p["data-team"] as Team)
    const getData = async (record?: Record<string, any>) => {
        if (team) {
            fetchData('/api/team/' + team.slug).then(handleTeamRoster)
        }
    }

    function handleTeamRoster(res?: Record<string, any>) {
        const team = (res as any) || { coaches: [] }
    }

    function handleResponse(res?: Record<string, any>) {
        const { records = [] } = res as any
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
          <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
            <TableHead>
              <TableRow>
                <TableHeader className="w-8 pr-0!">&nbsp;</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader className="w-56">Email</TableHeader>
                <TableHeader className="w-56">Phone</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {team?.coaches.map((record) => (
                <TableRow key={record.coach} title={`Coach ${record.first_name}`}>
                  <TableCell className="pr-0!">
                    <div className="flex items-center gap-2 justify-center w-full">
                      {record.photo_url ? <Avatar src={record.photo_url} className="size-6" /> : <UserCircleIcon className="size-6 opacity-10" />}
                    </div>
                  </TableCell>
                  <TableCell>{record.last_name}, {record.first_name}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{record.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    </>
}