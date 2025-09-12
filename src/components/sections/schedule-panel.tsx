'use client'

import { useAppContext } from '@/app/context-provider'

export default function SchedulePanel() {
	const tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate() + 1)
	const nextTwo = new Date()
	nextTwo.setDate(tomorrow.getDate() + 2)
	return (
		<div className="mt-4">
			<Calendar />
		</div>
	)
}

import {
	CalendarIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	EllipsisHorizontalIcon,
	MapPinIcon,
} from '@heroicons/react/20/solid'
import { useMemo, useState } from 'react'
import { Button } from '../button'
import { fetchData } from '@/utils/api'
import { Athlete } from '@/data'
import { AddEventForm } from '../dialogs/add-event'

function getDaysInMonth(year: number, month: number) {
	const days: {
		date: string
		isCurrentMonth?: boolean
		isToday?: boolean
		isSelected?: boolean
	}[] = []
	const today = new Date()
    let selected = today

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
    const ctx = useAppContext()
    
	const [now, setNow] = useState(new Date())
	const [selected, setSelected] = useState<string>(now.toISOString().substring(0, 10)) // You can set a selected date here if needed

	const days = useMemo(() => getDaysInMonth(now.getFullYear(), now.getMonth()), [now])

    function getScheduleForDate(dateStr: string) {
        if (!ctx?.schedule) return []
        const items = ctx.schedule.filter((s: Record<string, any>) => {
            return new Date(s.start_date).getTime() >= new Date(dateStr).getTime()
        }).map((s: Record<string, any>) => {
            const datetime = `${s.start_date}T${s.start_time}`
            const date = new Date(datetime)
            const athletes = s.athletes || []
            if (athletes.length === 0) return {
                id: s.id,
                date: date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
                time: date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
                datetime,
                name: s.title || 'Training Session',
                location: s.location ? `${s.location.name}` : 'TBC',
            }
            return athletes.map((a: Athlete & { is_going: boolean }) => ({
                id: s.id,
                athlete: a.slug,
                date: date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
                time: date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
                datetime,
                name: `${a.first_name || ''}${a.first_name ? "'s " : ''}${s.title || 'Training Session'}`,
                location: s.location ? `${s.location.name}` : 'TBC',
                is_going: a.is_going || false,
            }))
        }).flat()
        return items.length ? items : undefined
    }

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
                                data-key={day.date}
								data-is-today={day.isToday ? '' : undefined}
								data-is-selected={day.date === selected ? '' : undefined}
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
                                data-agenda={ctx?.schedule.filter((s: Record<string, any>) => {
                                    return s.start_date === day.date
                                }).length ? '' : undefined}
								className="py-1.5 not-data-is-current-month:bg-zinc-50 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-zinc-400 first:rounded-tl-lg last:rounded-br-lg hover:bg-zinc-100 focus:z-10 data-final-sunday:rounded-bl-lg data-is-current-month:bg-white not-data-is-selected:data-is-current-month:not-data-is-today:text-zinc-900 data-is-current-month:hover:bg-zinc-100 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold data-is-today:not-data-is-selected:text-zinc-600 nth-7:rounded-tr-lg dark:not-data-is-current-month:bg-zinc-900/75 dark:not-data-is-selected:not-data-is-current-month:not-data-is-today:text-zinc-500 dark:hover:bg-zinc-900/25 dark:data-is-current-month:bg-zinc-900/90 dark:not-data-is-selected:data-is-current-month:not-data-is-today:text-white dark:data-is-current-month:hover:bg-zinc-900/50 dark:data-is-selected:text-zinc-900 dark:data-is-today:not-data-is-selected:text-zinc-400 data-agenda:border-lime-500! border-b-2 border-transparent"
								onClick={() => {
                                    setSelected(day.date)
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
					<div className="flex-1 my-2" />
					{/* <AddEventForm onComplete={console.log} /> */}
				</div>
				<ScheduleList items={getScheduleForDate(selected)} />
			</div>
		</div>
	)
}

export function ScheduleList({ items }: {
    items: Record<string, any>[]
}) {
    const [going, toggleGoing] = useState<string[]>((items || []).map(i => i.is_going ? `${i.id}:${i.athlete}` : undefined).filter(Boolean) as string[])

    return <ol className="mt-4 divide-y divide-gray-100 text-sm/6 lg:col-span-7 xl:col-span-8 dark:divide-white/10">
        {items?.map((item) => (
            <li key={`${item.id}:${item.athlete}`} className="relative flex gap-x-6 py-6 xl:static">
                <div className="flex-auto">
                    <h3 data-is-going={going.indexOf(`${item.id}:${item.athlete}`) !== -1 ? '' : undefined} className="pr-10 font-semibold text-gray-900 xl:pr-0 dark:text-white data-is-going:text-lime-500 dark:data-is-going:text-lime-300">{item.name}</h3>
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
                {item.is_going !== undefined && <div>
                    <Button type='button' data-is-going={going.indexOf(`${item.id}:${item.athlete}`) !== -1 ? '' : undefined} className='data-is-going:bg-lime-600!' onClick={() => {
                        let is_going = false;
                        if (going.indexOf(`${item.id}:${item.athlete}`) === -1) {
                            toggleGoing([...going, `${item.id}:${item.athlete}`])
                        } else {
                            toggleGoing(going.filter(g => g !== `${item.id}:${item.athlete}`))
                            is_going = true
                        }

                        fetchData('/api/attendance', {
                            method: is_going ? 'DELETE' : 'POST',
                        }, item)
                    }}>Going</Button>
                </div>}
            </li>
        ))}
    </ol>
}
