import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  // Supabase can return an error in the URL (e.g. expired link)
  const urlError = searchParams.get("error");
  const urlErrorDesc = searchParams.get("error_description");
  if (urlError) {
    const params = new URLSearchParams({ error: urlErrorDesc ?? urlError });
    return NextResponse.redirect(`${origin}/auth/login?${params}`);
  }

  const code       = searchParams.get("code");        // OAuth / PKCE flow
  const token_hash = searchParams.get("token_hash");  // Email OTP flow
  const type       = searchParams.get("type") as EmailOtpType | null;
  const next       = searchParams.get("next") ?? "/dashboard";

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  // ── 1. Email confirmation / magic link (token_hash + type) ──────────────
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    const params = new URLSearchParams({ error: error.message });
    return NextResponse.redirect(`${origin}/auth/login?${params}`);
  }

  // ── 2. OAuth / PKCE code exchange ───────────────────────────────────────
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    const params = new URLSearchParams({ error: error.message });
    return NextResponse.redirect(`${origin}/auth/login?${params}`);
  }

  // ── Fallback ─────────────────────────────────────────────────────────────
  return NextResponse.redirect(
    `${origin}/auth/login?error=Lien+de+confirmation+invalide`
  );
}
