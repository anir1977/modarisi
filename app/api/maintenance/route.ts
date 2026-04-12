import { NextRequest, NextResponse } from "next/server";
import { getMaintenanceMode, setMaintenanceMode } from "@/lib/config";

// Explicitly use Node.js runtime so `fs` is always available
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const maintenanceMode = getMaintenanceMode();
    return NextResponse.json({ maintenanceMode });
  } catch (err) {
    console.error("[maintenance/GET]", err);
    return NextResponse.json({ maintenanceMode: true }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { maintenanceMode, password } = body;

    if (password !== "modarisi2025") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const value = Boolean(maintenanceMode);
    setMaintenanceMode(value);

    return NextResponse.json({ maintenanceMode: value });
  } catch (err) {
    console.error("[maintenance/POST]", err);
    return NextResponse.json(
      { error: "Impossible de sauvegarder la configuration." },
      { status: 500 }
    );
  }
}
