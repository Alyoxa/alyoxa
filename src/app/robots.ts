import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexableDeployment } from "@/lib/seo";
export default function robots():MetadataRoute.Robots {
 return {rules:{userAgent:"*",allow:"/",disallow:"/api/"},...(isIndexableDeployment()?{sitemap:absoluteUrl("/sitemap.xml")}:{})};
}
