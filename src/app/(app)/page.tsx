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
			<Heading>Good afternoon, Erica</Heading>
			{/* <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div> */}
			{/* <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div> */}
			{/* <Subheading className="mt-14">Recent jobs</Subheading> */}
			<JobsPageContainer data={data} />
		</>
	)
}
