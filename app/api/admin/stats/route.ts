import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = "modarisi2025";

function makeClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch { /* server component */ }
        },
      },
    }
  );
}

export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-password") !== ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = makeClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    { count: totalUsers },
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

  return Response.json({
    totalUsers: totalUsers ?? 0,
    activeToday: activeToday ?? 0,
    totalQuestions: totalQuestions ?? 0,
    pendingVirements: pendingVirements ?? 0,
  });
}
