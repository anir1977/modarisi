import { NextResponse } from "next/server";

const WP_API = "https://moutamadris.ma/wp-json/wp/v2";

// Keyword → our matiere id
const SUBJECT_SEARCH: Record<string, string[]> = {
  maths:    ["mathematiques", "maths", "رياضيات"],
  pc:       ["physique", "chimie", "physique-chimie"],
  svt:      ["svt", "sciences", "vie terre", "علوم"],
  francais: ["francais", "français", "langue française"],
  arabe:    ["arabe", "عربية", "لغة عربية"],
  hg:       ["histoire", "geographie", "histoire-geographie", "تاريخ"],
  islam:    ["islam", "islamique", "تربية إسلامية"],
};

// Niveau → search keywords
const LEVEL_SEARCH: Record<string, string[]> = {
  "1ere": ["1ere college", "premiere annee", "1ère", "السنة الأولى"],
  "2eme": ["2eme college", "deuxieme annee", "2ème", "السنة الثانية"],
  "3eme": ["3eme college", "troisieme annee", "3ème", "السنة الثالثة"],
};

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const niveau   = searchParams.get("niveau")  || "1ere";
  const matiere  = searchParams.get("matiere") || "";
  const page     = Math.max(1, parseInt(searchParams.get("page") || "1"));

  try {
    const levelTerms   = LEVEL_SEARCH[niveau]  ?? ["college"];
    const subjectTerms = matiere && SUBJECT_SEARCH[matiere] ? SUBJECT_SEARCH[matiere] : [];

    // Build a focused search term: prefer the combo when a subject is selected
    const primaryLevel   = levelTerms[0];
    const primarySubject = subjectTerms[0] ?? "";
    const searchTerm = primarySubject
      ? `${primarySubject} ${primaryLevel}`
      : primaryLevel;

    const url = new URL(`${WP_API}/posts`);
    url.searchParams.set("search",   searchTerm);
    url.searchParams.set("per_page", "18");
    url.searchParams.set("page",     String(page));
    url.searchParams.set("_fields",  "id,title,link,excerpt,date,slug");

    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "Modarisi Educational Platform/1.0" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { courses: [], totalPages: 0, total: 0, error: `Upstream ${res.status}` },
        { status: 200 },
      );
    }

    const posts = await res.json() as Array<{
      id: number;
      title: { rendered: string };
      excerpt: { rendered: string };
      link: string;
      date: string;
      slug: string;
    }>;

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);
    const total      = parseInt(res.headers.get("X-WP-Total")      ?? "0", 10);

    const strip = (html: string) =>
      html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/g, " ").trim();

    const courses = posts.map((post) => ({
      id:      post.id,
      title:   strip(post.title.rendered),
      excerpt: strip(post.excerpt.rendered).slice(0, 160),
      link:    post.link,
      slug:    post.slug,
      date:    post.date,
    }));

    return NextResponse.json({ courses, totalPages, total });
  } catch (err) {
    console.error("[moutamadris]", err);
    return NextResponse.json({ courses: [], totalPages: 0, total: 0, error: "fetch_failed" });
  }
}
