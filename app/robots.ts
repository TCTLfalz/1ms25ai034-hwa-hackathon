import type { MetadataRoute } from "next";

const BASE_URL = "https://1ms25ai034-hwa-hackathon.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
