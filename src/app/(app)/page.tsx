import { Heading } from '@/components/heading'
import { getShipmentJobs } from '@/services/shipments'
import JobsPageContainer from './jobs/container'
import { headers } from 'next/headers'
import { getDomainOrganization } from '@/services/domains'
import HeroSection from '@/components/sections/hero'
import FeatureSection from '@/components/sections/feature'
import TestimonialSection from '@/components/sections/testimonial'
import PricingSection from '@/components/sections/pricing'
import FaqSection from '@/components/sections/faq'
import FooterSection from '@/components/sections/footer'

export default async function Home() {
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
            if (organization.slug !== 'cargowise') {
                return <>
                    <HeroSection data-organization={organization} />
                    <FeatureSection />
                    <TestimonialSection />
                    <PricingSection />
                    <FaqSection />
                    <FooterSection />
                </>
            }
        }
    }

	return (
		<>
			<JobsPageContainer data={data} />
		</>
	)
}
