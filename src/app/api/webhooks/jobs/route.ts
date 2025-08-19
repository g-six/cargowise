import { createShipment, getShipment, updateShipment } from "@/services/shipments";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body.shipment) {
        return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    } else {
        // Process the valid webhook payload
        console.log("Received valid webhook:", body);
        const { shipment, ...data } = body;
        let record = await getShipment(shipment);

        if (!record) {
            const newRecord = await createShipment(body);
            if (!newRecord.error) {
                record = newRecord;
            } else {
                return NextResponse.json({ error: newRecord.details || newRecord.message }, { status: 400 });
            }
        } else if (data.latitude || data.longitude || data.status) {
            record = await updateShipment(shipment, data);
        }
        
        return NextResponse.json(record, { status: 200 });
    }
}