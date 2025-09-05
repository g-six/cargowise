import { getLocations } from "@/services/locations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    if (query.length < 2) {
        return NextResponse.json({ locations: [], query }, { status: 200 });
    }
    const records = await getLocations(query);
    return NextResponse.json({ records, query }, { status: 200 });
    // Mock data - replace with your actual data source
}