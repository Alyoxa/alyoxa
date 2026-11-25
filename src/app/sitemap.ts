import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap {
 return ["/","/work","/services","/approach","/about","/contact","/privacy-policy","/terms-and-conditions"].map(path=>({url:`https://alyoxa.com${path==="/"?"":path}`,lastModified:new Date(),changeFrequency:path.includes("policy")||path.includes("conditions")?"yearly" as const:"monthly" as const,priority:path==="/"?1:.7}));
}
