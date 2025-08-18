import { UserPlusIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'
import { SidebarItem, SidebarLabel } from '../sidebar'
import { CreateJobOrderForm } from '@/app/(app)/jobs/form'

export default function JobOrderSidebarShortcut({ data }: { data?: Record<string, any>[] }) {
	const [jobOrders, setJobOrders] = useState(data || [])
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        console.log({ isOpen })
    }, [isOpen])
	return (<>
		<SidebarItem onClick={() => {
            setIsOpen(true)
        }}>
			<UserPlusIcon />
			<SidebarLabel>Create Job Order</SidebarLabel>
		</SidebarItem>
        <CreateJobOrderForm data-show={isOpen} closeListener={() => setIsOpen(false)} />
	</>)
}
