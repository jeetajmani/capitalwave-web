import type { MetadataRoute } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capitalwavestudio.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "",          priority: 1.0, changeFrequency: "weekly"  },
    { path: "/roster",   priority: 0.9, changeFrequency: "weekly"  },
    { path: "/events",   priority: 0.9, changeFrequency: "daily"   },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/book",     priority: 0.8, changeFrequency: "monthly" },
  ]
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
