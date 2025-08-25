'use client'

import * as Headless from '@headlessui/react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { NavbarItem } from './navbar'
import Image from 'next/image'
import { Logo } from '@/app/logo'
import Link from 'next/link'
const navigation = [
	{ name: 'Product', href: '#' },
	{ name: 'Features', href: '#' },
	{ name: 'Marketplace', href: '#' },
	{ name: 'Company', href: '#' },
]
function OpenMenuIcon() {
	return (
		<svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
			<path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
		</svg>
	)
}

function CloseMenuIcon() {
	return (
		<svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
			<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
		</svg>
	)
}

function MobileSidebar({ open, close, children }: React.PropsWithChildren<{ open: boolean; close: () => void }>) {
	return (
		<Headless.Dialog open={open} onClose={close} className="lg:hidden">
			<Headless.DialogBackdrop
				transition
				className="fixed inset-0 bg-black/30 transition data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
			/>
			<Headless.DialogPanel
				transition
				className="fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-closed:-translate-x-full"
			>
				<div className="flex h-full flex-col rounded-lg bg-white shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
					<div className="-mb-3 px-4 pt-3">
						<Headless.CloseButton as={NavbarItem} aria-label="Close navigation">
							<CloseMenuIcon />
						</Headless.CloseButton>
					</div>
					{children}
				</div>
			</Headless.DialogPanel>
		</Headless.Dialog>
	)
}

export function PublicLayout({
	'data-organization': organizationData,
	children,
}: React.PropsWithChildren<{ 'data-organization': Record<string, any> }>) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [organization, setOrganization] = useState(organizationData)
    useEffect(() => {
        setOrganization(organizationData)
    }, [organizationData])

	return (
		<div className="bg-zinc-400 dark:bg-gray-900" id="public-layout">
			{/* Header */}
			<header className="absolute inset-x-0 top-0 z-50">
				<nav aria-label="Global" className="mx-auto container flex items-center justify-between p-6 lg:px-8">
					<div className="flex lg:flex-1">
						<a href="#" className="-m-1.5 p-1.5 flex items-center gap-1">
							<span className="sr-only">{organization.name}</span>
							{organization.logo ? <Image src={organization.logo} alt={organization.name} width={24} height={24} className="" /> : <Logo className='size-12' />}
                            {organization.name ? <span className='text-sm dark:text-white font-bold uppercase text-pretty'>{organization.name}</span> : null}
						</a>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(true)}
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-500 dark:text-gray-400"
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="size-6" />
						</button>
					</div>
					<div className="hidden lg:flex lg:gap-x-12">
						{Object.keys(organization.sitemap || {}).map((item) => (
							organization.sitemap[item] ? <Link key={item} href={organization.sitemap[item]} className="text-sm/6 font-semibold text-gray-900 dark:text-white">
								{item}
							</Link> : <span key={item}>{item}</span>
						))}
					</div>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						<a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
							View Schedule <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</nav>
				<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
					<div className="fixed inset-0 z-50" />
					<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
						<div className="flex items-center justify-between">
							<Link href="/" className="-m-1.5 p-1.5">
								<span className="sr-only">{organization.name}</span>
                                {organization.logo ? <Image src={organization.logo} alt={organization.name} width={24} height={24} className="" /> : <Logo className='size-12' />}
							</Link>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon aria-hidden="true" className="size-6" />
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/25">
								<div className="space-y-2 py-6">
									{Object.keys(organization.sitemap || {}).map((item) => (
										<a
											key={item}
											href={organization.sitemap[item]}
											className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
										>
											{item}
										</a>
									))}
								</div>
								<div className="py-6">
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
									>
										View Schedule
									</a>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>

			{/* Content */}
			<main>
				{children}
			</main>
		</div>
	)
}
