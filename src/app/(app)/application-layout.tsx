'use client'

import { Avatar } from '@/components/avatar'
import {
	Dropdown,
	DropdownButton,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownMenu,
} from '@/components/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import { PublicLayout } from '@/components/public-layout'
import SessionComponent from '@/components/session'
import {
	Sidebar,
	SidebarBody,
	SidebarFooter,
	SidebarHeader,
	SidebarHeading,
	SidebarItem,
	SidebarLabel,
	SidebarSection,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import {
	ArrowRightStartOnRectangleIcon,
	ChevronDownIcon,
	Cog8ToothIcon,
	LightBulbIcon,
	ShieldCheckIcon,
	UserCircleIcon,
} from '@heroicons/react/16/solid'
import { CalendarDaysIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from '../logo'
import { fetchData } from '@/utils/api'
import AppContext from "@/app/(app)/context-provider"

const navItems = [{ label: '...', url: '/', Icon: <Logo className="size-4" /> }]

export function AccountDropdownMenu({ anchor, user }: { anchor: 'top start' | 'bottom end'; user: Record<string, any> }) {
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

export function ApplicationLayout({ children, "data-organization": organization = {} }: { children: React.ReactNode, 'data-organization'?: Record<string, any> }) {
	let pathname = usePathname()
	const [data, setData] = useState<Record<string, any>>({})
	const [athletes, setAthletes] = useState<Record<string, any>[]>([])
	const [schedule, setSchedule] = useState<Record<string, any>[]>([])

	useEffect(() => {
		let toStore = {
			email: localStorage.getItem('email') || '',
			first_name: localStorage.getItem('first_name') || '',
			last_name: localStorage.getItem('last_name') || '',
			phone: localStorage.getItem('phone') || '',
			name: localStorage.getItem('name') || '',
			slug: localStorage.getItem('slug') || '',
            access_token: localStorage.getItem('access_token') || '',
            athletes: [],
		}
		if (location && location?.hash) {
			new URLSearchParams(location.hash.slice(1)).forEach((value, key) => {
				localStorage.setItem(key, value)
			})

			const element = document.getElementById(location.hash.slice(1))
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' })
			}
		} else {
			fetchData('/api/auth?app-layout=1')
				.then(({ user, ...auth }) => {
                    if (auth?.athletes?.length) {
                        setAthletes(auth.athletes)
                    }
                    if (auth?.schedule?.length) {
                        setSchedule(auth.schedule)
                    }
					if (user) {
                        const {
                            athletes,
                            city,
                            country,
                            email,
                            first_name,
                            last_name,
                            phone,
                            postal_code,
                            province,
                            street_address,
                        } = user
                        localStorage.setItem('user', JSON.stringify({
                            city,
                            country,
                            email,
                            first_name,
                            last_name,
                            phone,
                            postal_code,
                            province,
                            street_address
                        }, null, 2))
                        toStore.athletes = athletes || []
                        localStorage.setItem('athletes', JSON.stringify(athletes || [], null, 2))

						for (const key in user) {
							if (Object.keys(toStore).includes(key)) {
								localStorage.setItem(key, user[key])
								toStore = {
									...toStore,
									[key]: user[key],
								}
							} else localStorage.removeItem(key)
						}
		                setData(toStore)
					}
				})
				.catch((w) => {
					if (!data?.email) {
						console.warn('Error fetching user data:', w)
					}
				})
                .finally(() => {
                    console.log('ApplicationLayout: User data complete')
                })
		}
	}, [])
    
    if (!data?.access_token && pathname.startsWith('/my')) return <></>

	return data?.access_token && pathname.startsWith('/my') ? (
		<SidebarLayout
			navbar={
				<Navbar>
					<NavbarSpacer />
					<NavbarSection>
						<Dropdown>
							<DropdownButton as={NavbarItem}>
								<Avatar src={organization.logo || "/teams/catalyst.svg"} square />
							</DropdownButton>
							<AccountDropdownMenu anchor="bottom end" user={data} />
						</Dropdown>
					</NavbarSection>
				</Navbar>
			}
			sidebar={
				<Sidebar>
					<SidebarHeader>
						<Dropdown>
							<DropdownButton as={SidebarItem}>
								<Avatar src={organization.logo || "/teams/catalyst.svg"} square />
								<SidebarLabel>{organization.name || 'ClubAthletix'}</SidebarLabel>
								<ChevronDownIcon />
							</DropdownButton>
							<DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
								<DropdownItem href="/settings">
									<Cog8ToothIcon />
									<DropdownLabel>Settings</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="#">
									<Avatar slot="icon" src={organization.logo || "/teams/catalyst.svg"} square />
									<DropdownLabel>{organization.name || 'ClubAthletix'}</DropdownLabel>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</SidebarHeader>

					<SidebarBody>
						<SidebarSection>
							<SidebarItem href="/my" current={pathname === '/my'}>
								<CalendarDaysIcon />
								<SidebarLabel>Dashboard</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/my/teams" current={pathname.startsWith('/my/team')}>
								<UserGroupIcon />
								<SidebarLabel>Teams</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/my/athletes" current={pathname.startsWith('/my/athlete')}>
								<UserCircleIcon />
								<SidebarLabel>Athletes</SidebarLabel>
							</SidebarItem>
						</SidebarSection>

						<SidebarSection className="max-lg:hidden">
                            <SidebarHeading>My Athletes</SidebarHeading>
                        </SidebarSection>

						{/* <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection> */}
					</SidebarBody>

					<SidebarFooter className="max-lg:hidden">
						<SessionComponent data={data} />
					</SidebarFooter>
				</Sidebar>
			}
		>
			<AppContext organization={organization} user={data} athletes={athletes} schedule={schedule}>{children}</AppContext>
		</SidebarLayout>
	) : Object.keys(organization).length > 0 ? (
		<PublicLayout data-organization={organization}>{children}</PublicLayout>
	) : null
}
