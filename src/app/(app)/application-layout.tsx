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
import { HomeIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from '../logo'

const navItems = [{ label: '...', url: '/', Icon: <Logo className="size-4" /> }]

export function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
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
			<DropdownItem href="/login">
				<ArrowRightStartOnRectangleIcon />
				<DropdownLabel>Sign out</DropdownLabel>
			</DropdownItem>
		</DropdownMenu>
	)
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
	let pathname = usePathname()
	const [data, setData] = useState<Record<string, any>>({})
	const [organization, setOrganization] = useState<Record<string, any>>({})
	const [nav, setNav] = useState(navItems)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	async function getUser(
		jwt: string = localStorage.getItem('access_token') || '',
		refresh_token: string = localStorage.getItem('refresh_token') || ''
	) {
		if (!jwt) {
			await fetch('/api/domains/' + window.location.hostname)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Failed to fetch domain organization')
					}
					return response.json()
				})
				.then((domain) => {
					if (domain) {
						for (const key in domain) {
							if (domain[key]) {
								localStorage.setItem(key, typeof domain[key] === 'object' ? JSON.stringify(domain[key]) : domain[key])
							} else {
								localStorage.removeItem(key)
							}
						}
						setNav((prev) => [
							{
								label: domain.name || 'Domain',
								url: '/domains/' + domain.domain,
								Icon: domain.logo ? (
									<Image alt={domain.name} src={domain.logo} width={16} height={16} />
								) : (
									<Logo className="size-4" />
								),
							},
							...prev.slice(1),
						])
						setOrganization(domain)
					}
				})
		}
		const response = await fetch('/api/auth', {
			headers: {
				Authorization: `Bearer ${jwt}`,
				'X-Refresh-Token': refresh_token,
				'X-Domain': window.location.hostname, // Pass the domain if needed
			},
		})
		if (!response.ok) {
			return
		}
		return response.json()
	}
	useEffect(() => {
		let toStore = {
			email: localStorage.getItem('email') || '',
			id: localStorage.getItem('id') || '',
			phone: localStorage.getItem('phone') || '',
			name: localStorage.getItem('name') || '',
			slug: localStorage.getItem('slug') || '',
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
			getUser()
				.then(({ user }) => {
					if (user) {
						for (const key in user) {
							if (Object.keys(toStore).includes(key)) {
								localStorage.setItem(key, user[key])
								toStore = {
									...toStore,
									[key]: user[key],
								}
							} else localStorage.removeItem(key)
						}
					}
				})
				.catch((w) => {
					if (!data?.email) {
						console.warn('Error fetching user data:', w)
					}
				})
		}
		setData(toStore)
	}, [])

	return data?.access_token || data?.slug === 'cargowise' ? (
		<SidebarLayout
			navbar={
				<Navbar>
					<NavbarSpacer />
					<NavbarSection>
						<Dropdown>
							<DropdownButton as={NavbarItem}>
								<Avatar src="/users/erica.jpg" square />
							</DropdownButton>
							<AccountDropdownMenu anchor="bottom end" />
						</Dropdown>
					</NavbarSection>
				</Navbar>
			}
			sidebar={
				<Sidebar>
					<SidebarHeader>
						<Dropdown>
							<DropdownButton as={SidebarItem}>
								<Avatar src="/teams/catalyst.svg" />
								<SidebarLabel>Cargowise</SidebarLabel>
								<ChevronDownIcon />
							</DropdownButton>
							<DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
								<DropdownItem href="/settings">
									<Cog8ToothIcon />
									<DropdownLabel>Settings</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="#">
									<Avatar slot="icon" src="/teams/catalyst.svg" />
									<DropdownLabel>Cargowise</DropdownLabel>
								</DropdownItem>
								{/* <DropdownItem href="#">
                  <Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
                  <DropdownLabel>Big Events</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem> */}
							</DropdownMenu>
						</Dropdown>
					</SidebarHeader>

					<SidebarBody>
						<SidebarSection>
							<SidebarItem href="/" current={pathname === '/'}>
								<HomeIcon />
								<SidebarLabel>Home</SidebarLabel>
							</SidebarItem>
							{/* <SidebarItem href="/events" current={pathname.startsWith('/events')}>
                <Square2StackIcon />
                <SidebarLabel>Events</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/jobs" current={pathname.startsWith('/jobs')}>
                <TicketIcon />
                <SidebarLabel>Jobs</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem> */}
						</SidebarSection>

						{/* <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Shortcuts</SidebarHeading>
              <JobOrderSidebarShortcut />
            </SidebarSection> */}

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
			{children}
		</SidebarLayout>
	) : (
		<PublicLayout data-organization={organization}>{children}</PublicLayout>
	)
}
