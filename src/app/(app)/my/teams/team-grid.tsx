'use client'

import { Stat } from '@/app/stat'
import { useAppContext, useAppDispatch } from '../../context-provider'
import { Team } from '@/data';

export default function TeamGrid() {
	const ctx = useAppContext()
    const dispatch = useAppDispatch();
    console.table(ctx?.teams)
    return (
		<div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
			{ctx?.teams.map((t: Team & { athlete_count?: number }) => (
				<Stat
					key={t.slug}
					title={t.name}
					value={`${t.athlete_count || "No"} players`}
					change={t.age_group.toString()}
                    href={`/my/team/${t.slug}`}
				/>
			))}
		</div>
	)
}
