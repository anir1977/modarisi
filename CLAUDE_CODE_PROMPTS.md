# 🚀 Prompts Claude Code — Amélioration de modarisi.ma

> Codebase: Next.js 14 · TypeScript · Tailwind CSS · Supabase · Anthropic API  
> Thème: Dark (bg-gray-950 / bg-[#0a0f1e]) · Tuteur IA "Nour" · Collège marocain

---

## 📌 CONTEXTE DU PROJET

modarisi.ma est une plateforme d'IA tuteur pour les collégiens marocains (1ère, 2ème, 3ème année). Elle utilise:
- Next.js 14 App Router
- Supabase pour auth et base de données
- L'API Anthropic Claude pour le chat IA
- Tailwind CSS + Radix UI pour le design
- Thème dark (bg-gray-950)
- Langues: Français + Darija
- Matières: Maths, Physique-Chimie, SVT, Français, Arabe, Histoire-Géo, Éducation Islamique

---

## 🎨 PROMPT 1 — REDESIGN PROFESSIONNEL DE LA LANDING PAGE

```
Tu travailles sur modarisi.ma, une plateforme Next.js 14 (TypeScript + Tailwind CSS) 
de tuteur IA pour collégiens marocains. Le thème est dark (bg-gray-950 / bg-[#0a0f1e]).

Ta mission est de rendre la landing page beaucoup plus professionnelle et moderne, 
en t'inspirant des meilleures EdTech (Duolingo, Khan Academy, Notion, Linear).

Fichiers à modifier:
- app/page.tsx
- components/Navbar.tsx
- components/Footer.tsx
- components/landing/Hero.tsx
- components/landing/Features.tsx
- components/landing/HowItWorks.tsx
- components/landing/Testimonials.tsx
- components/landing/PricingSection.tsx
- components/landing/CTA.tsx

Améliorations à faire:

1. NAVBAR:
   - Ajouter un sticky navbar avec effet glassmorphism (backdrop-blur + bg-opacity)
   - Ajouter une animation de scroll: navbar devient plus compacte après scroll de 50px
   - Ajouter les liens: Accueil, Cours, Tashih, Tarifs, Contact
   - Ajouter un badge animé "Nouveau" sur le lien "Cours"
   - Boutons: "Se connecter" (outline) + "Commencer" (gradient bleu→emerald)

2. HERO:
   - Remplacer le chat demo statique par une animation de frappe (typing animation) 
     qui montre une question en Darija puis la réponse de Nour étape par étape
   - Ajouter des stats animées sous le hero: "5000+ élèves", "150K+ questions répondues", 
     "7 matières", "24/7 disponible" — avec un compteur animé au scroll
   - Ajouter un badge de confiance: "Aligné sur le programme officiel MEN Maroc 🇲🇦"
   - Améliorer le gradient de fond: utiliser un mesh gradient animé subtil

3. FEATURES:
   - Transformer les cards en bento grid (style moderne 2024)
   - Une grande card à gauche + grille de petites cards à droite
   - Ajouter des icônes animées (hover: scale + glow)
   - Ajouter 2 nouvelles features: "Cours structurés par chapitre" et "Correction d'exercices IA"

4. HOW IT WORKS:
   - Remplacer par une timeline verticale animée avec 4 étapes illustrées
   - Étape 1: Inscris-toi gratuitement
   - Étape 2: Choisis ta matière et ton niveau
   - Étape 3: Pose tes questions ou upload ton exercice
   - Étape 4: Reçois une explication + correction personnalisée

5. TESTIMONIALS:
   - Ajouter un carousel auto-scroll infini (marquee animation CSS)
   - 8 témoignages avec avatar, nom, ville, note ⭐⭐⭐⭐⭐
   - Créer des avatars avec des initiales colorées

6. CTA FINAL:
   - Section avec fond gradient bleu profond
   - Texte impactant bilingue FR/Darija
   - Deux boutons: "Commencer gratuitement" + "Voir les cours"
   - Ajouter une liste de garanties: ✓ Sans carte bancaire ✓ 5 questions gratuites ✓ Annuler à tout moment

7. FOOTER:
   - 4 colonnes: Logo+description | Produit | Aide | Légal
   - Ajouter les icônes réseaux sociaux (Instagram, YouTube, WhatsApp)
   - Copyright avec année dynamique

IMPORTANT: 
- Garder le thème dark cohérent (bg-gray-950, bg-gray-900, bg-gray-800)
- Utiliser uniquement Tailwind CSS (pas de CSS externe)
- Toutes les animations avec classes Tailwind + CSS variables
- Responsive mobile-first obligatoire
- Garder lucide-react pour les icônes
```

---

## 📚 PROMPT 2 — FEATURE DOROSS (COURS STRUCTURÉS)

```
Tu travailles sur modarisi.ma (Next.js 14, TypeScript, Tailwind, Supabase, Anthropic API).

Objectif: Créer une section complète de COURS STRUCTURÉS pour les collégiens marocains.

Les cours sont organisés par: Niveau (1ère/2ème/3ème année) → Matière → Chapitre → Leçon

STRUCTURE À CRÉER:

1. PAGE /cours (app/cours/page.tsx):
   - Header: "Cours & Leçons" avec sous-titre bilingue
   - Filtres: 3 boutons de niveau (1ère / 2ème / 3ème année collège)
   - Grid des matières avec cards colorées (chaque matière a couleur + icône unique):
     * Mathématiques → bleu + Calculator icon
     * Physique-Chimie → violet + Atom icon  
     * SVT → vert + FlaskConical icon
     * Français → amber + BookMarked icon
     * Arabe → rose + BookOpen icon
     * Histoire-Géo → orange + Globe icon
     * Éducation Islamique → teal + Landmark icon
   - Chaque card affiche: Nom matière, nombre de chapitres, progression de l'élève (%)
   - Bouton "Commencer" sur chaque card

2. PAGE /cours/[matiere]/[niveau] (app/cours/[matiere]/[niveau]/page.tsx):
   - Breadcrumb: Cours → Mathématiques → 1ère année
   - Liste des chapitres avec accordion:
     * Chaque chapitre = titre + liste de leçons
     * Leçon = icône PlayCircle + titre + durée estimée + badge (Nouveau/Complété)
     * Leçons verrouillées pour les non-abonnés (icône Lock + "Pro")
   - Sidebar sticky: résumé de progression (barre de progression)

3. PAGE /cours/[matiere]/[niveau]/[chapitre]/[lecon] (app/cours/[matiere]/[niveau]/[chapitre]/[lecon]/page.tsx):
   - Layout en 2 colonnes: Contenu principal (70%) + Sidebar (30%)
   
   CONTENU PRINCIPAL:
   - Breadcrumb complet
   - Titre de la leçon (FR + Arabe)
   - Barre de progression du cours (chapitre X/Y)
   - Contenu de la leçon: texte structuré avec:
     * Objectifs de la leçon (liste avec ✓)
     * Cours explicatif (HTML formaté avec titres, paragraphes, exemples)
     * Formules/règles importantes dans des boxes colorées (bg-blue-500/10 border-blue-500/30)
     * Exemples résolus étape par étape
     * Points clés à retenir
   - Boutons navigation: ← Leçon précédente | Leçon suivante →
   
   SIDEBAR:
   - Résumé des chapitres (mini-liste cliquable)
   - Box "Poser une question à Nour" → lien vers /chat avec contexte pré-rempli
   - Box "Faire des exercices" → lien vers /tashih avec matière pré-sélectionnée

4. GÉNÉRATION DU CONTENU:
   - Créer app/api/cours/generate/route.ts
   - Route POST qui prend: {matiere, niveau, chapitre, lecon} 
   - Appelle l'API Anthropic pour générer le contenu de la leçon
   - Prompt système: "Tu es un professeur expert du programme marocain collège. 
     Génère une leçon complète et pédagogique en français pour [matiere], 
     niveau [niveau], chapitre [chapitre], leçon [lecon]. 
     Structure: objectifs, cours, exemples résolus, points clés. 
     Utilise des formules LaTeX quand nécessaire. Sois clair et progressif."
   - Mettre en cache dans Supabase table 'cours_content' (id, matiere, niveau, chapitre, lecon, content, created_at)
   - Si contenu existe en cache → retourner depuis Supabase (pas d'appel API)

5. DONNÉES CURRICULUM:
   - Créer lib/curriculum.ts avec toutes les matières/chapitres/leçons pour les 3 niveaux
   - Réutiliser la structure déjà dans app/programme/page.tsx
   - Étendre avec les leçons de chaque chapitre

6. TABLE SUPABASE À CRÉER:
   ```sql
   -- Contenu des leçons (cache)
   CREATE TABLE cours_content (
     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
     matiere text NOT NULL,
     niveau text NOT NULL,
     chapitre text NOT NULL,
     lecon text NOT NULL,
     content jsonb NOT NULL,
     created_at timestamptz DEFAULT now(),
     UNIQUE(matiere, niveau, chapitre, lecon)
   );
   
   -- Progression des élèves
   CREATE TABLE user_progress (
     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id uuid REFERENCES auth.users NOT NULL,
     matiere text NOT NULL,
     niveau text NOT NULL,
     chapitre text NOT NULL,
     lecon text NOT NULL,
     completed_at timestamptz DEFAULT now(),
     UNIQUE(user_id, matiere, niveau, chapitre, lecon)
   );
   ```

7. AJOUTER dans le Dashboard (/dashboard/page.tsx):
   - Section "Mes cours" avec les 3 dernières leçons consultées
   - Progression par matière (barres de progression)
   - Bouton "Continuer" pour reprendre la dernière leçon

DESIGN:
- Thème dark cohérent (bg-gray-950)
- Cards avec border border-white/10 et hover:border-white/20
- Gradient de couleur unique par matière
- Animations smooth (transition-all duration-300)
- 100% responsive
```

---

## ✏️ PROMPT 3 — FEATURE TASHIH MAWAD (CORRECTION D'EXERCICES)

```
Tu travailles sur modarisi.ma (Next.js 14, TypeScript, Tailwind, Supabase, Anthropic API).

Objectif: Créer une page de CORRECTION D'EXERCICES IA où l'élève peut:
1. Taper ou photographier un exercice
2. Écrire sa réponse
3. Recevoir une correction détaillée de l'IA

FICHIERS À CRÉER:

1. PAGE /tashih (app/tashih/page.tsx):

   LAYOUT:
   - Header avec titre "Correction d'exercices · تصحيح الواجبات"
   - Sous-titre: "Soumets ton exercice et reçois une correction complète étape par étape"
   
   INTERFACE EN 3 COLONNES SUR DESKTOP, STACK SUR MOBILE:
   
   COLONNE 1 — Sélection contexte (250px):
   - Sélecteur de matière (7 matières avec icônes colorées)
   - Sélecteur de niveau (1ère/2ème/3ème)
   - Sélecteur de chapitre (liste déroulante basée sur matière+niveau)
   - Type d'exercice: QCM / Problème / Rédaction / Calcul / Question de cours
   
   COLONNE 2 — Input exercice (flex-1):
   - Tabs: "Texte" | "Image"
   
   Tab TEXTE:
   - Textarea pour l'énoncé de l'exercice (placeholder: "Écris l'énoncé de l'exercice ici...")
   - Textarea pour la réponse de l'élève (placeholder: "Écris ta réponse ici... (facultatif)")
   - Bouton "Corriger avec Nour" (gradient vert, taille large)
   
   Tab IMAGE:
   - Zone drag & drop pour uploader une photo d'exercice
   - Support: JPG, PNG, HEIC (photos de téléphone)
   - Preview de l'image uploadée
   - Textarea optionnelle pour ajouter du contexte
   - Bouton "Corriger avec Nour"
   - Note: "Prends une photo claire de ton cahier ou manuel"
   
   COLONNE 3 — Résultat correction (400px):
   - État vide: illustration + "Ta correction apparaîtra ici"
   - État loading: skeleton animé avec message "Nour analyse ton exercice..."
   - État résultat: 
     * Badge résultat global (Excellent ✓ / Bien / À améliorer / À reprendre)
     * Note estimée /20 avec cercle coloré
     * Section "Ce que tu as bien fait ✓" (fond vert/10)
     * Section "Points à corriger ⚠" (fond amber/10)  
     * Section "Correction complète" avec markdown rendu
     * Section "Conseil de Nour" (encadré bleu)
     * Boutons: "Sauvegarder" | "Poser une question" | "Exercice suivant"

2. API /api/tashih (app/api/tashih/route.ts):
   
   Route POST qui reçoit:
   ```typescript
   {
     exercice: string,          // énoncé
     reponse_eleve?: string,    // réponse de l'élève (optionnel)
     matiere: string,
     niveau: string,
     chapitre?: string,
     type_exercice: string,
     image_base64?: string      // si image uploadée
   }
   ```
   
   Prompt système pour Anthropic:
   ```
   Tu es Nour, un professeur bienveillant expert du programme marocain collège.
   Tu dois corriger un exercice de [matière], niveau [niveau].
   
   Sois:
   - Encourageant et bienveillant (jamais brutal)
   - Pédagogique: explique chaque étape
   - Précis: utilise le vocabulaire du programme marocain
   - Bilingue si nécessaire (français + darija pour les explications difficiles)
   
   Format de ta réponse (JSON):
   {
     "note": number (0-20),
     "appreciation": "Excellent" | "Bien" | "À améliorer" | "À reprendre",
     "points_positifs": string[],
     "points_a_corriger": string[],
     "correction_complete": string (markdown avec LaTeX si besoin),
     "conseil": string (une phrase d'encouragement personnalisée)
   }
   ```
   
   - Si image_base64 fournie → utiliser vision API d'Anthropic (claude-3-5-sonnet avec image)
   - Retourner streaming si possible pour affichage progressif

3. TABLE SUPABASE:
   ```sql
   CREATE TABLE corrections (
     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id uuid REFERENCES auth.users,
     matiere text,
     niveau text,
     chapitre text,
     type_exercice text,
     exercice_text text,
     reponse_eleve text,
     correction jsonb NOT NULL,
     created_at timestamptz DEFAULT now()
   );
   ```

4. PAGE /tashih/historique (app/tashih/historique/page.tsx):
   - Liste des corrections passées
   - Filtres par matière et date
   - Chaque correction = card avec matière, date, note, aperçu
   - Cliquer → modal avec correction complète

5. AJOUTER dans le Dashboard:
   - Section "Dernières corrections" avec les 3 dernières
   - Stats: note moyenne, matière la plus corrigée
   - Bouton "Nouvelle correction"

6. INTÉGRATION dans la landing page:
   - Ajouter section démo de tashih dans Features.tsx
   - Montrer un exemple de correction rendue (statique, pas d'appel API)

DESIGN IMPORTANT:
- Badge de note: ≥15 → vert, 10-14 → amber, <10 → rouge
- Animation du résultat: fade-in progressif section par section
- Support du rendu LaTeX (déjà: rehype-katex + remark-math installés)
- Mobile-first: colonne unique sur mobile avec tabs pour naviguer entre input/résultat
```

---

## 🔧 PROMPT 4 — AMÉLIORATIONS TECHNIQUES ET DASHBOARD

```
Tu travailles sur modarisi.ma (Next.js 14, TypeScript, Tailwind, Supabase).

Améliore le Dashboard (/dashboard/page.tsx) et effectue des corrections techniques.

1. DASHBOARD REDESIGN:
   
   SIDEBAR (nouveau):
   - Créer un layout avec sidebar fixe à gauche (240px) sur desktop
   - Menu: 🏠 Accueil | 📚 Mes cours | ✏️ Correction | 💬 Chat avec Nour | 📊 Progression | ⚙️ Paramètres
   - Avatar de l'élève + nom + niveau en bas de sidebar
   - Sur mobile: bottom navigation bar (5 icônes)
   
   PAGE ACCUEIL DASHBOARD:
   - Greeting dynamique: "Bonjour [prénom] 👋" avec heure (Bonjour/Bonsoir)
   - Streak de connexion (nombre de jours consécutifs)
   - Stats row: Questions posées | Cours complétés | Exercices corrigés | Note moyenne
   - Section "Continuer" → dernière leçon consultée
   - Section "Activité récente" → 5 dernières actions
   - Section "Recommandé pour toi" → 3 leçons basées sur les matières fréquentes
   
2. PAGE PROGRESSION (/dashboard/progression):
   - Graph de progression hebdomadaire (utiliser recharts ou SVG pur)
   - Par matière: barre de progression avec % chapitres complétés
   - Calendrier d'activité (style GitHub contribution graph)
   - Objectifs hebdomadaires avec progress bars

3. SYSTÈME DE RÉCOMPENSES:
   - Badges débloquables: "Première question", "10 cours complétés", "Note parfaite", etc.
   - XP points system: +10 XP par question, +50 XP par leçon, +30 XP par correction
   - Niveaux: Débutant → Intermédiaire → Avancé → Expert
   - Afficher level et XP dans le dashboard

4. OPTIMISATIONS TECHNIQUES:
   - Ajouter loading.tsx dans chaque dossier de route (squelette animé)
   - Ajouter error.tsx dans chaque dossier de route
   - Optimiser les images avec next/image
   - Ajouter metadata SEO dans layout.tsx:
     * Title: "Modarisi - Tuteur IA pour collégiens marocains | مدرسي"
     * Description bilingue
     * Open Graph image
   - Ajouter sitemap.ts et robots.ts
   - Ajouter Google Analytics / Vercel Analytics

5. MIDDLEWARE (/middleware.ts):
   - Protéger toutes les routes /dashboard/*, /cours/*, /tashih/* 
   - Rediriger vers /auth/login si non connecté
   - Vérifier plan (Pro/Famille) pour les routes premium
   - Ajouter headers de sécurité (CSP, HSTS)

6. COMPOSANTS UI MANQUANTS à créer dans /components/ui/:
   - ProgressBar.tsx (barre de progression animée)
   - Badge.tsx (étiquettes colorées)
   - Skeleton.tsx (loading placeholder)
   - Modal.tsx (dialogue réutilisable)
   - Toast.tsx (notifications)

NOTES:
- Garder Supabase pour toute la persistance
- Pas de bibliothèque de graphiques externe sauf recharts (déjà potentiellement utilisé)
- TypeScript strict, pas de 'any'
- Tous les composants "use client" seulement si nécessaire
```

---

## 🌍 PROMPT 5 — INTERNATIONALISATION (FRANÇAIS + ARABE)

```
Tu travailles sur modarisi.ma (Next.js 14, TypeScript, Tailwind).

Ajoute un support bilingue Français/Arabe sur toutes les pages publiques.

1. SETUP I18N avec next-intl:
   npm install next-intl
   
   Structure:
   - messages/fr.json
   - messages/ar.json
   - middleware.ts → détecter langue (défaut: fr)
   - app/[locale]/layout.tsx

2. CONTENU À TRADUIRE:
   - Navbar: tous les liens et boutons
   - Landing page: Hero, Features, HowItWorks, Testimonials, Pricing, CTA, Footer
   - Auth pages: Login, Register
   - Dashboard: tous les titres et labels
   - Cours: navigation et interface
   - Tashih: tous les labels et messages

3. DIRECTION RTL pour l'arabe:
   - Ajouter dir="rtl" automatiquement quand langue = ar
   - Ajuster les margins/paddings (ml → mr, etc.) via Tailwind RTL plugin
   - Inverser les layouts de grille

4. SÉLECTEUR DE LANGUE:
   - Ajouter dans Navbar: toggle FR 🇫🇷 / AR 🇲🇦
   - Sauvegarder préférence dans cookie
   - Pas de rechargement de page (router.replace)

5. DARIJA:
   - Ne pas créer une 3ème locale pour Darija
   - Garder Darija dans les prompts de l'IA (déjà géré dans /api/chat)
   - Ajouter dans les placeholders et messages d'encouragement
```

---

## 🎯 ORDRE D'EXÉCUTION RECOMMANDÉ

1. **Prompt 4** (Améliorations techniques) → Foundation solide
2. **Prompt 1** (Redesign Landing) → Première impression professionnelle  
3. **Prompt 2** (Cours) → Feature principale
4. **Prompt 3** (Tashih) → Feature différenciante
5. **Prompt 5** (i18n) → En dernier, après que tout fonctionne

---

## 💡 CONSEILS POUR UTILISER CES PROMPTS AVEC CLAUDE CODE

- Lance Claude Code depuis le dossier racine du projet: `cd modarisi && claude`
- Donne un prompt à la fois
- Après chaque prompt, teste avec `npm run dev` et vérifie le résultat
- Si Claude Code pose des questions sur la DB Supabase, donne-lui accès à `.env.local`
- Pour les migrations SQL, utilise le dashboard Supabase directement

---

*Prompts générés par analyse du codebase modarisi.ma — Avril 2026*
