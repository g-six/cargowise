import { getDomainOrganization } from "@/services/domains"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const v = request.nextUrl.pathname.split('/').pop()
    if (v) {

        const domain = await getDomainOrganization(v)
        if (domain) return NextResponse.json(domain)
    }
    return NextResponse.json(
        {
            host: request.nextUrl.pathname.split('/').pop(),
        },
        { status: 200 }
    )
}