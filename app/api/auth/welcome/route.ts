import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email || !name) {
      return NextResponse.json({ error: "Missing email or name" }, { status: 400 });
    }
    await sendWelcomeEmail(email, name);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send welcome email" }, { status: 500 });
  }
}
