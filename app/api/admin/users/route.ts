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

function authorized(req: NextRequest) {
  return req.headers.get("x-admin-password") === ADMIN_PASSWORD;
}

/* GET — list all users with email + message count */
export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = makeClient();

  // Get all profiles
  const { data: profiles, error: profErr } = await supabase
    .from("profiles")
    .select("id, name, plan, created_at, blocked")
    .order("created_at", { ascending: false });

  if (profErr) return Response.json({ error: profErr.message }, { status: 500 });

  // Get auth users for emails (requires service role)
  const { data: authData, error: authErr } = await supabase.auth.admin.listUsers({
    perPage: 1000,
  });

  const emailMap: Record<string, { email: string; last_sign_in_at: string | null }> = {};
  if (!authErr && authData?.users) {
    authData.users.forEach((u) => {
      emailMap[u.id] = {
        email: u.email ?? "",
        last_sign_in_at: u.last_sign_in_at ?? null,
      };
    });
  }

  // Get message counts per user
  const { data: msgCounts } = await supabase
    .from("messages")
    .select("user_id")
    .eq("role", "user");

  const countMap: Record<string, number> = {};
  (msgCounts ?? []).forEach((m) => {
    countMap[m.user_id] = (countMap[m.user_id] ?? 0) + 1;
  });

  const users = (profiles ?? []).map((p) => ({
    id: p.id,
    name: p.name ?? "",
    plan: p.plan ?? "free",
    created_at: p.created_at,
    blocked: p.blocked ?? false,
    email: emailMap[p.id]?.email ?? "",
    last_sign_in_at: emailMap[p.id]?.last_sign_in_at ?? null,
    question_count: countMap[p.id] ?? 0,
  }));

  return Response.json({ data: users });
}

/* POST — block/unblock or upgrade plan */
export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, action, plan } = await req.json();
  if (!id || !action) {
    return Response.json({ error: "Missing id or action" }, { status: 400 });
  }

  const supabase = makeClient();

  if (action === "block") {
    const { error } = await supabase
      .from("profiles")
      .update({ blocked: true })
      .eq("id", id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  if (action === "unblock") {
    const { error } = await supabase
      .from("profiles")
      .update({ blocked: false })
      .eq("id", id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  if (action === "upgrade" && plan) {
    const { error } = await supabase
      .from("profiles")
      .update({ plan })
      .eq("id", id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  return Response.json({ error: "Unknown action" }, { status: 400 });
}
