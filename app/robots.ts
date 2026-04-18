import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/cours", "/tashih", "/chat", "/pricing", "/faq", "/contact", "/privacy"],
        disallow: ["/dashboard/", "/api/", "/auth/", "/admin-dashboard/"],
      },
    ],
    sitemap: "https://modarisi.ma/sitemap.xml",
  };
}
