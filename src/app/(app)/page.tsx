import { getShipmentJobs } from '@/services/shipments'
import JobsPageContainer from './jobs/container'
import { headers } from 'next/headers'
import { getDomainOrganization } from '@/services/domains'
import HeroSection from '@/components/sections/hero'
import FaqSection from '@/components/sections/faq'
import FooterSection from '@/components/sections/footer'
import { ConfirmAttendanceForm } from '@/components/dialogs/confirm-attendance'
import { getAttendanceRecord } from '@/services/attendance'

export default async function Home({ searchParams }: { searchParams: Promise< { [key: string]: string | string[] | undefined }> }) {
    const query = await searchParams
	const data = await getShipmentJobs()
    const hdr = await headers()
    let host = ''
    hdr.forEach((value, key) => {
        if (key === 'host') {
            host = value.split(':')?.[0] || ''
        }
    })

    if (host) {
        const organization = await getDomainOrganization(host)
        if (organization) {
            let team_attendance = query?.et ? await getAttendanceRecord(query.et as string) : null;

            return <>
                <HeroSection data-organization={organization} />
                {/* <FeatureSection /> */}
                {/* <TestimonialSection /> */}
                {/* <PricingSection /> */}
                <FaqSection />
                <FooterSection data-organization={organization} />
                {team_attendance?.length ? <ConfirmAttendanceForm data-id={query.et} data-attendance={team_attendance.find(ta => query.a && ta.athlete === query.a)} /> : null}
            </>
        }
    }

	return (
		<>
			<JobsPageContainer data={data} />
		</>
	)
}
