import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are Modarisi, an AI tutor for Moroccan middle school students (collège). You help with all subjects: Maths, Physique-Chimie, SVT, Français, Arabe, Éducation Islamique, Histoire-Géographie. Answer in the same language the student uses (Darija or French). Be encouraging, patient, and explain step by step like a good teacher.`;

const FREE_LIMIT = 5;

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse request ─────────────────────────────────────────────────────
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "messages array is required" }, { status: 400 });
    }

    // ── 2. Rate-limit check (server-side, 5 questions/day for free users) ────
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Fetch profile to check plan + subscription expiry
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, plan_end_date")
        .eq("id", user.id)
        .single();

      let currentPlan = profile?.plan ?? "free";

      // Auto-expiry: downgrade if subscription has expired
      if (currentPlan !== "free" && profile?.plan_end_date) {
        const endDate = new Date(profile.plan_end_date);
        if (endDate < new Date()) {
          await supabase
            .from("profiles")
            .update({ plan: "free" })
            .eq("id", user.id);
          currentPlan = "free";
        }
      }

      // Skip daily limit for paid users
      if (currentPlan === "free") {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const { count } = await supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("role", "user")
          .gte("created_at", todayStart.toISOString());

        if ((count ?? 0) >= FREE_LIMIT) {
          return Response.json(
            { error: "LIMIT_REACHED", limit: FREE_LIMIT },
            { status: 429 }
          );
        }
      }
    }

    // ── 3. Init Anthropic client ──────────────────────────────────────────────
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("[chat] ANTHROPIC_API_KEY is not set");
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }
    const client = new Anthropic({ apiKey });

    // ── 4. Sanitise messages ─────────────────────────────────────────────────
    const cleaned = messages
      .filter((m: { role: string; content: string }) => m.content.trim() !== "")
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    const firstUserIdx = cleaned.findIndex((m) => m.role === "user");
    if (firstUserIdx === -1) {
      return Response.json({ error: "No user message found" }, { status: 400 });
    }
    const apiMessages = cleaned.slice(firstUserIdx);

    // ── 5. Call Anthropic (streaming) ─────────────────────────────────────────
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = client.messages.stream({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: apiMessages,
          });

          for await (const event of anthropicStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }

          controller.close();
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("[chat/stream]", msg);
          controller.enqueue(encoder.encode(`\n\n⚠️ Erreur: ${msg}`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[chat/POST]", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
