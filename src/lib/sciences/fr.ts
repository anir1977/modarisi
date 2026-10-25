// French, 1st year bac — regional exam (all tracks). The three works of the programme plus exam methodology.
// Original summaries written for modarisi.ma (no passages reproduced).
import type { SciLesson } from "./types";

const TR = "1re année bac · examen régional · toutes les filières";

export const FR_LESSONS: SciLesson[] = [
  {
    slug: "le-dernier-jour-d-un-condamne",
    subject: "fr",
    order: 1,
    part: "Les œuvres",
    title: "Le Dernier Jour d'un condamné (Victor Hugo)",
    tracks: TR,
    intro: "Roman à thèse publié en 1829, dans lequel Victor Hugo dénonce la peine de mort à travers le journal intime d'un condamné anonyme qui attend son exécution.",
    sections: [
      {
        heading: "Présentation",
        body: `- **Auteur** : Victor Hugo (1802–1885), chef de file du romantisme français, engagé contre la peine de mort.
- **Genre** : roman à thèse, sous forme de journal intime (récit à la 1re personne).
- **Structure** : 49 chapitres de longueur inégale, de Bicêtre à la Conciergerie puis à l'Hôtel de Ville, où le récit s'interrompt juste avant l'exécution.`,
      },
      {
        heading: "Résumé",
        body: `- Le narrateur, condamné à mort, est d'abord enfermé à **Bicêtre**. Il décrit sa cellule, l'obsession de la mort (« condamné à mort ! ») et les souvenirs de sa vie passée.
- Il assiste au **ferrage des forçats** qui partent au bagne et comprend l'inhumanité du système.
- Transféré à la **Conciergerie**, il rencontre un autre condamné (le « friauche ») et rédige ses dernières pensées.
- Il reçoit la visite de sa **fille Marie**, qui ne le reconnaît pas : moment le plus douloureux.
- Il est conduit à l'**Hôtel de Ville** ; il demande sa grâce jusqu'au dernier moment. Le récit s'achève à quatre heures, l'heure de l'exécution.`,
      },
      {
        heading: "Thèmes et procédés",
        body: `- **Thèmes** : la peine de mort, la souffrance morale, le temps qui s'écoule, la solitude, la foule cruelle, l'injustice.
- **Anonymat** du condamné et de son crime : il représente tous les condamnés, ce qui universalise la thèse.
- **Procédés** : registre pathétique, monologue intérieur, phrases courtes et répétitions qui traduisent l'angoisse.`,
      },
    ],
    method: ["Dans une question de réflexion, appuyez-vous sur la thèse de Hugo : la peine de mort punit aussi les innocents (la famille, la fille Marie)."],
  },
  {
    slug: "antigone-anouilh",
    subject: "fr",
    order: 2,
    part: "Les œuvres",
    title: "Antigone (Jean Anouilh)",
    tracks: TR,
    intro: "Tragédie moderne jouée en 1944, Antigone réécrit le mythe grec de Sophocle : une jeune fille dit « non » au roi Créon pour enterrer son frère, au prix de sa vie.",
    sections: [
      {
        heading: "Présentation",
        body: `- **Auteur** : Jean Anouilh (1910–1987), dramaturge français.
- **Contexte** : écrite et jouée pendant l'Occupation allemande de la France ; elle a été lue comme une réflexion sur la résistance et le pouvoir.
- **Genre** : tragédie moderne, en un seul acte, sans découpage en scènes, introduite par le **Prologue** et commentée par le **Chœur**.`,
      },
      {
        heading: "Résumé",
        body: `- Après la mort d'Étéocle et Polynice, qui se sont entretués, **Créon**, roi de Thèbes, ordonne des funérailles pour Étéocle et interdit d'enterrer Polynice, sous peine de mort.
- **Antigone**, leur sœur, refuse cet ordre : elle tente à deux reprises de recouvrir le corps de son frère de terre et elle est arrêtée par les gardes.
- Une longue **confrontation** l'oppose à Créon, qui veut la sauver et lui révèle que ses frères étaient indignes. Antigone refuse le bonheur médiocre qu'il propose.
- Elle est emmurée vivante ; **Hémon**, son fiancé et fils de Créon, se tue près d'elle, puis **Eurydice**, la reine, se suicide. Créon reste seul face à son devoir.`,
      },
      {
        heading: "Personnages et thèmes",
        body: `- **Antigone** : idéaliste, intransigeante, elle incarne la révolte et la pureté.
- **Créon** : homme pragmatique, il incarne la raison d'État et la responsabilité du pouvoir.
- **Ismène** : sœur raisonnable et belle, qui a peur de mourir.
- **Thèmes** : le refus, la liberté, le devoir, le pouvoir, la mort, l'enfance perdue, le destin tragique.
- **Modernité** : anachronismes (cigarettes, voitures), langage familier, personnages humanisés.`,
      },
    ],
  },
  {
    slug: "il-etait-une-fois-un-vieux-couple-heureux",
    subject: "fr",
    order: 3,
    part: "Les œuvres",
    title: "Il était une fois un vieux couple heureux (Mohammed Khaïr-Eddine)",
    tracks: TR,
    intro: "Dernier roman de l'écrivain marocain Mohammed Khaïr-Eddine (publié en 2002), il raconte la vie paisible d'un vieux couple dans un village berbère du Sud marocain.",
    sections: [
      {
        heading: "Présentation",
        body: `- **Auteur** : Mohammed Khaïr-Eddine (1941–1995), né à Tafraout, écrivain marocain d'expression française.
- **Cadre** : un village de montagne du Souss, dans le Sud marocain, après l'indépendance.
- **Personnages** : le **Vieux** (Bouchaïb), homme cultivé qui a voyagé, et sa femme, la **Vieille**, qui partagent une vie simple et heureuse.`,
      },
      {
        heading: "Thèmes",
        body: `- Le **bonheur conjugal** fondé sur la tendresse, le respect et la complicité.
- La **tradition** et la vie rurale berbère : coutumes, solidarité, rapport à la nature et à la terre.
- La **modernité** qui transforme le village : exode rural, émigration, nouvelles habitudes.
- Le **temps**, la vieillesse et la mort, vécus avec sérénité.
- L'**écriture** et la mémoire : le Vieux écrit pour préserver la culture de sa région.`,
      },
      {
        heading: "Écriture",
        body: `- Récit apaisé, à la troisième personne, qui ressemble à un conte (« Il était une fois »).
- Descriptions précises des paysages et des gestes quotidiens, mots amazighs et arabes intégrés au texte.`,
      },
    ],
  },
  {
    slug: "methodologie-examen-regional",
    subject: "fr",
    order: 4,
    part: "Méthodologie",
    title: "Méthodologie de l'examen régional de français",
    tracks: TR,
    intro: "L'examen régional comporte une étude de texte (compréhension et langue) à partir d'un extrait d'une œuvre au programme, et une production écrite.",
    sections: [
      {
        heading: "Les questions de compréhension",
        body: `- **Situer le passage** : œuvre, auteur, genre, place de l'extrait dans l'œuvre (ce qui précède, ce qui suit).
- **Identifier** le narrateur, le point de vue, le registre (pathétique, tragique, comique, lyrique…).
- **Relever et interpréter** : chaque relevé (figure de style, champ lexical) doit être suivi de son effet de sens.
- **Figures de style** fréquentes : comparaison, métaphore, personnification, anaphore, antithèse, gradation, hyperbole.`,
      },
      {
        heading: "La production écrite",
        body: `- **Introduction** : amener le sujet, le poser (reformuler), annoncer le plan.
- **Développement** : 2 ou 3 paragraphes, chacun avec un argument, une explication et un exemple (tiré des œuvres ou de la vie).
- **Conclusion** : bilan et ouverture.
- Utilisez des **connecteurs logiques** : d'abord, ensuite, de plus, cependant, en effet, donc, enfin.`,
      },
    ],
    method: ["Gérez votre temps : environ 1 h pour l'étude de texte et 45 min pour la production écrite, puis 10 min de relecture (accords, conjugaison, ponctuation)."],
  },
];
