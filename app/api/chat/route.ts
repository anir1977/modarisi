import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are Modarisi, an AI tutor for Moroccan middle school students (collège). You help with all subjects: Maths, Physique-Chimie, SVT, Français, Arabe, Éducation Islamique, Histoire-Géographie. Answer in the same language the student uses (Darija or French). Be encouraging, patient, and explain step by step like a good teacher.`;

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse request ─────────────────────────────────────────────────────
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "messages array is required" }, { status: 400 });
    }

    // ── 2. Init client inside handler so env var is guaranteed to be present ─
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("[chat] ANTHROPIC_API_KEY is not set");
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }
    const client = new Anthropic({ apiKey });

    // ── 3. Sanitise messages ─────────────────────────────────────────────────
    //   • Strip empty-content messages (e.g. the streaming placeholder)
    //   • Anthropic requires alternating user/assistant, starting with user
    const cleaned = messages
      .filter((m: { role: string; content: string }) => m.content.trim() !== "")
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    // Drop any leading assistant messages (e.g. the welcome message)
    const firstUserIdx = cleaned.findIndex((m) => m.role === "user");
    if (firstUserIdx === -1) {
      return Response.json({ error: "No user message found" }, { status: 400 });
    }
    const apiMessages = cleaned.slice(firstUserIdx);

    // ── 4. Call Anthropic (streaming) ────────────────────────────────────────
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
          // Send error as a final chunk so the client can display it
          controller.enqueue(
            encoder.encode(`\n\n⚠️ Erreur: ${msg}`)
          );
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
