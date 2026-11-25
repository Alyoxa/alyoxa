import type { Metadata } from "next";
import pages from "./seo-pages.json";
import { studioContact } from "./studioContact";
export type PublicPath = keyof typeof pages;
export const seoPages = pages;
export const siteUrl = studioContact.website;
export const absoluteUrl = (path:string) => new URL(path, `${siteUrl}/`).href;
export const isIndexableDeployment = () => process.env.SEO_INDEXING_DISABLED !== "true" && (!process.env.CONTEXT || process.env.CONTEXT === "production");
export const socialImage = {url:absoluteUrl("/opengraph-image.png"),width:1734,height:907,alt:"ALYOXA creative technology studio: web design, development, brand systems, and digital experiences",type:"image/png"};
export function pageMetadata(path:PublicPath):Metadata {
 const page=pages[path];
 return {
  title:{absolute:page.title},description:page.description,
  alternates:{canonical:absoluteUrl(path)},
  robots:{index:isIndexableDeployment(),follow:true,googleBot:{index:isIndexableDeployment(),follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
  openGraph:{type:"website",siteName:"ALYOXA",locale:"en_GB",url:absoluteUrl(path),title:page.title,description:page.description,images:[socialImage]},
  twitter:{card:"summary_large_image",title:page.title,description:page.description,images:[{url:socialImage.url,alt:socialImage.alt}]},
 };
}
