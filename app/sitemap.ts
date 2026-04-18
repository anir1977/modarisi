import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://modarisi.ma";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/cours`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tashih`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/chat`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/auth/login`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/auth/register`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
