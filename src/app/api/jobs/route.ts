import { createShipment } from '@/services/shipments'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const payload = await request.json()
	const record = await createShipment(payload)

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
