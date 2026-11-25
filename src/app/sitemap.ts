import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexableDeployment, seoPages } from "@/lib/seo";
export default function sitemap():MetadataRoute.Sitemap {
 if(!isIndexableDeployment())return [];
 return Object.entries(seoPages).map(([path,page])=>({url:absoluteUrl(path),...("lastModified" in page?{lastModified:page.lastModified as string}:{})}));
}
