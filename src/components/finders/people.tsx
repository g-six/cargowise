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

export default function PeopleFinder({
	people = [],
	onSelect,
    label = 'Add existing player',
    route = 'athletes'
}: {
	people: Record<string, any>[]
	onSelect(person: Record<string, any>): void
    label?: string
    route?: string
}) {
	const [query, setQuery] = useState('')
	const [debouncedQuery, setDebouncedQuery] = useState(query)
	const [open, setOpen] = useState(false)
	const [loading, toggleLoading] = useState(true)
	const [filteredPeople, setFilteredPeople] = useState(people)

	useEffect(() => {
		if (query) {
			setFilteredPeople(people.filter((person) => person.first_name.toLowerCase().includes(query.toLowerCase())))
		} else {
			setFilteredPeople(people)
		}
		const handler = setTimeout(() => {
			setDebouncedQuery(query)
		}, 300)
		return () => clearTimeout(handler)
	}, [query])

	useEffect(() => {
		if (debouncedQuery) {
            toggleLoading(true);
			fetchData(`/api/${route}?filters=name:${debouncedQuery}`)
				.then((filteredResults) => {
                    setFilteredPeople(prev => ([
                        ...people.filter((person) => person.first_name.toLowerCase().includes(query.toLowerCase()) || person.last_name.toLowerCase().includes(query.toLowerCase())),
                        ...filteredResults.filter((fr: typeof filteredResults[0]) => people.findIndex(p => p.slug === fr.slug) === -1),
                    ]))
				}).finally(() => {
					toggleLoading(false);
				})
		}
	}, [debouncedQuery])

    function onChange(person: Record<string, any>) {
        setOpen(false)
        setQuery('')
        if (person) onSelect(person)
    }


	return (
		<>
        <button className='rounded-full w-12 h-12 bg-lime-500 text-bla'>

        </button>
			<Button type="button" color="lime" onClick={() => setOpen(true)}>
				{label}
			</Button>
            
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
						<Combobox onChange={onChange}>
							<div className="grid grid-cols-1">
								<ComboboxInput
									autoFocus
									className="col-start-1 row-start-1 h-12 w-full pr-4 pl-11 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
									placeholder="Search by name..."
									onChange={(event) => setQuery(event.target.value)}
									onBlur={() => setQuery('')}
								/>
								<MagnifyingGlassIcon
									className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400 dark:text-gray-500"
									aria-hidden="true"
								/>
							</div>

							{filteredPeople.length > 0 && (
								<ComboboxOptions
									static
									className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 dark:text-gray-300"
								>
									{filteredPeople.map((person) => (
										<ComboboxOption
											key={person.slug}
											value={person}
											className={`cursor-default px-4 py-2 select-none data-focus:bg-slate-700 data-focus:text-white data-focus:outline-hidden dark:data-focus:bg-slate-700 flex gap-1`}
										>
											<span className='w-24 text-gray-500'>{person.date_of_birth}</span> <span className='flex-1'>{person.last_name}, {person.first_name}</span>
										</ComboboxOption>
									))}
								</ComboboxOptions>
							)}

							{query !== '' && filteredPeople.length === 0 && (
								<p className="p-4 text-sm text-gray-500 dark:text-gray-400">{loading ? 'Loading..' : 'No people found. Close this form and add a new member instead'}.</p>
							)}
						</Combobox>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	)
}
