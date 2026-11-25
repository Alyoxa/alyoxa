import type { Metadata } from "next";
import pages from "./seo-pages.json";
import { studioContact } from "./studioContact";
import { insights, insightPath } from "./insights";
export type PublicPath = keyof typeof pages | `/insights/${string}`;
type SeoPage = { name: string; title: string; description: string; type: string; lastModified?: string };
export const seoPages: Record<string, SeoPage> = {
 ...pages,
 ...Object.fromEntries(insights.map(post => [insightPath(post.slug), {
  name: post.title, title: post.seoTitle, description: post.description,
  type: "WebPage", lastModified: post.date,
 }])),
};
export const siteUrl = studioContact.website;
export const absoluteUrl = (path:string) => new URL(path, `${siteUrl}/`).href;
export const isIndexableDeployment = () => process.env.SEO_INDEXING_DISABLED !== "true" && (!process.env.CONTEXT || process.env.CONTEXT === "production");
export const socialImage = {url:absoluteUrl("/opengraph-image.png"),width:1734,height:907,alt:"ALYOXA creative technology studio: web design, development, brand systems, and digital experiences",type:"image/png"};
export function pageMetadata(path:PublicPath):Metadata {
 const page=seoPages[path];
 if (!page) throw new Error(`Unknown SEO route: ${path}`);
 const post = insights.find(item => insightPath(item.slug) === path);
 return {
  title:{absolute:page.title},description:page.description,
  alternates:{canonical:absoluteUrl(path)},
  robots:{index:isIndexableDeployment(),follow:true,googleBot:{index:isIndexableDeployment(),follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
  openGraph:{type:post?"article":"website",siteName:"ALYOXA",locale:"en_GB",url:absoluteUrl(path),title:page.title,description:page.description,images:[socialImage],...(post?{publishedTime:`${post.date}T00:00:00+05:00`,modifiedTime:`${post.date}T00:00:00+05:00`,authors:[absoluteUrl("/about")],section:post.category}:{})},
  twitter:{card:"summary_large_image",title:page.title,description:page.description,images:[{url:socialImage.url,alt:socialImage.alt}]},
 };
}
