import { createShipment, filterShipments } from '@/services/shipments'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const payload = await request.json()
	const record = await createShipment(payload)

    if (record.error) return NextResponse.json(
		{ message: record.error.details || record.error.message || 'Unable to create job order', payload },
		{
			status: 400,
		}
	)
                

	if (record?.job && payload.shipment) {
        return NextResponse.json(
            {
                message: 'Job order created',
                record,
            },
            {
                status: 201,
            }
        )
	}

	return NextResponse.json(
		{ message: 'Unable to create job order', payload },
		{
			status: 400,
		}
	)
}

export async function GET(request: NextRequest) {
    const job = request.nextUrl.searchParams.get('job')

    if (!job) {
        return NextResponse.json({ message: "Job not specified" }, { status: 400 })
    }

    const records = await filterShipments({ job })

    if (records && records.length > 0) {
        return NextResponse.json(records, { status: 200 })
    }

    return NextResponse.json([])
}
