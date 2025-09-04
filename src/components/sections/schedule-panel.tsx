'use client'

import { useAppContext } from '@/app/(app)/context-provider'
import { Stat } from '@/app/stat'

export default function SchedulePanel() {
	const ctx = useAppContext()

	const tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate() + 1)
	const nextTwo = new Date()
	nextTwo.setDate(tomorrow.getDate() + 2)

	return (
		<div className="mt-4">
			<div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
				<Stat
					title="Today"
					value={new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
					change="+4.5%"
				/>
				<Stat
					title="Tomorrow"
					value={tomorrow.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
					change="+4.5%"
				/>
				<Stat
					title="Next Training"
					value={nextTwo.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
					change="-4.5%"
				/>
				<Stat
					title="Next Match"
					value={nextTwo.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
					change="-4.5%"
				/>
			</div>

			<Calendar />
		</div>
	)
}

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
	CalendarIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	EllipsisHorizontalIcon,
	MapPinIcon,
} from '@heroicons/react/20/solid'
import { useMemo, useState } from 'react'
import { Button } from '../button'

const meetings = [
	{
		id: 1,
		date: 'January 10th, 2022',
		time: '5:00 PM',
		datetime: '2022-01-10T17:00',
		name: 'Leslie Alexander',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		location: 'Starbucks',
	},
	{
		id: 2,
		date: 'January 12th, 2022',
		time: '3:00 PM',
		datetime: '2022-01-12T15:00',
		name: 'Michael Foster',
		imageUrl:
			'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		location: 'Tim Hortons',
	},
	{
		id: 3,
		date: 'January 12th, 2022',
		time: '5:00 PM',
		datetime: '2022-01-12T17:00',
		name: 'Dries Vincent',
		imageUrl:
			'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		location: 'Costa Coffee at Braehead',
	},
	{
		id: 4,
		date: 'January 14th, 2022',
		time: '10:00 AM',
		datetime: '2022-01-14T10:00',
		name: 'Lindsay Walton',
		imageUrl:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		location: 'Silverburn',
	},
	{
		id: 5,
		date: 'January 14th, 2022',
		time: '12:00 PM',
		datetime: '2022-01-14T12:00',
		name: 'Courtney Henry',
		imageUrl:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		location: 'The Glasgow Green',
	},
]

function getDaysInMonth(year: number, month: number) {
	const days: {
		date: string
		isCurrentMonth?: boolean
		isToday?: boolean
		isSelected?: boolean
	}[] = []
	const today = new Date()
	const selected = today // You can set a selected date here if needed

	// Get first day of the month (0 = Sunday, 1 = Monday, ...)
	const firstDayOfMonth = new Date(year, month, 1)
	const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 6 // Make Monday = 0

	// Get last day of previous month
	const prevMonth = new Date(year, month, 0)
	const prevMonthDays = prevMonth.getDate()

	// Days from previous month to fill first week
	for (let i = firstDayOfWeek - 1; i >= 0; i--) {
		const d = new Date(year, month - 1, prevMonthDays - i)
		days.push({
			date: d.toISOString().slice(0, 10),
		})
	}

	// Days in current month
	const daysInMonth = new Date(year, month + 1, 0).getDate()
	for (let i = 1; i <= daysInMonth; i++) {
		const d = new Date(year, month, i)
		const isToday =
			d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()
		const isSelected =
			selected &&
			d.getFullYear() === selected.getFullYear() &&
			d.getMonth() === selected.getMonth() &&
			d.getDate() === selected.getDate()
		days.push({
			date: d.toISOString().slice(0, 10),
			isCurrentMonth: true,
			isToday,
			isSelected,
		})
	}

	// Days from next month to fill last week
	const totalCells = Math.ceil(days.length / 7) * 7
	for (let i = 1; days.length < totalCells; i++) {
		const d = new Date(year, month + 1, i)
		days.push({
			date: d.toISOString().slice(0, 10),
		})
	}

	return days
}

export function Calendar() {
	const [now, setNow] = useState(new Date())
    const [items, setItems] = useState(meetings)

	const days = useMemo(() => getDaysInMonth(now.getFullYear(), now.getMonth()), [now])
	return (
		<div className="w-full">
			<h2 className="text-base font-semibold text-gray-900 dark:text-white">Upcoming trainings</h2>
			<div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
				<div className="mt-10 flex flex-col text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
					<div className="flex items-center text-gray-900 dark:text-white">
						<button
							type="button"
							onClick={() => setNow((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))}
							className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
						>
							<span className="sr-only">Previous month</span>
							<ChevronLeftIcon aria-hidden="true" className="size-5" />
						</button>
						<div className="flex-auto text-sm font-semibold">{`${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`}</div>
						<button
							type="button"
							onClick={() => setNow((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))}
							className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
						>
							<span className="sr-only">Next month</span>
							<ChevronRightIcon aria-hidden="true" className="size-5" />
						</button>
					</div>
					<div className="mt-6 grid grid-cols-7 text-xs/6 text-gray-500 dark:text-gray-400">
						<div>S</div>
						<div>M</div>
						<div>T</div>
						<div>W</div>
						<div>T</div>
						<div>F</div>
						<div>S</div>
					</div>
					<div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-zinc-200 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-white/15 dark:shadow-none dark:ring-white/15">
						{days.map((day) => (
							<button
								key={day.date}
								type="button"
								data-is-today={day.isToday ? '' : undefined}
								data-is-selected={day.isSelected ? '' : undefined}
								data-is-current-month={day.isCurrentMonth ? '' : undefined}
								data-final-sunday={
									days.findLastIndex((d) => {
										const date = new Date(d.date)
										return date.getDay() === 0
									}) ===
									days.indexOf(day) + 1
										? ''
										: undefined
								}
								className="py-1.5 not-data-is-current-month:bg-zinc-50 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-zinc-400 first:rounded-tl-lg last:rounded-br-lg hover:bg-zinc-100 focus:z-10 data-final-sunday:rounded-bl-lg data-is-current-month:bg-white not-data-is-selected:data-is-current-month:not-data-is-today:text-zinc-900 data-is-current-month:hover:bg-zinc-100 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold data-is-today:not-data-is-selected:text-zinc-600 nth-7:rounded-tr-lg dark:not-data-is-current-month:bg-zinc-900/75 dark:not-data-is-selected:not-data-is-current-month:not-data-is-today:text-zinc-500 dark:hover:bg-zinc-900/25 dark:data-is-current-month:bg-zinc-900/90 dark:not-data-is-selected:data-is-current-month:not-data-is-today:text-white dark:data-is-current-month:hover:bg-zinc-900/50 dark:data-is-selected:text-zinc-900 dark:data-is-today:not-data-is-selected:text-zinc-400"
								onClick={() => {
									console.log(day.date)
								}}
							>
								<time
									dateTime={day.date}
									className="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-slate-900 in-data-is-selected:in-data-is-today:bg-slate-600 dark:in-data-is-selected:not-in-data-is-today:bg-white dark:in-data-is-selected:in-data-is-today:bg-slate-500"
								>
									{day?.date?.split('-').pop()?.replace(/^0/, '')}
								</time>
							</button>
						))}
					</div>
					<div className="flex-1" />
					<Button type="button" className="my-8 w-full">
						Add Event
					</Button>
				</div>
				<ScheduleList items={items} />
			</div>
		</div>
	)
}

export function ScheduleList({ items }: {
    items: Record<string, any>[]
}) {
    return <ol className="mt-4 divide-y divide-gray-100 text-sm/6 lg:col-span-7 xl:col-span-8 dark:divide-white/10">
        {items.map((item) => (
            <li key={item.id} className="relative flex gap-x-6 py-6 xl:static">
                <img
                    alt=""
                    src={item.imageUrl}
                    className="size-14 flex-none rounded-full dark:outline dark:-outline-offset-1 dark:outline-white/10"
                />
                <div className="flex-auto">
                    <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0 dark:text-white">{item.name}</h3>
                    <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row dark:text-gray-400">
                        <div className="flex items-start gap-x-3">
                            <dt className="mt-0.5">
                                <span className="sr-only">Date</span>
                                <CalendarIcon aria-hidden="true" className="size-5 text-gray-400 dark:text-gray-500" />
                            </dt>
                            <dd>
                                <time dateTime={item.datetime}>
                                    {item.date} at {item.time}
                                </time>
                            </dd>
                        </div>
                        <div className="mt-2 flex items-start gap-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400/50 xl:pl-3.5 dark:xl:border-gray-500/50">
                            <dt className="mt-0.5">
                                <span className="sr-only">Location</span>
                                <MapPinIcon aria-hidden="true" className="size-5 text-gray-400 dark:text-gray-500" />
                            </dt>
                            <dd>{item.location}</dd>
                        </div>
                    </dl>
                </div>
                <Menu as="div" className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center">
                    <MenuButton className="relative flex items-center rounded-full text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white">
                        <span className="absolute -inset-2" />
                        <span className="sr-only">Open options</span>
                        <EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
                    </MenuButton>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-zinc-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                    >
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-zinc-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                                >
                                    Edit
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-zinc-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                                >
                                    Cancel
                                </a>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
            </li>
        ))}
    </ol>
}
