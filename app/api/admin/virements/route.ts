import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// Simple shared secret — same as the admin dashboard password
const ADMIN_PASSWORD = "modarisi2025";

function makeClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Use service role key if available, otherwise anon key (dev only)
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch { /* server component context */ }
        },
      },
    }
  );
}

function authorized(req: NextRequest) {
  return req.headers.get("x-admin-password") === ADMIN_PASSWORD;
}

/* GET — list all virement requests */
export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = makeClient();
  const { data, error } = await supabase
    .from("virement_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data });
}

/* POST — activate or reject a virement request */
export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, action, user_id, plan } = await req.json();
  if (!id || !action) {
    return Response.json({ error: "Missing id or action" }, { status: 400 });
  }

  const supabase = makeClient();

  // Update the virement request status
  const status = action === "activate" ? "activated" : "rejected";
  const { error: vrErr } = await supabase
    .from("virement_requests")
    .update({ status })
    .eq("id", id);

  if (vrErr) return Response.json({ error: vrErr.message }, { status: 500 });

  // If activating, update the user's profile plan
  if (action === "activate" && user_id && plan) {
    const planLower = plan.toLowerCase() as "pro" | "famille";
    const { error: profErr } = await supabase
      .from("profiles")
      .update({ plan: planLower })
      .eq("id", user_id);

    if (profErr) {
      console.error("[admin/virements] profile update error:", profErr.message);
    }
  }

  return Response.json({ ok: true, status });
}
