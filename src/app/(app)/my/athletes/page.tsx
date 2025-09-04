import { Stat } from '@/app/stat'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import AthletesTable from '@/components/data-tables/athletes'
import { NextRequest } from 'next/server'


export default async function MyAthletesPage(req: NextRequest) {
  return (
    <>
      <Heading>Athletes Overview</Heading>
      <AthletesTable />
    </>
  )
}
