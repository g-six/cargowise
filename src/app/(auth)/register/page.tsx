
import { getOrganizationByDomain } from '@/services/organization';

import { headers } from 'next/headers';
import Form from './form';
import FormHeader from './form-header';


export default async function RegisterPage() {
	const hdr = await headers();
	const [host] = `${hdr.get('host')}`.split(':');
	const result = await getOrganizationByDomain(host);
    Object.keys(result || {}).length === 0 && console.warn('No organization found for domain', { host });

	return (
		<div className="mx-auto grid max-w-7xl grid-cols-1 overflow-auto lg:grid-cols-2">
			<div className="relative px-6 py-4 sm:pt-32 lg:static lg:px-8 lg:py-6">
				<div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg flex flex-col gap-2 dark">
                    <FormHeader organization={result as Record<string, any>} />
				</div>
			</div>

			
            <Form data-theme="dark" organization={result as any} />
		</div>
	);
}