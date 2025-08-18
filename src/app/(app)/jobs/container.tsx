'use client'
import { Heading } from '@/components/heading'
import { CreateJobOrderForm } from './form'
import List from './list'
import { useEffect, useState } from 'react';
import { DialogButton } from '@/components/dialog';
import { MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/react/16/solid';
import { Input, InputGroup } from '@/components/input'

export function SidebarShortcut(p: { data: Record<string, any>[] }) {
    const [data, setData] = useState(p.data);

    
}


export default function JobsPageContainer(p: {data: any[]}) {
    const [data, setData] = useState(p.data);
    const [filters, setFilters] = useState({
        keyword: '',
    });
    const [sort, setSort] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            if (filters.keyword.length > 2)
            fetch(['/api/jobs',filters.keyword].filter(Boolean).join('?job='), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json()).then(setData);
                // setData(p.data.filter(job => job.job.toLowerCase().includes(filters.keyword) || job.shipment.toLowerCase().includes(filters.keyword)));
            else setData(p.data)
            clearTimeout(t);
        }, 600)

        return () => clearTimeout(t);
    }, [filters.keyword]);

	return (
		<>
			<div className="flex items-end justify-between gap-4">
				<Heading>Jobs</Heading>
                <div className='flex-1' />

                <InputGroup>
                    <MagnifyingGlassIcon />
                    <Input name="search" placeholder="Search&hellip;" aria-label="Search" onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        setFilters({ ...filters, keyword: searchTerm });
                    }} />
                </InputGroup>

                <DialogButton icon={<UserPlusIcon />} label='Create job order' onClick={(e) => {
                    setIsOpen(true)
                }}>
                </DialogButton>
			</div>
            <List data={data} />
            <CreateJobOrderForm data-show={isOpen} onSuccess={record => setData([record, ...data])} closeListener={() => setIsOpen(false)} />
		</>
	)
}
