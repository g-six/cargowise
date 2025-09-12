import { NextRequest, NextResponse } from "next/server"

const PASS_HEADERS = [
  "content-type",
  "accept-ranges",
  "content-length",
  "content-range",
  // some origins send etag/last-modified; safe to pass if you like:
  // "etag", "last-modified"
] as const;
export async function GET(req: NextRequest) {
    const filePath = 'https://c.veocdn.com/0fae522e-e6a4-49b1-9f65-d60bf81942d0/standard/machine/34d70bd5/video.mp4'
    // 3) Forward Range (seeking) + add server-only headers
    const fwdHeaders: Record<string, string> = {};
    const range = req.headers.get("range");
    if (range) fwdHeaders["range"] = range;
    let originInfo = { url: filePath, headers: {} as Record<string, string> };
    // Add origin auth if needed (server-only; never expose to client)
    if (originInfo.headers) {
      for (const [k, v] of Object.entries(originInfo.headers)) fwdHeaders[k] = v;
    }

    // Some origins want a UA
    if (!fwdHeaders["user-agent"]) fwdHeaders["user-agent"] = "NextProxy/1.0";

    // 4) Fetch from origin (let redirects resolve)
    const originResp = await fetch(originInfo.url, {
      method: "GET",
      headers: fwdHeaders,
      redirect: "follow",
    });

    // Handle origin errors
    if (!originResp.ok && originResp.status !== 206) {
      // 200 OK (no range) or 206 Partial Content are expected;
      // propagate 4xx/5xx as-is
      return new NextResponse(null, { status: originResp.status });
    }

    // 5) Build response headers (whitelist)
    const headers = new Headers();
    for (const h of PASS_HEADERS) {
      const v = originResp.headers.get(h);
      if (v) headers.set(h, v);
    }

    // Set defaults/hardening
    if (!headers.has("content-type")) headers.set("content-type", "video/mp4");
    headers.set("cache-control", "private, max-age=0, must-revalidate");
    headers.set("x-content-type-options", "nosniff");

    // 6) Stream body back to client
    const body = originResp.body; // ReadableStream<Uint8Array> (web stream)
    const status = originResp.status; // 200 or 206 expected for success
    return new NextResponse(body, { status, headers });
}