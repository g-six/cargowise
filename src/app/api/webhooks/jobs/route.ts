import { createShipment, getShipment, getShipmentByJob, updateShipment } from "@/services/shipments";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body.job) {
        return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    } else {
        // Process the valid webhook payload
        console.log("Received valid webhook:", body);
        const { job, ...data } = body;
        let record = await getShipmentByJob(job);

        if (!record && body.shipment) {
            const newRecord = await createShipment(body);
            if (!newRecord.error) {
                record = newRecord;
            } else {
                return NextResponse.json({ error: newRecord.details || newRecord.message }, { status: 400 });
            }
        } else if (record && (data.latitude || data.longitude || data.status)) {
            record = await updateShipment(record.shipment, data);
        }

        if (!record)
            return NextResponse.json({ error: 'Job not found', ...body }, { status: 200 });
        
        return NextResponse.json(record, { status: 200 });
    }
}