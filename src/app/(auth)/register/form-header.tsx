import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { Database } from '@/database.types';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
export default function FormHeader({
	organization,
}: {
	organization: Record<string, any>
}) {
	return (
		<>
			<Heading className="text-center text-2xl! sm:text-left sm:text-3xl!">
				{organization?.league?.name || 'Club Athletix'}
			</Heading>
			{`${organization?.league?.description || 'Our dynamic program offers a holistic approach to skill enhancement, fitness development, and mental resilience.'}`.split('\n').map((w, i) => {
				return w.startsWith('#') ? (
					<Heading key={i} className="text-center sm:text-left" force='text-white!'>
						{w.split('#').filter(Boolean).join('')}
					</Heading>
				) : (
					<Text className="text-center sm:text-left text-white!" key={i}>
						{w}
					</Text>
				);
			})}

			<DescriptionList className="hidden sm:block">
				<DescriptionTerm className="flex! items-center gap-2">
					<BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
					<span>We train</span>
				</DescriptionTerm>
				<DescriptionDetails>
					{[organization?.street_1, organization?.street_2].filter(Boolean).join(', ')}
					<br />
					{[organization?.city_town, organization?.state_province, organization?.postal_zip_code]
						.filter(Boolean)
						.join(', ')}
				</DescriptionDetails>

				<DescriptionTerm className="flex! items-center gap-2">
					<PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
					<span>Call Rey</span>
				</DescriptionTerm>
				<DescriptionDetails>
					<Link href={`tel:${organization?.phone}`} className="hover:text-white">
						{organization?.phone || ''}
					</Link>
				</DescriptionDetails>

				<DescriptionTerm className="flex! items-center gap-2">
					<EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
					<span>Email</span>
				</DescriptionTerm>
				<DescriptionDetails>
					<Link href={`mailto:${organization?.email}`} className="hover:text-white">
						{organization?.email || ''}
					</Link>
				</DescriptionDetails>
			</DescriptionList>
		</>
	);
}
