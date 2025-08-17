import { getJobOrders } from '@/services/jobs'
import type { Metadata } from 'next'
import JobsPageContainer from './container'


export const metadata: Metadata = {
	title: 'Job orders',
}

export default async function Jobs() {
	const data = await getJobOrders()

	return (
		<JobsPageContainer data={data} />
	)
}
