import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
        crawlDelay: 1,
      },
    ],
    sitemap: "https://dentalpraxis-luisenplatz.de/sitemap.xml",
    host: "https://dentalpraxis-luisenplatz.de",
  };
}
