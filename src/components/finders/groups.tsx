'use client'

import {
	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
	Dialog,
	DialogBackdrop,
	DialogPanel,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Button } from '../button'
import { fetchData } from '@/utils/api'

export default function GroupFinder({
	groups = [],
	onSelect,
    label = 'team'
}: {
	groups?: Record<string, any>[]
	onSelect(group: Record<string, any>): void
    label?: string;
}) {
	const [query, setQuery] = useState('')
	const [debouncedQuery, setDebouncedQuery] = useState(query)
	const [open, setOpen] = useState(false)
	const [loading, toggleLoading] = useState(true)
	const [filtered, setFilteredGroups] = useState(groups)

	useEffect(() => {
		if (query) {
			setFilteredGroups(groups.filter((group) => group.name.toLowerCase().startsWith(query.toLowerCase())) || [])
		} else {
			setFilteredGroups(groups)
		}
		const handler = setTimeout(() => {
			setDebouncedQuery(query)
		}, 300)
		return () => clearTimeout(handler)
	}, [query])

	useEffect(() => {
		if (debouncedQuery) {
            toggleLoading(true);
			fetchData(`/api/teams?filters=name:${debouncedQuery}`)
				.then((filteredResults) => {
                    setFilteredGroups(prev => ([
                        ...groups.filter((group) => group.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').startsWith(query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))),
                        ...filteredResults.filter((fr: typeof filteredResults[0]) => groups.findIndex(p => p.slug === fr.slug) === -1),
                    ]))
				}).finally(() => {
					toggleLoading(false);
				})
		}
	}, [debouncedQuery])

	return (
		<>
			<button type="button" className='underline' onClick={() => setOpen(true)}>
				Search for a team
			</button>
			<Dialog
				className="relative z-10"
				open={open}
				onClose={() => {
					setOpen(false)
					setQuery('')
				}}
			>
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-500/25 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
				/>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
					<DialogPanel
						transition
						className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl outline-1 outline-black/5 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:divide-white/10 dark:bg-gray-900 dark:-outline-offset-1 dark:outline-white/10"
					>
						<Combobox onChange={onSelect}>
							<div className="grid grid-cols-1">
								<ComboboxInput
									autoFocus
									className="col-start-1 row-start-1 h-12 w-full pr-4 pl-11 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
									placeholder="Search..."
									onChange={(event) => setQuery(event.target.value)}
									onBlur={() => setQuery('')}
								/>
								<MagnifyingGlassIcon
									className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400 dark:text-gray-500"
									aria-hidden="true"
								/>
							</div>

							{filtered.length > 0 && (
								<ComboboxOptions
									static
									className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 dark:text-gray-300"
								>
									{filtered.map((group) => (
										<ComboboxOption
											key={group.slug}
											value={group}
											className={`cursor-default px-4 py-2 select-none data-focus:bg-slate-700 data-focus:text-white data-focus:outline-hidden dark:data-focus:bg-slate-700 flex gap-1`}
										>
											<span className='w-24 text-gray-500'>{group.year_group}</span> <span className='flex-1'>{group.name}</span>
										</ComboboxOption>
									))}
								</ComboboxOptions>
							)}

							{query !== '' && filtered.length === 0 && (
								<p className="p-4 text-sm text-gray-500 dark:text-gray-400">{loading ? 'Loading..' : `No ${label} found. Close this form and add a new member instead`}.</p>
							)}
						</Combobox>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	)
}
