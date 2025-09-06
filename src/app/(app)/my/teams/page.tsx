import { Stat } from '@/app/stat'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import TeamGrid from '../../../../components/data-grids/team-grid'

export default async function MyTeamsPage() {
  return (
    <>
      <Heading>Teams Overview</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      
      <TeamGrid />
    </>
  )
}
