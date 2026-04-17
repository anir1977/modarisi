# Audit rapide du site Modarisi

_Date de l'audit: 16 avril 2026._

## Résumé exécutif

Le site a une bonne base visuelle et un positionnement clair (tuteur IA pour collégiens marocains), mais il lui manque encore des points importants avant une version "production solide" : cohérence de navigation, accessibilité, SEO technique, stabilité build offline, et preuves de confiance (CGU, mentions légales, etc.).

## Points forts

- Landing page moderne et bien structurée (Hero, Features, Testimonials, Pricing, CTA).
- Message produit clair: Darija + Français, programme marocain.
- Parcours principal visible (inscription, chat, pricing).
- Présence de pages utiles (FAQ, contact, privacy).

## Ce qui manque / priorités

## P0 — À corriger en premier

1. **Navigation cassée / incohérente**
   - Le menu contient `#about`, mais aucune section avec `id="about"` n'est présente sur la home.
   - Dans le footer, le lien `"Fonctionnalités"` pointe vers `/pricing#features`, alors que `#features` existe sur la home et pas sur la page pricing.

2. **Build fragile (dépendance Google Fonts réseau)**
   - Le build bloque si l'accès à Google Fonts échoue (`Inter` chargé via `next/font/google`).
   - Recommandation: passer à un fallback local (`next/font/local`) ou prévoir une stratégie de fallback plus robuste.

3. **Validation qualité non automatisée dans le repo**
   - `next lint` n'est pas configuré et lance un assistant interactif.
   - Il faut committer une config ESLint pour permettre CI/CD non-interactif.

## P1 — Important pour conversion et crédibilité

4. **Cohérence des offres / affichage prix**
   - Dans certaines cards, `period` contient déjà `DH/mois`, puis l'UI rajoute encore `DH` et `/`, ce qui peut donner un affichage ambigu.
   - Uniformiser la donnée (`price`, `currency`, `period`) et le rendu.

5. **Confiance légale incomplète**
   - Ajouter / compléter: **CGU**, **mentions légales**, politique de remboursement/annulation explicite.
   - Mettre ces liens dans footer + pages auth + pricing.

6. **Preuve sociale vérifiable**
   - Les témoignages sont bons mais semblent statiques.
   - Ajouter des éléments vérifiables: nombre d'utilisateurs mis à jour, logos partenaires, capture de notes améliorées anonymisées.

## P2 — UX / performance / accessibilité

7. **Accessibilité**
   - Vérifier focus visible clavier sur tous les boutons/links.
   - Ajouter labels ARIA sur certains boutons icône (menu mobile, copy buttons, close modal).
   - Vérifier contraste sur textes gris clairs.

8. **SEO technique**
   - Ajouter metadata par page (FAQ, contact, pricing, chat public si indexable).
   - Ajouter `sitemap.xml`, `robots.txt`, et données structurées (Organization + FAQPage).

9. **Design system & cohérence**
   - Certaines pages (FAQ, Contact) ont un header différent de la home.
   - Harmoniser la navigation globale pour éviter effet "mini-sites".

10. **Observabilité produit**
   - Définir les événements clés (signup_started, signup_completed, pay_clicked, chat_first_question, pay_proof_submitted).
   - Ajouter dashboard analytics funnel pour prioriser les optimisations.

## Plan d'action recommandé (7 jours)

- **Jour 1–2**: corriger navigation (anchors + liens footer), config ESLint, fallback fonts build.
- **Jour 3–4**: compléter pages légales + harmoniser affichage pricing.
- **Jour 5**: accessibilité rapide (ARIA + contrast + keyboard).
- **Jour 6**: SEO technique (sitemap, robots, schema).
- **Jour 7**: instrumentation analytics + revue finale.

## KPI à suivre après corrections

- Taux clic "Commencer gratuitement".
- Taux conversion inscription -> 1ère question chat.
- Taux conversion gratuit -> plan payant.
- Taux abandon page pricing.
- Temps moyen jusqu'à activation après virement.

