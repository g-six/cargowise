import { getShipmentJobs } from '@/services/shipments'
import type { Metadata } from 'next'
import JobsPageContainer from './container'


export const metadata: Metadata = {
	title: 'Job orders',
}

export default async function Jobs() {
	const data = await getShipmentJobs()

	return (
		<JobsPageContainer data={data} />
	)
}
