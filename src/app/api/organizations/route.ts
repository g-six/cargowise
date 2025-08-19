import { createOrganizationIfNotFound } from "@/services/organization";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export async function POST(request: NextRequest) {
    const data = await request.json()
    const organization = await createOrganizationIfNotFound({
        ...data,
        slug: [data.name, randomUUID()].join('-').toLowerCase().split(' ').filter(Boolean).join('-'),
    })
    return NextResponse.json(organization)
}