import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that require authentication — Supabase is ONLY called for these
const AUTH_ROUTES = ["/dashboard", "/chat", "/parent-dashboard", "/admin"];

// Security headers applied to every response
function addSecurityHeaders(response: NextResponse, pathname = ""): NextResponse {
  const h = response.headers;
  h.set("X-Content-Type-Options", "nosniff");
  h.set("X-Frame-Options", pathname.startsWith("/api/pdf") ? "SAMEORIGIN" : "DENY");
  h.set("X-XSS-Protection", "1; mode=block");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  h.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Public routes: skip Supabase entirely, just add security headers ──────────
  const needsAuth = AUTH_ROUTES.some(r => pathname.startsWith(r));
  if (!needsAuth) {
    return addSecurityHeaders(NextResponse.next({ request }), pathname);
  }

  // ── Protected routes: create Supabase client and check session ────────────────
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return addSecurityHeaders(NextResponse.redirect(loginUrl), pathname);
  }

  return addSecurityHeaders(supabaseResponse, pathname);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|eot|css|js)$).*)",
  ],
};
