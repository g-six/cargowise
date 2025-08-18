'use client'
import { Heading } from '@/components/heading'
import { CreateJobOrderForm } from './form'
import List from './list'
import { useState } from 'react';
import { DialogButton } from '@/components/dialog';
import { UserPlusIcon } from '@heroicons/react/16/solid';

export function SidebarShortcut(p: { data: Record<string, any>[] }) {
    const [data, setData] = useState(p.data);

    
}


export default function JobsPageContainer(p: {data: any[]}) {
    const [data, setData] = useState(p.data);
    const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div className="flex items-end justify-between gap-4">
				<Heading>Jobs</Heading>

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
