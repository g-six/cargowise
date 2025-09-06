'use client'

import {
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownMenu,
} from '@/components/dropdown'
import {
	ArrowRightStartOnRectangleIcon,
	LightBulbIcon,
	ShieldCheckIcon,
	UserCircleIcon,
} from '@heroicons/react/16/solid'

export default function AccountDropdownMenu({ anchor, user }: { anchor: 'top start' | 'bottom end'; user: Record<string, any> }) {
	return (
		<DropdownMenu className="min-w-64" anchor={anchor}>
			<DropdownItem href="#">
				<UserCircleIcon />
				<DropdownLabel>My account</DropdownLabel>
			</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="#">
				<ShieldCheckIcon />
				<DropdownLabel>Privacy policy</DropdownLabel>
			</DropdownItem>
			<DropdownItem href="#">
				<LightBulbIcon />
				<DropdownLabel>Share feedback</DropdownLabel>
			</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="/logout">
				<ArrowRightStartOnRectangleIcon />
				<DropdownLabel>Sign out</DropdownLabel>
			</DropdownItem>
		</DropdownMenu>
	)
}