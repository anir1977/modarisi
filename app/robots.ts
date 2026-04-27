import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/lessons", "/exercises", "/exam-simulator", "/leaderboard", "/pricing", "/about", "/sources", "/faq", "/contact", "/terms", "/privacy"],
        disallow: ["/dashboard/", "/api/", "/auth/", "/admin-dashboard/"],
      },
    ],
    sitemap: "https://modarisi.ma/sitemap.xml",
  };
}
