import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = "modarisi2025";

function authorized(req: NextRequest) {
  return req.headers.get("x-admin-password") === ADMIN_PASSWORD;
}

function makeClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // Service role key bypasses RLS and enables auth.admin.* — use it when available
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const hasServiceRole = () => !!process.env.SUPABASE_SERVICE_ROLE_KEY;

/* GET — list all users from auth.users + profiles */
export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = makeClient();

    // 1. Try auth.admin.listUsers (only works with service role key)
    let authUsers: Array<{
      id: string;
      email?: string;
      created_at: string;
      last_sign_in_at?: string;
      user_metadata?: Record<string, unknown>;
    }> = [];

    if (hasServiceRole()) {
      const { data: authData, error: authErr } = await supabase.auth.admin.listUsers({
        perPage: 1000,
      });
      if (authErr) {
        console.error("[admin/users] auth.admin.listUsers error:", authErr.message);
      } else {
        authUsers = authData?.users ?? [];
        console.log("[admin/users] auth users from auth.admin:", authUsers.length);
      }
    } else {
      console.warn("[admin/users] SUPABASE_SERVICE_ROLE_KEY not set — using profiles table only");
    }

    // 2. Get all profiles (works with both anon key + RLS SELECT policy, and service role)
    const { data: profiles, error: profErr } = await supabase
      .from("profiles")
      .select("id, full_name, plan, created_at, blocked, plan_start_date, plan_end_date, activated_by_admin");

    if (profErr) {
      console.error("[admin/users] profiles error:", profErr.message);
    }

    const profileMap: Record<string, {
      name: string | null;
      plan: string | null;
      created_at: string | null;
      blocked: boolean;
      plan_start_date: string | null;
      plan_end_date: string | null;
      activated_by_admin: boolean;
    }> = {};
    (profiles ?? []).forEach((p) => {
      profileMap[p.id] = {
        name: p.full_name ?? null,
        plan: p.plan ?? "free",
        created_at: p.created_at ?? null,
        blocked: p.blocked ?? false,
        plan_start_date: p.plan_start_date ?? null,
        plan_end_date: p.plan_end_date ?? null,
        activated_by_admin: p.activated_by_admin ?? false,
      };
    });

    // 3. Get message counts per user
    const { data: msgCounts } = await supabase
      .from("messages")
      .select("user_id")
      .eq("role", "user");

    const countMap: Record<string, number> = {};
    (msgCounts ?? []).forEach((m: { user_id: string }) => {
      countMap[m.user_id] = (countMap[m.user_id] ?? 0) + 1;
    });

    // 4. Build the merged user list
    // If we have auth users, they are the source of truth
    // Otherwise fall back to profiles table
    let users;

    if (authUsers.length > 0) {
      // Merge auth users with profiles
      users = authUsers.map((u) => {
        const profile = profileMap[u.id];
        return {
          id: u.id,
          email: u.email ?? "",
          name: profile?.name ?? (u.user_metadata?.full_name as string) ?? "",
          plan: profile?.plan ?? "free",
          created_at: profile?.created_at ?? u.created_at ?? null,
          blocked: profile?.blocked ?? false,
          plan_start_date: profile?.plan_start_date ?? null,
          plan_end_date: profile?.plan_end_date ?? null,
          activated_by_admin: profile?.activated_by_admin ?? false,
          last_sign_in_at: u.last_sign_in_at ?? null,
          question_count: countMap[u.id] ?? 0,
          has_profile: !!profile,
        };
      });
    } else {
      // Fallback: use profiles table only (no email from auth.users)
      users = (profiles ?? []).map((p) => ({
        id: p.id,
        email: "",
        name: p.name ?? "",
        plan: p.plan ?? "free",
        created_at: p.created_at ?? null,
        blocked: p.blocked ?? false,
        plan_start_date: p.plan_start_date ?? null,
        plan_end_date: p.plan_end_date ?? null,
        activated_by_admin: p.activated_by_admin ?? false,
        last_sign_in_at: null,
        question_count: countMap[p.id] ?? 0,
        has_profile: true,
      }));
    }

    // Sort newest first
    users.sort((a, b) => {
      const da = a.created_at ? new Date(a.created_at).getTime() : 0;
      const db = b.created_at ? new Date(b.created_at).getTime() : 0;
      return db - da;
    });

    console.log("[admin/users] returning", users.length, "users");
    return Response.json({ data: users });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[admin/users] unexpected error:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
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
    const { error } = await supabase.from("profiles").update({ blocked: true }).eq("id", id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  if (action === "unblock") {
    const { error } = await supabase.from("profiles").update({ blocked: false }).eq("id", id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  if (action === "upgrade" && plan) {
    const { error } = await supabase.from("profiles").update({ plan }).eq("id", id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  return Response.json({ error: "Unknown action" }, { status: 400 });
}
