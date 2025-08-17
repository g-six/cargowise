import { NextRequest, NextResponse } from "next/server";
import { createJobOrder } from '@/services/jobs'

export async function POST(request: NextRequest) {
    const payload = await request.json();
    const record = await createJobOrder(payload);
    // Here you would typically call a service function to create the job order
    // For example:
    // const newJobOrder = await createJobOrder({ jobNumber, shipment });

    return NextResponse.json({ message: 'Job order created', record }, {
        status: 201,
        
    });

}