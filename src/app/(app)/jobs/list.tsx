import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
export default function List({ data }: { data: any[] }) {
	return (
		<Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
			<TableHead>
				<TableRow>
					<TableHeader>Job number</TableHeader>
					<TableHeader>Shipments</TableHeader>
					<TableHeader className="text-right">Created</TableHeader>
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((item: Record<string, any>) => (
					<TableRow key={item.id} href={item.url} title={`Order #${item.id}`}>
						<TableCell>{item.id}</TableCell>
						<TableCell>{item.shipments?.map((service: Record<string, any>) => service.id).join(', ')}</TableCell>
						<TableCell className="text-right text-zinc-500">
							{new Date(item.created_at).toLocaleDateString(undefined, {
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
