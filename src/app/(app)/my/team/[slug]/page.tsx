import { Heading, Subheading } from "@/components/heading";
import AthletesTable from "@/components/data-tables/athletes";
import { addToTeam, getTeam } from "@/services/teams";
import { AthleteForm } from "@/components/dialogs/view-athlete";
import { getAthlete } from "@/services/athletes";
import { Team, TeamAthlete } from "@/data";

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
        <AthletesTable data-teams={[team].filter(Boolean) as Record<string, any>[]} data-athlete={athlete} />
    </>
}