import { Stat } from '@/app/stat'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { getAthlete } from '@/services/athletes'


export default async function IndividualAthletePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const athlete = await getAthlete(slug)
  return (
    <>
      <Heading>{athlete.first_name || 'Athlete'}&rsquo;s Overview</Heading>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Training Attendance" value="$2.6M" change="+4.5%" />
        <Stat title="Recent form" value="5,888" change="+4.5%" />
        <Stat title="Next Practice" value="823,067" change="+21.2%" />
        <Stat title="Next Match" value="$455" change="-0.5%" />
      </div>
    </>
  )
}
