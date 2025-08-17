import { createClient } from '@/utils/supabase/server'

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getJobOrders } from '@/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Orders',
}

export default async function Jobs() {
	const supabase = await createClient()
	const { data: instruments, error } = await supabase.from('jobs').select()

	let jobs = await getJobOrders()

	return (
		<>
			<div className="flex items-end justify-between gap-4">
				<Heading>Jobs</Heading>
				<Button className="-my-0.5">Create job order</Button>
			</div>
			<Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
				<TableHead>
					<TableRow>
						<TableHeader>Job number</TableHeader>
						<TableHeader>Created</TableHeader>
						<TableHeader>Shipment number</TableHeader>
						<TableHeader>Event</TableHeader>
						<TableHeader className="text-right">Amount</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody>
					{jobs.map((order) => (
						<TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
							<TableCell>{order.id}</TableCell>
							<TableCell className="text-zinc-500">{order.date}</TableCell>
							<TableCell>{order.customer.name}</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<Avatar src={order.event.thumbUrl} className="size-6" />
									<span>{order.event.name}</span>
								</div>
							</TableCell>
							<TableCell className="text-right">US{order.amount.usd}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
