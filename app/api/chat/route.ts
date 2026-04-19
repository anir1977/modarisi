import Groq from "groq-sdk";
import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `أنت "نور"، مساعدة ذكية ومعلمة متخصصة في مساعدة تلاميذ الإعدادي المغاربة.
تساعدين في جميع المواد: الرياضيات، الفيزياء والكيمياء، علوم الحياة والأرض، الفرنسية، العربية، التربية الإسلامية، التاريخ والجغرافيا.
أجيبي بنفس اللغة التي يستخدمها التلميذ: الدارجة أو الفرنسية أو العربية الفصحى.
كوني مشجعة وصبورة واشرحي خطوة بخطوة مثل معلمة جيدة.
إذا سألك التلميذ بالدارجة، أجيبيه بالدارجة المغربية.`;

const FREE_LIMIT = 5;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse request ──────────────────────────────────────────────────────
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "messages array is required" }, { status: 400 });
    }

    // ── 2. Rate-limit check ───────────────────────────────────────────────────
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

    const supabaseAdmin = createServerClient(
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
            } catch { /* server component context */ }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("plan, plan_end_date")
        .eq("id", user.id)
        .single();

      let currentPlan: string = profile?.plan ?? "free";

      if (currentPlan !== "free" && profile?.plan_end_date) {
        if (new Date(profile.plan_end_date) < new Date()) {
          await supabaseAdmin.from("profiles").update({ plan: "free" }).eq("id", user.id);
          currentPlan = "free";
        }
      }

      if (currentPlan === "free" || currentPlan === "gratuit" || !currentPlan) {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const { count } = await supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("role", "user")
          .gte("created_at", todayStart.toISOString());

        if ((count ?? 0) >= FREE_LIMIT) {
          return Response.json({ error: "LIMIT_REACHED", limit: FREE_LIMIT }, { status: 429 });
        }
      }
    }

    // ── 3. Sanitise messages ──────────────────────────────────────────────────
    const cleaned = messages
      .filter((m: { role: string; content: string }) => m.content.trim() !== "")
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    const firstUserIdx = cleaned.findIndex((m: { role: string }) => m.role === "user");
    if (firstUserIdx === -1) {
      return Response.json({ error: "No user message found" }, { status: 400 });
    }
    const apiMessages = cleaned.slice(firstUserIdx);

    // ── 4. Call Groq (streaming) ──────────────────────────────────────────────
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const groqStream = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            max_tokens: 1024,
            stream: true,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...apiMessages,
            ],
          });

          for await (const chunk of groqStream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }

          controller.close();
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("[chat/stream]", msg);
          controller.enqueue(encoder.encode(`\n\nعذراً، حدث خطأ. حاول مرة أخرى.`));
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
