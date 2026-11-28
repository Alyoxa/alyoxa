import { readFile } from "node:fs/promises";
import { markets } from "../src/lib/markets.ts";

export const insightPosts = JSON.parse(await readFile(new URL("../src/content/insights/posts.json", import.meta.url), "utf8"));
const corePages = JSON.parse(await readFile(new URL("../src/lib/seo-pages.json", import.meta.url), "utf8"));
export const seoRouteData = {
  ...corePages,
  ...Object.fromEntries(insightPosts.map(post => [`/insights/${post.slug}`, {
    name: post.title, title: post.seoTitle, description: post.description,
    type: "WebPage", lastModified: post.date,
  }])),
  ...Object.fromEntries(markets.map(market => [market.path, { name: market.name, title: market.title, description: market.description, type: "WebPage" }])),
};
