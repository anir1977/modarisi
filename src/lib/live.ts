export type Teacher = {
  id: string;
  slug: string;
  full_name: string;
  subjects: string[];
  levels: string[];
  city: string | null;
  bio: string | null;
  created_at: string;
};

export type LiveSession = {
  id: string;
  teacher_id: string;
  title: string;
  subject: string;
  level: string;
  description: string | null;
  starts_at: string;
  duration_min: number;
  room: string;
  teachers?: Pick<Teacher, "slug" | "full_name"> | null;
};

export const LIVE_SUBJECTS = [
  "الرياضيات",
  "الفيزياء والكيمياء",
  "علوم الحياة والأرض",
  "الفلسفة",
  "التاريخ والجغرافيا",
  "اللغة العربية",
  "اللغة الفرنسية",
  "اللغة الإنجليزية",
  "التربية الإسلامية",
  "الاقتصاد والمحاسبة",
  "علوم المهندس",
];

export const LIVE_LEVELS = ["الثانية باكالوريا", "الأولى باكالوريا", "الجذع المشترك", "الإعدادي"];

export const jitsiUrl = (room: string) => `https://meet.jit.si/${room}`;

export const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("ar-MA", {
    timeZone: "Africa/Casablanca",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

/** "soon" opens 15 minutes before the start. */
export function sessionState(s: Pick<LiveSession, "starts_at" | "duration_min">, now = Date.now()) {
  const start = new Date(s.starts_at).getTime();
  const end = start + s.duration_min * 60_000;
  if (now > end) return "ended" as const;
  if (now >= start) return "live" as const;
  if (now >= start - 15 * 60_000) return "soon" as const;
  return "upcoming" as const;
}

export const slugify = (name: string) => {
  const base = name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const rand = Math.random().toString(36).slice(2, 7);
  return `${base.length >= 3 ? base : "ostad"}-${rand}`;
};
