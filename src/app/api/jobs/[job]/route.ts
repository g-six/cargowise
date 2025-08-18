import { getShipmentByJob } from '@/services/shipments'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const job = request.nextUrl.pathname.split('/').pop()

    if (!job) {
        return NextResponse.json({ message: "Job not specified" }, { status: 400 })
    }

    const record = await getShipmentByJob(job)
    if (!record) {
        return NextResponse.json(
            { message: 'Shipment not found' },
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(record, { status: 200 })
}
