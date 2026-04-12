import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "modarisi_maintenance";

// Default to maintenance ON when no cookie has been set yet
function readCookie(): boolean {
  const val = cookies().get(COOKIE_NAME)?.value;
  return val === undefined ? true : val === "1";
}

export async function GET() {
  try {
    return NextResponse.json({ maintenanceMode: readCookie() });
  } catch {
    return NextResponse.json({ maintenanceMode: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { maintenanceMode, password } = await req.json();

    if (password !== "modarisi2025") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const value = Boolean(maintenanceMode);
    const res = NextResponse.json({ maintenanceMode: value });

    res.cookies.set(COOKIE_NAME, value ? "1" : "0", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return res;
  } catch (err) {
    console.error("[maintenance/POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
