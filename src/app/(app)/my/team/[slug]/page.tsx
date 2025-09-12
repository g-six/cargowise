import { Heading } from "@/components/heading";
import { getTeam } from "@/services/teams";
import { getAthlete } from "@/services/athletes";
import { Team } from "@/data";
import { Text } from "@/components/text";
import { AddCoachForm } from "@/components/dialogs/add-coach";
import AthletesGrid from "@/components/data-grids/athletes";
import CoachesGrid from "@/components/data-grids/coaches";

export default async function TeamPage(p: { params: Promise<{ slug: string }>; searchParams: Promise<{ add: string }> }) {
    const { slug } = await p.params;
    const { add } = await p.searchParams;
    const athlete = add ? await getAthlete(add) : null;
    const team = await getTeam(slug);

    if (!team) {
        return <div>Team not found</div>
    }

    return <>
        <Heading>{team.name} {team.year_group}</Heading>

        <section className="mt-8 flex justify-between gap-4 w-full">
            <div>
                <Heading level={3} force="text-base!">Coaches</Heading>
                <Text>{team.coaches.length ? 'Manage the' : 'Add your'} team&rsquo;s coaches</Text>
            </div>
            <div>
                <AddCoachForm data-team={team as Team} data-people={[]} />
            </div>
        </section>
        <CoachesGrid data-team={team as Team} />
        
        <AthletesGrid data-teams={[team].filter(Boolean) as Record<string, any>[]} />
    </>
}