import { createTeamIfNotFound } from "@/services/teams";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export async function POST(request: NextRequest) {
    const data = await request.json()
    const { name } = data
    const team = await createTeamIfNotFound({
        name,
        organization: data.organization,
        year_group: data.year_group,
        slug: name.toLowerCase().split(' ').filter(Boolean).join('-') + '-' + data.year_group,
    })
    return NextResponse.json(team)
}