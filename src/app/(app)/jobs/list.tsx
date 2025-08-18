import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
export default function List({ data }: { data: any[] }) {
	return (
		<Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
			<TableHead>
				<TableRow>
					<TableHeader className='w-12'>Job number</TableHeader>
					<TableHeader className='w-12'>Shipment</TableHeader>
					<TableHeader>Location</TableHeader>
					<TableHeader className="text-right w-12">Last update</TableHeader>
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((item: Record<string, any>, idx) => (
					<TableRow key={idx} href={item.url} title={`Order #${item.job}`}>
						<TableCell>{item.job}</TableCell>
						<TableCell>{item.shipment}</TableCell>
						<TableCell>{[item.latitude, item.longitude].filter(n => !isNaN(n)).join(' ')}</TableCell>
						<TableCell className="text-right text-zinc-500">
							{new Date(item.updated_at).toLocaleDateString(undefined, {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit',
							})}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
