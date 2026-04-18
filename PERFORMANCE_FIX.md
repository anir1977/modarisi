# 🔴 Analyse Performance modarisi.ma — Fixes Urgents

## 🩺 Diagnostic : Pourquoi le site est lent ?

### Problème #1 — CRITIQUE : `force-dynamic` sur la homepage
**Fichier:** `app/page.tsx` — ligne 5
```js
export const dynamic = "force-dynamic"; // ← SUPPRIMER CETTE LIGNE
```
**Impact:** La homepage est re-générée côté serveur à chaque visite.
Un site marketing sans données dynamiques ne devrait JAMAIS avoir ça.
Résultat: 0 cache, 0 edge delivery, latence serveur à chaque clic.
**Fix:** Supprimer cette ligne → Next.js génère la page statiquement (1x au build).

---

### Problème #2 — CRITIQUE : Middleware Supabase sur TOUTES les routes publiques
**Fichier:** `middleware.ts`
Le middleware appelle `supabase.auth.getUser()` sur CHAQUE requête,
y compris `/`, `/cours`, `/tashih`, `/pricing`, `/contact`...
Cela ajoute 200-500ms de latence réseau sur CHAQUE page vue,
même pour un visiteur anonyme qui n'a pas de session.

---

### Problème #3 — ÉLEVÉ : Landing page 100% "use client" avec animations lourdes
**Fichier:** `components/landing/Hero.tsx` (305 lignes, use client)
- `setInterval` à 16ms pour la typing animation (très CPU intensif sur mobile)
- `IntersectionObserver` + `useCountUp` avec intervals
- Tout ça bloque le First Contentful Paint sur connexions lentes

**Fichiers:** `components/landing/Features.tsx`, `Testimonials.tsx`
- Ces composants purement visuels n'ont pas besoin d'être "use client"

---

### Problème #4 — ÉLEVÉ : Navbar fait un appel Supabase sur chaque page
**Fichier:** `components/Navbar.tsx`
```js
supabase.auth.getUser() // ← appel réseau sur chaque page
```
Cela retarde l'interactivité de la navbar sur mobile.

---

### Problème #5 — MOYEN : next-intl ajoute de la latence serveur
`getLocale()` et `getMessages()` sont async dans chaque layout render.
Sur Vercel/Edge, ça ajoute ~50-100ms sur chaque SSR.

---

## ✅ Ce qui est bien fait
- sitemap.ts ✓
- robots.ts ✓
- Security headers dans middleware ✓
- Skeleton loaders dans dashboard ✓
- Error boundaries ✓
- Cours + Tashih pages existent ✓

---

## 🚀 PROMPT POUR CLAUDE CODE — Fix Performance Urgent

```
Tu travailles sur modarisi.ma (Next.js 14, TypeScript, Tailwind, Supabase, next-intl).

Le site est trop lent sur mobile. Voici les fixes urgents à faire DANS L'ORDRE:

═══════════════════════════════════════════════════════════
FIX 1 — app/page.tsx : Supprimer force-dynamic
═══════════════════════════════════════════════════════════

Supprimer cette ligne du fichier app/page.tsx:
  export const dynamic = "force-dynamic";

La homepage est une page marketing 100% statique. Elle ne lit aucune donnée
de la base de données. Next.js doit la générer statiquement au build.

═══════════════════════════════════════════════════════════
FIX 2 — middleware.ts : Ne checker l'auth que sur les routes protégées
═══════════════════════════════════════════════════════════

Modifier middleware.ts pour que le check Supabase soit conditionnel:
Actuellement il appelle supabase.auth.getUser() sur CHAQUE requête.
Il faut d'abord vérifier si la route nécessite auth, et si non, passer directement.

Voici le nouveau middleware.ts:

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_ROUTES = ["/dashboard", "/chat"];
const PRO_ROUTES: string[] = [];

function addSecurityHeaders(response: NextResponse): NextResponse {
  const h = response.headers;
  h.set("X-Content-Type-Options", "nosniff");
  h.set("X-Frame-Options", "DENY");
  h.set("X-XSS-Protection", "1; mode=block");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  h.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pour les routes publiques (landing, cours, tashih, pricing...) 
  // → pas d'appel Supabase, juste les security headers
  const needsAuth = AUTH_ROUTES.some(r => pathname.startsWith(r));
  const needsPro  = PRO_ROUTES.some(r => pathname.startsWith(r));

  if (!needsAuth && !needsPro) {
    return addSecurityHeaders(NextResponse.next({ request }));
  }

  // Seulement pour les routes protégées → créer client Supabase
  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (needsAuth && !user) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return addSecurityHeaders(NextResponse.redirect(loginUrl));
  }

  if (needsPro && user) {
    const { data: profile } = await supabase
      .from("profiles").select("plan").eq("id", user.id).single();
    const plan = profile?.plan ?? "free";
    if (plan !== "pro" && plan !== "famille") {
      return addSecurityHeaders(NextResponse.redirect(new URL("/pricing", request.url)));
    }
  }

  return addSecurityHeaders(supabaseResponse);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|eot|css|js)$).*)",
  ],
};
```

═══════════════════════════════════════════════════════════
FIX 3 — components/landing/Hero.tsx : Réduire l'intervalle de typing
═══════════════════════════════════════════════════════════

Dans Hero.tsx, la typing animation utilise setInterval à 16ms (60fps).
Sur mobile c'est trop intensif. Changer à 30ms (30fps) et 32ms pour le countUp.

Trouver: setInterval(() => { ... }, 16)
Remplacer par: setInterval(() => { ... }, 30)

Pour useCountUp, changer:
  const step = target / (duration / 16);
  setInterval(..., 16)
Par:
  const step = target / (duration / 32);
  setInterval(..., 32)

