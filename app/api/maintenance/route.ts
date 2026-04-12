import { NextRequest, NextResponse } from "next/server";
import { getMaintenanceMode, setMaintenanceMode } from "@/lib/config";

export async function GET() {
  return NextResponse.json({ maintenanceMode: getMaintenanceMode() });
}

export async function POST(req: NextRequest) {
  const { maintenanceMode, password } = await req.json();

  if (password !== "modarisi2025") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  setMaintenanceMode(Boolean(maintenanceMode));
  return NextResponse.json({ maintenanceMode: Boolean(maintenanceMode) });
}
