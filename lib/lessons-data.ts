// ─────────────────────────────────────────────────────────────────────────────
// REAL YouTube playlist IDs from verified Moroccan teacher channels
// To add more: go to youtube.com, open the playlist → copy the list= ID from URL
// ─────────────────────────────────────────────────────────────────────────────

export type Level = "1ere" | "2eme" | "3eme";
export type SubjectSlug = "maths" | "physique" | "svt" | "arabe" | "francais" | "social";

export interface Playlist {
  id: string;           // YouTube playlist ID (list=XXXX)
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
      "1ere": {
        playlists: [
          {
            id: "PL3SpMD16rxfQn0tt9LVcYd17lM8w7i8ne",
            title: "دروس وتمارين الرياضيات — السنة الأولى والثانية إعدادي",
            channelName: "9ismi.ma",
            channelUrl: "https://www.youtube.com/@9ismi",
            videoCount: 80,
          },
        ],
      },
      "2eme": {
        playlists: [
          {
            id: "PL3SpMD16rxfQn0tt9LVcYd17lM8w7i8ne",
            title: "دروس وتمارين الرياضيات — السنة الأولى والثانية إعدادي",
            channelName: "9ismi.ma",
            channelUrl: "https://www.youtube.com/@9ismi",
            videoCount: 80,
          },
        ],
      },
      "3eme": {
        playlists: [
          {
            id: "PLWr9k1_tKWQuELgsAN_A0gJIwUNa0QpMQ",
            title: "دروس الرياضيات السنة الثالثة إعدادي — الدورة الأولى",
            channelName: "9ismi.ma",
            channelUrl: "https://www.youtube.com/@9ismi",
            videoCount: 35,
          },
          {
            id: "PLL_XaLkREMoN7OByDuwutI0pTgVOCT-RW",
            title: "الامتحانات الجهوية — الثالثة إعدادي BIOF رياضيات",
            channelName: "Youssef Nejjari",
            channelUrl: "https://www.youtube.com/user/youssefne",
            videoCount: 20,
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
      "1ere": {
        playlists: [
          {
            id: "PLhqXDSnWxH9ZteWYYzhZqiX1rq6tPqlEx",
            title: "دروس وتمارين الفيزياء والكيمياء — السنة الأولى إعدادي",
            channelName: "9ismi.ma",
            channelUrl: "https://www.youtube.com/@9ismi",
            videoCount: 35,
          },
        ],
      },
      "2eme": {
        playlists: [
          {
            id: "PL2vjeVrpUqp486Zijua6GWzBl0mX275Lt",
            title: "فيزياء والكيمياء — السنة الثانية إعدادي 2AC",
            channelName: "قناة فيزياء إعدادي",
            channelUrl: "https://www.youtube.com/playlist?list=PL2vjeVrpUqp486Zijua6GWzBl0mX275Lt",
            videoCount: 30,
          },
        ],
      },
      "3eme": {
        playlists: [
          {
            id: "PL9FmkapGIVLbKYpULitq-axuiP9VLYCjH",
            title: "دروس الفيزياء للثالثة إعدادي — الدورة الأولى",
            channelName: "9ismi.ma",
            channelUrl: "https://www.youtube.com/@9ismi",
            videoCount: 30,
          },
          {
            id: "PLhqXDSnWxH9aa1EF7KnYcI0kdmW2lx3EV",
            title: "دروس الفيزياء والكيمياء — الثالثة إعدادي (شامل)",
            channelName: "9ismi.ma",
            channelUrl: "https://www.youtube.com/@9ismi",
            videoCount: 40,
          },
          {
            id: "PL9YHR6B20hF442tt5ZoTW5_YlIPooR7Up",
            title: "فيزياء وكيمياء الثالثة إعدادي — دروس مفصلة",
            channelName: "9ismi.ma",
            channelUrl: "https://www.youtube.com/@9ismi",
            videoCount: 25,
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
      "1ere": {
        playlists: [
          {
            id: "PLH5HhyYSCZaKsheME1gn6dLE37VukwVXN",
            title: "علوم الحياة والأرض SVT — الثالثة إعدادي (مرجع للأولى)",
            channelName: "قناة SVT إعدادي",
            channelUrl: "https://www.youtube.com/playlist?list=PLH5HhyYSCZaKsheME1gn6dLE37VukwVXN",
            videoCount: 30,
          },
        ],
      },
      "2eme": {
        playlists: [
          {
            id: "PLH5HhyYSCZaKsheME1gn6dLE37VukwVXN",
            title: "علوم الحياة والأرض SVT — دروس شاملة",
            channelName: "قناة SVT إعدادي",
            channelUrl: "https://www.youtube.com/playlist?list=PLH5HhyYSCZaKsheME1gn6dLE37VukwVXN",
            videoCount: 30,
          },
        ],
      },
      "3eme": {
        playlists: [
          {
            id: "PLH5HhyYSCZaKsheME1gn6dLE37VukwVXN",
            title: "علوم الحياة والأرض SVT | الثالثة إعدادي",
            channelName: "قناة SVT إعدادي",
            channelUrl: "https://www.youtube.com/playlist?list=PLH5HhyYSCZaKsheME1gn6dLE37VukwVXN",
            videoCount: 30,
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
