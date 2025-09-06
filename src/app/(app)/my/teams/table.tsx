'use client'

import { useContext, useState } from "react"
import { Subheading } from "@/components/heading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table"
import { fetchData } from "@/utils/api"
import { Team } from "@/data"
import { Context, DispatchContext } from "@/app/context-provider"

export default function TeamsTable() {
    const [loading, toggleLoading] = useState(false)
    const ctx = useContext(Context)
    const dispatch = useContext(DispatchContext)

    const getData = async () => {
        toggleLoading(true)
        fetchData('/api/teams').then(handleResponse)
    }

    function handleResponse(res?: Record<string, any>) {
        const { records } = res as {
            records: Team[]
        }
        dispatch({ teams: records })
    }
    
    return <>
            <section className="flex justify-between items-center mt-14">
                <Subheading>Teams</Subheading>
            </section>
          <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Age Group</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {ctx?.teams?.map((record: Team) => (
                <TableRow key={record.slug} href={`/my/team/${record.slug}`} title={`Athlete #${record.slug}`}>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.age_group}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    </>
}