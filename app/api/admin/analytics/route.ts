import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = "modarisi2025";

function makeServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-password") !== ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = makeServiceClient();

  // Questions per day — last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const { data: messagesRaw } = await supabase
    .from("messages")
    .select("created_at")
    .eq("role", "user")
    .gte("created_at", sevenDaysAgo.toISOString());

  // Build day buckets
  const dayCounts: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    dayCounts[d.toISOString().slice(0, 10)] = 0;
  }
  (messagesRaw ?? []).forEach((m) => {
    const day = m.created_at.slice(0, 10);
    if (day in dayCounts) dayCounts[day] = (dayCounts[day] ?? 0) + 1;
  });
  const questionsPerDay = Object.entries(dayCounts).map(([date, count]) => ({
    date,
    count,
  }));

  // Peak hours — all time
  const { data: allMessages } = await supabase
    .from("messages")
    .select("created_at")
    .eq("role", "user");

  const hourCounts: number[] = new Array(24).fill(0);
  (allMessages ?? []).forEach((m) => {
    const h = new Date(m.created_at).getHours();
    hourCounts[h] = (hourCounts[h] ?? 0) + 1;
  });
  const peakHours = hourCounts.map((count, hour) => ({ hour, count }));

  return Response.json({ questionsPerDay, peakHours });
}
