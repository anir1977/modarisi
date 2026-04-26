import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/lessons", "/exercises", "/exam-simulator", "/leaderboard", "/pricing", "/faq", "/contact", "/privacy"],
        disallow: ["/dashboard/", "/api/", "/auth/", "/admin-dashboard/"],
      },
    ],
    sitemap: "https://modarisi.ma/sitemap.xml",
  };
}
