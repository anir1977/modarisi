import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = "modarisi2025";

function makeClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-password") !== ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = makeClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    { count: profileCount },
    { count: activeToday },
    { count: totalQuestions },
    { count: pendingVirements },
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("messages")
      .select("user_id", { count: "exact", head: true })
      .eq("role", "user")
      .gte("created_at", todayStart.toISOString()),
    supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("role", "user"),
    supabase
      .from("virement_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  // Use auth.admin for accurate user count if service role key is available
  let totalUsers = profileCount ?? 0;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data: authData } = await supabase.auth.admin.listUsers({ perPage: 1 });
    if (authData?.total) totalUsers = authData.total;
  }

  return Response.json({
    totalUsers,
    activeToday: activeToday ?? 0,
    totalQuestions: totalQuestions ?? 0,
    pendingVirements: pendingVirements ?? 0,
  });
}
