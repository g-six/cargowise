import { getDomainOrganization } from '@/services/domains'
import { ApplicationLayout } from './application-layout'
import { headers } from 'next/headers'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const headersList = await headers()
    const host = headersList.get('host')?.split(':')?.[0] || ''
    
    const organization = await getDomainOrganization(host)

    return <ApplicationLayout data-organization={organization}>{children}</ApplicationLayout>
}
