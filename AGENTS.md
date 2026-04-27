# Modarisi Design System Rules

These rules guide future Figma-to-code and UI work in this Next.js project.

## Project Stack

- Framework: Next.js App Router with React and TypeScript.
- Styling: Tailwind CSS with global CSS utilities in `app/globals.css`.
- Components: shared layout components live in `components/`; route UI lives in `app/**/page.tsx`.
- Imports: use the `@/` path alias for internal imports.
- Assets: use `next/image` for remote images and static assets when possible.

## Brand Direction

- Modarisi should feel trustworthy, Moroccan, educational, and calm.
- Prefer a clean SaaS/education interface over playful decoration.
- Use Arabic fusha for site copy. Avoid Darija inside product UI.
- Use clear labels: `الدروس`, `التمارين`, `الامتحانات`, `المساعد`, `الاشتراك`.
- Avoid fake metrics, fake testimonials, and unsupported claims.

## Visual System

- Primary color: blue (`#2563EB`) for navigation, CTAs, selected states, and links.
- Secondary color: emerald (`#10B981`) for success and learning-progress accents.
- Accent color: amber (`#F59E0B`) for coming-soon, highlights, and premium cues.
- Text: slate scale, with `#1E293B` for main text and `#64748B` for secondary text.
- Background: `#F8FAFC`; use white surfaces with subtle slate borders.
- Use restrained gradients only for page heroes or purposeful subject accents.
- Avoid one-note palettes; mix blue, emerald, amber, and slate intentionally.

## Layout Rules

- Use `max-w-6xl mx-auto px-4` for main shells unless the page already has a more specific container.
- Keep cards at `rounded-2xl` or `rounded-3xl` only when matching existing pages.
- Do not nest cards inside cards. If a page needs structure, use one section card plus unframed inner grids.
- Keep dense educational pages scannable: filters first, list/sidebar second, content viewer third.
- Maintain RTL alignment and spacing.
- Ensure mobile views have enough bottom padding because `BottomNav` is fixed.

## Component Rules

- Reuse `Navbar`, `Footer`, and `BottomNav` rather than recreating navigation.
- Place new shared components in `components/` using PascalCase filenames.
- Components that use hooks must start with `"use client"`.
- Prefer server components for static content pages.
- Interactive elements must use real `button`, `Link`, or `a` elements with clear focus and hover states.

## Typography

- Use Cairo as the primary Arabic UI font from `app/globals.css`.
- Do not scale font size with viewport width.
- Use `font-black` only for major page headings or strong card titles.
- Long Arabic body copy should use `leading-7` or `leading-8`.
- Keep button text short and action-oriented.

## Figma MCP Integration Rules

When implementing a Figma design:

1. Fetch the exact node context first.
2. Fetch a screenshot for visual reference.
3. Treat generated React/Tailwind from Figma as design guidance, not final code.
4. Map Figma colors to the Modarisi tokens and Tailwind palette already used here.
5. Reuse existing layout components and page patterns.
6. Validate that desktop and mobile layouts do not overlap, truncate awkwardly, or hide core actions.

## Asset Rules

- Use `next/image` for hero and editorial imagery.
- Do not add new icon libraries; the project already uses `lucide-react`.
- Avoid decorative blobs, orbs, and purely abstract backgrounds.
- Use real educational context images for hero areas when a visual is needed.

## Quality Bar

- Run `npm run build` after UI changes.
- Keep copy honest: if a resource is not ready, show `قريباً`.
- Do not reintroduce AI-generated exams as official exam content.
- PDFs shown inside the site should keep the source visible and use internal `/api/pdf?id=...` links.
