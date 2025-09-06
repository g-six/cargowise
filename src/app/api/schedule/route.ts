import { createAttendance, updateAttendance } from "@/services/attendance";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ message: "Schedule endpoint" });
}
export async function POST(request: NextRequest) {
    const payload = await request.json();
    payload.duration_minutes = parseInt(payload.duration) || 60; // default to 60 minutes if parsing fails
    const record = await createAttendance(payload);
    return NextResponse.json({ message: "Schedule endpoint", record, payload }, { status: record ? 200 : 405 });
}
export async function PUT(request: NextRequest) {
    const payload = await request.json();

    const record = await updateAttendance(payload.team_calendar_id, payload.athlete, payload.is_going, payload.is_going ? 'attending' : undefined);
    return NextResponse.json({ message: "Schedule endpoint", record, payload });
        // , { status: record ? 200 : 405 }
    // );
}