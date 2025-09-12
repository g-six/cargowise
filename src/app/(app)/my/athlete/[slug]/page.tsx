import NotFound from "@/app/not-found"
import { getAthlete } from "@/services/athletes"
import { getDomainOrganization } from "@/services/domains"
import { headers } from "next/headers"
import { Heading } from '@/components/heading'
import AthleteForm from "./form"

export default async function MyAthletePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    
    const h = await headers()
    const host = h.get('host')?.split(':')?.[0] || ''
    const organization = await getDomainOrganization(host)

    const athlete = await getAthlete(slug) // TODO: fetch athlete data
    console.log(JSON.stringify(athlete, null, 2))
    if (!athlete) return <NotFound />
    return <section id="athlete-details">
        <Heading>{athlete.first_name}</Heading>
        <AthleteForm data-athlete={athlete} />
      </section>
    // if (!athlete) {
    //     return <div>Athlete not found</div>
    // }

    // return <>
    //     <Heading>{athlete.first_name} {athlete.last_name}</Heading>
    //     <Subheading>{athlete.year_group} | {athlete.teams?.map(t => t.name).join(', ')}</Subheading>

    //     <section className="mt-8 flex justify-between gap-4 w-full">
    //         <div>
    //             <Heading level={3} force="text-base!">Details</Heading>
    //             <Text>View and edit your athlete&rsquo;s details</Text>
    //         </div>
    //         <div>
    //             <AthleteForm data-athlete={athlete} />
    //         </div>
    //     </section>

    //     <section className="mt-8 flex justify-between gap-4 w-full">
    //         <div>
    //             <Heading level={3} force="text-base!">Teams</Heading>
    //             <Text>View the teams your athlete is part of</Text>
    //         </div>
    //     </section>
    //     <AthletesGrid data-teams={athlete.teams || []} />
    // </>
}