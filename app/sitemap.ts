import type { MetadataRoute } from "next";

const BASE_URL = "https://1ms25ai034-hwa-hackathon.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
