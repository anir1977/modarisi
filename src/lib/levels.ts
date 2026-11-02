// All Moroccan school levels. A level only links somewhere once it has real lessons:
// empty level pages would be thin content for Google and AdSense.
export type Level = {
  id: string;
  name: string;
  href?: string;
  note?: string;
};

export type Cycle = {
  id: string;
  name: string;
  about: string;
  levels: Level[];
};

export const CYCLES: Cycle[] = [
  {
    id: "lycee",
    name: "الثانوي التأهيلي",
    about: "الجذع المشترك والباكالوريا، مع الامتحانات الجهوية والوطنية.",
    levels: [
      { id: "2bac", name: "الثانية باكالوريا", href: "/dourous", note: "دروس وامتحانات مصححة" },
      { id: "1bac", name: "الأولى باكالوريا", href: "/dourous/francais-1bac", note: "الفرنسية للامتحان الجهوي" },
      { id: "tc", name: "الجذع المشترك" },
    ],
  },
  {
    id: "college",
    name: "الثانوي الإعدادي",
    about: "من الأولى إعدادي إلى الامتحان الجهوي للثالثة إعدادي.",
    levels: [
      { id: "3ac", name: "الثالثة إعدادي" },
      { id: "2ac", name: "الثانية إعدادي" },
      { id: "1ac", name: "الأولى إعدادي" },
    ],
  },
  {
    id: "primaire",
    name: "الابتدائي",
    about: "من الأولى إلى السادسة ابتدائي.",
    levels: [
      { id: "6ap", name: "السادسة ابتدائي" },
      { id: "5ap", name: "الخامسة ابتدائي" },
      { id: "4ap", name: "الرابعة ابتدائي" },
      { id: "3ap", name: "الثالثة ابتدائي" },
      { id: "2ap", name: "الثانية ابتدائي" },
      { id: "1ap", name: "الأولى ابتدائي" },
    ],
  },
];
