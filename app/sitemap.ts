import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://modarisi.ma";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/lessons`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/exercises`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/exam-simulator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/leaderboard`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
