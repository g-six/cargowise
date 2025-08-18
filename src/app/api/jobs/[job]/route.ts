import { filterShipments } from '@/services/shipments'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const job = request.nextUrl.pathname.split('/').pop()

    if (!job) {
        return NextResponse.json({ message: "Job not specified" }, { status: 400 })
    }

    const records = await filterShipments({ job })

    if (records && records.length > 0) {
        return NextResponse.json(records, { status: 200 })
    }

    return NextResponse.json([])
}