═══════════════════════════════════════════════════════════
FIX 4 — components/Navbar.tsx : Lazy auth check + optimistic UI
═══════════════════════════════════════════════════════════

Le Navbar fait un appel Supabase qui bloque le rendu. Améliorer:

1. Ajouter un state initial basé sur localStorage pour un affichage immédiat:
```typescript
const [loggedIn, setLoggedIn] = useState(() => {
  // Vérification rapide locale (pas de réseau)
  if (typeof window === "undefined") return false;
  return document.cookie.includes("sb-") || 
         localStorage.getItem("sb-auth-token") !== null;
});
```

2. Puis confirmer avec Supabase de façon asynchrone (déjà fait dans useEffect).
Cela évite le "flash" où le bouton change après chargement.

═══════════════════════════════════════════════════════════
FIX 5 — components/landing/Features.tsx : Retirer "use client" inutile
═══════════════════════════════════════════════════════════

Features.tsx n'a pas besoin de "use client" — c'est du HTML statique avec hover CSS.
Retirer "use client" de Features.tsx et HowItWorks.tsx.
Ces composants seront rendus côté serveur → HTML envoyé directement → plus rapide.
(Attention: vérifier si useTranslations fonctionne dans les Server Components avec next-intl)

═══════════════════════════════════════════════════════════
FIX 6 — Ajouter une OG Image pour le partage sur réseaux sociaux
═══════════════════════════════════════════════════════════

Créer le fichier: app/opengraph-image.tsx

```typescript
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Modarisi — Tuteur IA pour collégiens marocains";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0a0f1e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute", top: 100, left: 200,
          width: 400, height: 400,
          background: "rgba(59,130,246,0.2)",
          borderRadius: "50%", filter: "blur(80px)",
        }} />
        
        {/* Logo */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
        }}>
          <div style={{
            width: 72, height: 72,
            background: "linear-gradient(135deg, #3b82f6, #10b981)",
            borderRadius: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 36 }}>🎓</span>
          </div>
          <span style={{ fontSize: 52, fontWeight: 800, color: "white" }}>
            Modarisi
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 48, fontWeight: 800, color: "white",
          textAlign: "center", margin: "0 80px 16px",
          lineHeight: 1.2,
        }}>
          Le tuteur IA pour{" "}
          <span style={{ color: "#60a5fa" }}>collégiens marocains</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 24, color: "#9ca3af", textAlign: "center",
          margin: "0 120px 40px",
        }}>
          Maths · Physique · SVT · Français · Arabe — en Darija ou en français 🇲🇦
        </p>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["99 DH/mois", "7 matières", "Disponible 24h/7j", "Programme officiel"].map(item => (
            <div key={item} style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 50, padding: "10px 20px",
              color: "white", fontSize: 18,
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
```

═══════════════════════════════════════════════════════════
FIX 7 — Ajouter un favicon professionnel
═══════════════════════════════════════════════════════════

Créer: app/icon.tsx

```typescript
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{
        width: 32, height: 32,
        background: "linear-gradient(135deg, #3b82f6, #10b981)",
        borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18,
      }}>
        🎓
      </div>
    ),
    size
  );
}
```

═══════════════════════════════════════════════════════════
FIX 8 — Vérifier que les pages /cours et /tashih ont un CTA pour non-connectés
═══════════════════════════════════════════════════════════

Dans app/cours/page.tsx et app/tashih/page.tsx :
Si l'utilisateur n'est pas connecté, afficher une bannière sticky en bas:

```tsx
{!isLoggedIn && (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/95 to-emerald-900/95 backdrop-blur-xl border-t border-white/10 p-4">
    <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
      <div>
        <p className="text-white font-semibold text-sm">
          🎓 Tu aimes ce que tu vois ?
        </p>
        <p className="text-gray-300 text-xs">
          Inscris-toi gratuitement — 5 questions offertes, sans carte bancaire
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        <Link href="/auth/login"
          className="px-4 py-2 text-sm text-gray-300 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
          Se connecter
        </Link>
        <Link href="/auth/register"
          className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl hover:from-blue-500 hover:to-emerald-500 transition-all">
          Commencer gratuitement →
        </Link>
      </div>
    </div>
  </div>
)}
```

Pour détecter si l'utilisateur est connecté côté client dans ces pages,
utiliser le même pattern: const supabase = createClient() puis auth.getUser().

═══════════════════════════════════════════════════════════
RÉSULTAT ATTENDU APRÈS CES FIXES:
═══════════════════════════════════════════════════════════

| Métrique            | Avant    | Après    |
|---------------------|----------|----------|
| Homepage (mobile)   | ~4-6s    | < 1.5s   |
| Time to First Byte  | ~500ms   | ~50ms    |
| Middleware latency  | +300ms   | 0ms (public routes) |
| JS Bundle (landing) | Lourd    | -30% avec server components |

Après ces fixes, tester sur: https://pagespeed.web.dev/ avec l'URL du site.
Objectif: Score Performance > 80 sur mobile.
```

---

## 📋 Checklist avant Marketing

- [ ] Fix 1: Supprimer `force-dynamic` homepage
- [ ] Fix 2: Middleware optimisé
- [ ] Fix 3: Typing animation moins agressive
- [ ] Fix 4: Navbar optimistic UI  
- [ ] Fix 5: Features/HowItWorks → Server Components
- [ ] Fix 6: OG Image pour réseaux sociaux
- [ ] Fix 7: Favicon
- [ ] Fix 8: Bannière CTA pour visiteurs non-connectés
- [ ] Tester sur PageSpeed: https://pagespeed.web.dev/
- [ ] Tester sur GTmetrix
- [ ] Vérifier sur iPhone (pas seulement DevTools)

---

*Analyse faite le 18 Avril 2026*
