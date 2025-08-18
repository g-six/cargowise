import { createShipment, getShipment } from '@/services/shipments'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const shipment = request.nextUrl.pathname.split('/').pop()

    if (!shipment) {
        return NextResponse.json({ message: "Shipment not specified" }, { status: 400 })
    }

    const record = await getShipment(shipment)

    if (record) {
        return NextResponse.json(record, { status: 200 })
    }

    return NextResponse.json(
        { message: 'Shipment not found' },
        {
            status: 404,
        }
    )
}
