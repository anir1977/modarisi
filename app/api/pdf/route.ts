import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set(["moutamadris.ma", "www.moutamadris.ma"]);

export async function GET(request: NextRequest) {
  const fileUrl = request.nextUrl.searchParams.get("url");

  if (!fileUrl) {
    return NextResponse.json({ error: "Missing PDF URL" }, { status: 400 });
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(fileUrl);
  } catch {
    return NextResponse.json({ error: "Invalid PDF URL" }, { status: 400 });
  }

  if (parsedUrl.protocol !== "https:" || !ALLOWED_HOSTS.has(parsedUrl.hostname)) {
    return NextResponse.json({ error: "PDF source is not allowed" }, { status: 403 });
  }

  const upstream = await fetch(parsedUrl.toString(), {
    headers: {
      "User-Agent": "Modarisi educational PDF viewer",
      Accept: "application/pdf,*/*",
    },
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "PDF is not available" }, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "application/pdf",
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
