'use client'
import { Heading } from '@/components/heading'
import { CreateJobOrderForm } from './form'
import List from './list'
import { useState } from 'react';


export default function JobsPageContainer(p: {data: any[]}) {
    const [data, setData] = useState(p.data);
	return (
		<>
			<div className="flex items-end justify-between gap-4">
				<Heading>Jobs</Heading>

				<CreateJobOrderForm onSuccess={record => setData([...data, record])} />
			</div>
            <List data={data} />
		</>
	)
}
