import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { sendWelcomeEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams, origin } = url;

  // ── Debug: log every param that arrives (visible in Vercel / local logs) ──
  const allParams: Record<string, string> = {};
  searchParams.forEach((v, k) => { allParams[k] = v; });
  console.log("[auth/callback] params:", JSON.stringify(allParams));

  // ── Supabase forwarded an error (e.g. link already used) ──────────────────
  const urlError = searchParams.get("error");
  const urlErrorDesc = searchParams.get("error_description");
  if (urlError) {
    console.error("[auth/callback] Supabase error:", urlError, urlErrorDesc);
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(urlErrorDesc ?? urlError)}`
    );
  }

  const token_hash = searchParams.get("token_hash"); // Email OTP / magic-link
  const type       = searchParams.get("type") as EmailOtpType | null;
  const code       = searchParams.get("code");        // PKCE / OAuth

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  // ── 1. Email confirmation / magic-link: token_hash + type ─────────────────
  if (token_hash && type) {
    console.log("[auth/callback] verifyOtp token_hash flow, type:", type);
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      console.log("[auth/callback] verifyOtp OK → /dashboard");
      // Send welcome email (non-blocking)
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const name = user.user_metadata?.full_name ?? user.email;
        sendWelcomeEmail(user.email, name).catch(() => {});
      }
      return NextResponse.redirect(`${origin}/dashboard`);
    }
    console.error("[auth/callback] verifyOtp error:", error.message);
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(error.message)}`
    );
  }

  // ── 2. PKCE / OAuth code exchange ─────────────────────────────────────────
  if (code) {
    console.log("[auth/callback] exchangeCodeForSession flow");
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      console.log("[auth/callback] exchangeCode OK → /dashboard");
      // Send welcome email (non-blocking)
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const name = user.user_metadata?.full_name ?? user.email;
        sendWelcomeEmail(user.email, name).catch(() => {});
      }
      return NextResponse.redirect(`${origin}/dashboard`);
    }
    console.error("[auth/callback] exchangeCode error:", error.message);
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(error.message)}`
    );
  }

  // ── Fallback: no recognised params ────────────────────────────────────────
  console.error("[auth/callback] no token_hash or code in URL");
  return NextResponse.redirect(
    `${origin}/auth/login?error=${encodeURIComponent("Lien de confirmation invalide ou expiré. Veuillez vous inscrire à nouveau.")}`
  );
}
