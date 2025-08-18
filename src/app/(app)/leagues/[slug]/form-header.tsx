
'use client';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function FormHeader(p: {
    'data-organization'?: Record<string, any>;
}) {
    const [organization, setOrganization] = useState<Record<string, any>>({})
    const localTime = new Date()
    
    useEffect(() => {
        const { address: add } = p['data-organization'] || {
            address: JSON.parse(localStorage.getItem('address') || '{}')
        }
        const {
            name: training_location,
            ...address
        } = add
        if (p['data-organization']) {
            setOrganization(p['data-organization'])
        } else {
            setOrganization({
                name: localStorage.getItem('name') || 'ClubAthletix',
                training_location,
                ...address,
                phone: localStorage.getItem('phone') || '',
                email: localStorage.getItem('email') || '',
                local_time: localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZoneName: 'short', timeZone: localStorage.getItem('timezone') || undefined }),
            })
        }
    }, [p['data-organization']])
    return (
        <>
            <Heading className="text-center text-2xl! sm:text-left sm:text-3xl!">
                {organization.name || 'Club Athletix'}
            </Heading>
            {`${organization?.season?.description || 'Our dynamic program offers a holistic approach to skill enhancement, fitness development, and mental resilience.'}`.split('\n').map((w, i) => {
                return w.startsWith('#') ? (
                    <Heading key={i} className="text-center sm:text-left">
                        {w.split('#').filter(Boolean).join('')}
                    </Heading>
                ) : (
                    <Text className="text-center sm:text-left" key={i}>
                        {w}
                    </Text>
                );
            })}

            <DescriptionList className="hidden sm:block">
                <DescriptionTerm className="flex! items-center gap-2">
                    <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                    <span>We train at</span>
                </DescriptionTerm>
                <DescriptionDetails>
                    {organization?.training_location && <><strong>{organization?.training_location}</strong><br /></>}
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
                    <Link href={`tel:${organization?.phone || '+12367771283'}`} className="hover:text-white">
                        {organization?.phone || '(236) 777-1283'} {organization?.local_time || ''}
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
