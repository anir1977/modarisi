import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set(["moutamadris.ma", "www.moutamadris.ma"]);
const PDF_SOURCES: Record<string, string> = {
  "maths-3eme-t1-p1":
    "https://moutamadris.ma/wp-content/uploads/2022/12/%D9%81%D8%B1%D9%88%D8%B6-%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9-%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%A7%D9%88%D9%84%D9%89-%D9%85%D8%B1%D8%AD%D9%84%D8%A9-1-%D9%86%D9%85%D9%88%D8%B0%D8%AC-1.pdf",
  "physique-3eme-t1-p1":
    "https://moutamadris.ma/wp-content/uploads/2022/12/%D9%81%D8%B1%D9%88%D8%B6-%D8%A7%D9%84%D9%81%D9%8A%D8%B2%D9%8A%D8%A7%D8%A1-%D9%88%D8%A7%D9%84%D9%83%D9%8A%D9%85%D9%8A%D8%A7%D8%A1-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9-%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%A7%D9%88%D9%84%D9%89-%D9%85%D8%B1%D8%AD%D9%84%D8%A9-1-%D9%86%D9%85%D9%88%D8%B0%D8%AC-1.pdf",
  "svt-3eme-t1-p1":
    "https://moutamadris.ma/wp-content/uploads/2021/12/%D9%81%D8%B1%D9%88%D8%B6-%D8%B9%D9%84%D9%88%D9%85-%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9-%D9%88%D8%A7%D9%84%D8%A7%D8%B1%D8%B6-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9-%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%89-%D8%A7%D9%84%D9%85%D8%B1%D8%AD%D9%84%D8%A9-1-%D9%86%D9%85%D9%88%D8%B0%D8%AC-1.pdf",
  "arabe-3eme-t1-p1":
    "https://moutamadris.ma/wp-content/uploads/2022/12/%D9%81%D8%B1%D9%88%D8%B6-%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9-%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%A7%D9%88%D9%84%D9%89-%D9%85%D8%B1%D8%AD%D9%84%D8%A9-1-%D9%86%D9%85%D9%88%D8%B0%D8%AC-1.pdf",
  "francais-3eme-t1-p1":
    "https://moutamadris.ma/wp-content/uploads/2022/12/%D9%81%D8%B1%D9%88%D8%B6-%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D9%81%D8%B1%D9%86%D8%B3%D9%8A%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9-%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%A7%D9%88%D9%84%D9%89-%D9%85%D8%B1%D8%AD%D9%84%D8%A9-1-%D9%86%D9%85%D9%88%D8%B0%D8%AC-1.pdf",
  "social-3eme-t1-p1":
    "https://moutamadris.ma/wp-content/uploads/2022/12/%D9%81%D8%B1%D9%88%D8%B6-%D8%A7%D9%84%D8%A5%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9-%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%A7%D9%88%D9%84%D9%89-%D9%85%D8%B1%D8%AD%D9%84%D8%A9-1-%D9%86%D9%85%D9%88%D8%B0%D8%AC-1.pdf",
  "exam-arabe-3eme-local-zagora-2013":
    "https://moutamadris.ma/wp-content/uploads/2022/04/%D8%A7%D9%84%D8%A5%D9%85%D8%AA%D8%AD%D8%A7%D9%86-%D8%A7%D9%84%D8%AC%D9%87%D9%88%D9%8A-%D9%81%D9%8A-%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9-%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-2013-%D8%B2%D8%A7%D9%83%D9%88%D8%B1%D8%A9.pdf",
  "exam-francais-3eme-local-inezgane-2010":
    "https://moutamadris.ma/wp-content/uploads/2022/04/%D8%A7%D9%84%D8%A5%D9%85%D8%AA%D8%AD%D8%A7%D9%86-%D8%A7%D9%84%D8%AC%D9%87%D9%88%D9%8A-%D9%81%D9%8A-%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D9%81%D8%B1%D9%86%D8%B3%D9%8A%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9-%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-2010-%D8%A5%D9%86%D8%B2%D9%83%D8%A7%D9%86-%D8%A2%D9%8A%D8%AA-%D9%85%D9%84%D9%88%D9%84.pdf",
  "exam-social-3eme-local-khemisset-2012":
    "https://moutamadris.ma/wp-content/uploads/2022/03/%D8%A7%D9%84%D8%A5%D9%85%D8%AA%D8%AD%D8%A7%D9%86-%D8%A7%D9%84%D8%AC%D9%87%D9%88%D9%8A-%D9%81%D9%8A-%D8%A7%D9%84%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9-%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-2012-%D8%A7%D9%84%D8%AE%D9%85%D9%8A%D8%B3%D8%A7%D8%AA.pdf",
};

const phaseOneIds = [
  "maths-3eme-t1-p1",
  "physique-3eme-t1-p1",
  "svt-3eme-t1-p1",
  "arabe-3eme-t1-p1",
  "francais-3eme-t1-p1",
  "social-3eme-t1-p1",
] as const;

for (const id of phaseOneIds) {
  const phaseTwoId = id.replace("-p1", "-p2");
  PDF_SOURCES[phaseTwoId] = PDF_SOURCES[id]
    .replace("%D8%A7%D9%84%D9%85%D8%B1%D8%AD%D9%84%D8%A9-1", "%D8%A7%D9%84%D9%85%D8%B1%D8%AD%D9%84%D8%A9-2")
    .replace("%D9%85%D8%B1%D8%AD%D9%84%D8%A9-1", "%D9%85%D8%B1%D8%AD%D9%84%D8%A9-2");
}

export async function GET(request: NextRequest) {
  const pdfId = request.nextUrl.searchParams.get("id");
  const fileUrl = pdfId ? PDF_SOURCES[pdfId] : null;

  if (!fileUrl) {
    return NextResponse.json({ error: "PDF not found" }, { status: 404 });
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
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "frame-ancestors 'self'",
    },
  });
}
