// ─────────────────────────────────────────────────────────────────────────────
// REAL YouTube playlist IDs from verified Moroccan teacher channels
// To add more: go to youtube.com, open the playlist → copy the list= ID from URL
// ─────────────────────────────────────────────────────────────────────────────

export type Level = "1ere" | "2eme" | "3eme";
export type SubjectSlug = "maths" | "physique" | "svt" | "arabe" | "francais" | "social";

export interface Playlist {
  id: string;           // YouTube playlist ID (list=XXXX) or video ID
  type?: "playlist" | "video";
  title: string;        // Chapter / topic title in Arabic
  channelName: string;  // Teacher/channel display name
  channelUrl: string;   // YouTube channel URL
  videoCount?: number;  // approx number of videos
}

export interface SubjectLevel {
  playlists: Playlist[];
}

export interface Subject {
  slug: SubjectSlug;
  name: string;
  emoji: string;
  color: string;        // Tailwind bg class
  borderColor: string;
  badgeColor: string;
  levels: Partial<Record<Level, SubjectLevel>>;
}

// ─────────────────────────────────────────────────────────────────────────────
export const SUBJECTS: Subject[] = [

  // ── الرياضيات ─────────────────────────────────────────────────────────────
  {
    slug: "maths",
    name: "الرياضيات",
    emoji: "🔢",
    color: "bg-blue-50",
    borderColor: "border-blue-200",
    badgeColor: "bg-blue-600",
    levels: {
      "3eme": {
        playlists: [
          {
            id: "FkcXXbo8ZQY",
            type: "video",
            title: "مراجعة جميع دروس الرياضيات — الامتحان الموحد المحلي",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=FkcXXbo8ZQY",
            videoCount: 1,
          },
          {
            id: "hd3okab1bNw",
            type: "video",
            title: "ملخصات جميع دروس الرياضيات — الدورة الثانية",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=hd3okab1bNw",
            videoCount: 1,
          },
        ],
      },
    },
  },

  // ── الفيزياء والكيمياء ────────────────────────────────────────────────────
  {
    slug: "physique",
    name: "الفيزياء والكيمياء",
    emoji: "⚗️",
    color: "bg-purple-50",
    borderColor: "border-purple-200",
    badgeColor: "bg-purple-600",
    levels: {
      "3eme": {
        playlists: [
          {
            id: "x78fVFilzig",
            type: "video",
            title: "ملخصات جميع دروس الفيزياء والكيمياء — الدورة الثانية",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=x78fVFilzig",
            videoCount: 1,
          },
          {
            id: "x-1-WnI69Mk",
            type: "video",
            title: "مراجعة شاملة وتصحيح فرض في الفيزياء والكيمياء",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=x-1-WnI69Mk",
            videoCount: 1,
          },
        ],
      },
    },
  },

  // ── علوم الحياة والأرض ────────────────────────────────────────────────────
  {
    slug: "svt",
    name: "علوم الحياة والأرض",
    emoji: "🌱",
    color: "bg-emerald-50",
    borderColor: "border-emerald-200",
    badgeColor: "bg-emerald-600",
    levels: {
      "3eme": {
        playlists: [
          {
            id: "ONWND7tGKq0",
            type: "video",
            title: "ملخصات جميع دروس علوم الحياة والأرض — SVT",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=ONWND7tGKq0",
            videoCount: 1,
          },
        ],
      },
    },
  },

  // ── اللغة العربية ────────────────────────────────────────────────────────
  {
    slug: "arabe",
    name: "اللغة العربية",
    emoji: "📖",
    color: "bg-amber-50",
    borderColor: "border-amber-200",
    badgeColor: "bg-amber-600",
    levels: {
      "3eme": {
        playlists: [
          {
            id: "NsRZJkqpl1Y",
            type: "video",
            title: "ملخص اللغة العربية الثالثة إعدادي حسب الإطار المرجعي",
            channelName: "العلم النافع ببساطة",
            channelUrl: "https://www.youtube.com/watch?v=NsRZJkqpl1Y",
            videoCount: 1,
          },
        ],
      },
    },
  },

  // ── اللغة الفرنسية ───────────────────────────────────────────────────────
  {
    slug: "francais",
    name: "اللغة الفرنسية",
    emoji: "🇫🇷",
    color: "bg-rose-50",
    borderColor: "border-rose-200",
    badgeColor: "bg-rose-600",
    levels: {
      "3eme": {
        playlists: [
          {
            id: "z1m9b7YVoUo",
            type: "video",
            title: "ملخصات جميع دروس اللغة الفرنسية — الدورة الثانية",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=z1m9b7YVoUo",
            videoCount: 1,
          },
          {
            id: "JPTwfVCdcBw",
            type: "video",
            title: "ملخصات دروس اللغة الفرنسية — الدورة الثانية",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=JPTwfVCdcBw",
            videoCount: 1,
          },
        ],
      },
    },
  },

  // ── الاجتماعيات ──────────────────────────────────────────────────────────
  {
    slug: "social",
    name: "الاجتماعيات",
    emoji: "🌍",
    color: "bg-sky-50",
    borderColor: "border-sky-200",
    badgeColor: "bg-sky-600",
    levels: {
      "3eme": {
        playlists: [
          {
            id: "p0kv1N0pM4E",
            type: "video",
            title: "ملخصات جميع دروس الاجتماعيات — شامل",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=p0kv1N0pM4E",
            videoCount: 1,
          },
          {
            id: "3uKq-NR3V0M",
            type: "video",
            title: "ملخصات دروس الاجتماعيات — الجغرافيا",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=3uKq-NR3V0M",
            videoCount: 1,
          },
          {
            id: "peRCR9M5sqo",
            type: "video",
            title: "ملخصات دروس الاجتماعيات — التربية على المواطنة",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=peRCR9M5sqo",
            videoCount: 1,
          },
          {
            id: "shStICuZxbQ",
            type: "video",
            title: "ملخصات دروس الاجتماعيات — التاريخ للسنة الثالثة إعدادي",
            channelName: "Learn With Amso",
            channelUrl: "https://www.youtube.com/watch?v=shStICuZxbQ",
            videoCount: 1,
          },
        ],
      },
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export const LEVEL_LABELS: Record<Level, string> = {
  "1ere": "السنة الأولى إعدادي",
  "2eme": "السنة الثانية إعدادي",
  "3eme": "السنة الثالثة إعدادي",
};

export const LEVEL_SHORT: Record<Level, string> = {
  "1ere": "1ère",
  "2eme": "2ème",
  "3eme": "3ème",
};

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}
