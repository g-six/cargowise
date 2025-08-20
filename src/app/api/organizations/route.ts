import { createOrganizationIfNotFound } from "@/services/organization";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json()
    let full_phone = `${data.phone.startsWith('+') ? '' : '+1'}${data.phone.split('').map((w: string) => w.trim()).filter((w: string) => {
        if (w === '+' || !isNaN(Number(w))) {
            return true
        }
    }).join('')}`
    if (!data.name || !data.email || !data.phone) {
        return NextResponse.json({ error: 'Missing required fields', payload: data }, { status: 400 })
    }

    const record = {
        ...data,
        phone: full_phone,
        slug: data.name.toLowerCase().split(' ').filter(Boolean).join('-'),
    }
    const organization = await createOrganizationIfNotFound(record)

    if (!organization.slug) {
        console.warn('Unable to create organization', { record })
    }

    return NextResponse.json(organization)
}