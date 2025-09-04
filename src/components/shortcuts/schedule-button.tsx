import { UserPlusIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'
import { SidebarItem, SidebarLabel } from '../sidebar'

export default function ScheduleSidebarShortcut({ data }: { data?: Record<string, any>[] }) {
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
			<SidebarLabel>Schedule</SidebarLabel>
		</SidebarItem>
	</>)
}
