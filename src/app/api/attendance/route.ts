import { updateAttendance } from "@/services/attendance";
import { createRecord, updateRecord } from "@/services/record";
import { create } from "domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { id: team_calendar_id, athlete } = await request.json();
    // Handle the attendance logic here
    const record = await createRecord('team_attendance', {
        team_calendar_id,
        athlete,
        is_going: true,
        status: 'attending',
    })
    return NextResponse.json({ record, message: `Attendance marked for ${record?.athlete.first_name}` }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
    const { id: team_calendar_id, athlete } = await request.json();
    
    const record = await updateAttendance(team_calendar_id, athlete, false);

    return NextResponse.json({ record }, { status: 200 });
}