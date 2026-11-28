import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { seoRouteData as pages, insightPosts } from "./seo-route-data.mjs";
import { studioContact } from "../src/lib/studioContact.ts";
const base=process.env.SEO_TEST_BASE_URL||"http://127.0.0.1:3107";
const preview=process.env.SEO_EXPECT_NOINDEX==="true";
const origin="https://alyoxa.com";
const decode=value=>value.replaceAll("&amp;","&").replaceAll("&#x27;", "'").replaceAll("&#39;", "'").replaceAll("&apos;", "'").replaceAll("&quot;",'"').replaceAll("&lt;","<").replaceAll("&gt;",">");
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map(match=>[match[1],decode(match[2])]));
const report={base,preview,pages:[],links:[],issues:[]};
const htmlByPath=new Map();
for(const [path,page] of Object.entries(pages)){
 const response=await fetch(new URL(path,base),{headers:{"User-Agent":"Googlebot"}});
 assert.equal(response.status,200,path);
 const html=await response.text();htmlByPath.set(path,html);
 const metadata=[...html.matchAll(/<meta\b[^>]*>/g)].map(match=>attrs(match[0]));
 const meta=name=>metadata.filter(item=>item.name===name||item.property===name).map(item=>item.content);
 const links=[...html.matchAll(/<link\b[^>]*>/g)].map(match=>attrs(match[0]));
 const canonicals=links.filter(link=>link.rel==="canonical");
 assert.equal(canonicals.length,1,`Canonical count: ${path}`);
 const canonical=new URL(path,origin).href;assert.equal(new URL(canonicals[0].href).href,canonical);
 const title=decode(html.match(/<title>([^<]*)<\/title>/)?.[1]||"");
 assert.equal(title,page.title,path);assert.deepEqual(meta("description"),[page.description]);
 assert.equal(new URL(meta("og:url")[0]).href,canonical);assert.deepEqual(meta("og:title"),[page.title]);assert.deepEqual(meta("og:description"),[page.description]);
 assert.deepEqual(meta("twitter:title"),[page.title]);assert.deepEqual(meta("twitter:description"),[page.description]);assert.deepEqual(meta("twitter:card"),["summary_large_image"]);
 assert.equal(meta("og:image")[0],origin+"/opengraph-image.png");assert(meta("twitter:image")[0]?.startsWith(origin));
 assert.equal(meta("robots").some(value=>value.includes("noindex")),preview,path);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`H1 count: ${path}`);
 assert(html.includes('<html lang="en"'),path);
 assert(!links.some(link=>link.hreflang),"No invented locale variants");
 const graphs=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter(match=>attrs(match[1]).type==="application/ld+json").map(match=>JSON.parse(match[2]));
 assert.equal(graphs.length,2,`Schema script count: ${path}`);
 const nodes=graphs.flatMap(graph=>{assert.equal(graph["@context"],"https://schema.org");return graph["@graph"]});
 assert.equal(nodes.filter(node=>node["@type"]==="Organization").length,1);
 assert.equal(nodes.filter(node=>node["@type"]==="WebSite").length,1);
 const organization=nodes.find(node=>node["@type"]==="Organization");
 assert.deepEqual(organization.sameAs,studioContact.socials.map(social=>social.href));assert.equal(organization.email,"hello@alyoxa.com");assert.equal(organization.address,undefined);assert.equal(organization.aggregateRating,undefined);
 assert.equal(new Set(nodes.map(node=>node["@id"])).size,nodes.length,"No duplicate entity IDs");
 assert(!nodes.some(node=>["Review","AggregateRating","LocalBusiness"].includes(node["@type"])),"No unverified reviews or offices");
 if(path!=="/"){const breadcrumb=nodes.find(node=>node["@type"]==="BreadcrumbList");assert.equal(breadcrumb.itemListElement.at(-1).item,canonical);}
 if(path==="/services")assert.equal(nodes.filter(node=>node["@type"]==="Service").length,4);
 if(path==="/work"){const concepts=nodes.filter(node=>node["@type"]==="CreativeWork");assert.equal(concepts.length,6);assert(concepts.every(node=>node.creativeWorkStatus==="Concept"&&node.name.includes("Concept")));for(const concept of concepts)assert(html.includes(`id="${new URL(concept.url).hash.slice(1)}"`));}
 if(path==="/insights"){
  const blog=nodes.find(node=>node["@type"]==="Blog");assert.equal(blog.blogPost.length,insightPosts.length);
 }
 if(path.startsWith("/insights/")){
  const post=insightPosts.find(post=>path===`/insights/${post.slug}`);assert(post,path);
  const article=nodes.find(node=>node["@type"]==="BlogPosting");assert(article,path);
  assert.equal(article.headline,post.title);assert.equal(article.author["@type"],"Organization");assert.equal(article.author.name,"ALYOXA");
  assert.equal(article.datePublished,`${post.date}T00:00:00+05:00`);assert.equal(article.dateModified,article.datePublished);
  assert.deepEqual(meta("og:type"),["article"]);assert.deepEqual(meta("article:published_time"),[article.datePublished]);
  assert(article.wordCount>=450,"Substantive editorial content");
  for(const section of post.sections){assert(html.includes(`id="${section.id}"`));for(const paragraph of section.paragraphs)assert(html.includes(paragraph.replaceAll("&","&amp;").replaceAll("'","&#x27;").replaceAll('"',"&quot;")),`SSR content missing: ${path}`);}
  assert.equal((html.match(/<table\b/g)||[]).length,post.sections.filter(section=>section.table).length);
  const breadcrumb=nodes.find(node=>node["@type"]==="BreadcrumbList");assert.equal(breadcrumb.itemListElement.length,3);assert.equal(breadcrumb.itemListElement[1].item,origin+"/insights");
 }
 const images=[...html.matchAll(/<img\b[^>]*>/g)].map(match=>attrs(match[0]));assert(images.every(image=>"alt" in image),path);
 const anchors=[...html.matchAll(/<a\b[^>]*>/g)].map(match=>attrs(match[0])).filter(anchor=>anchor.href?.startsWith("/")||anchor.href?.startsWith("#"));
 report.links.push(...anchors.map(anchor=>({source:path,href:anchor.href})));
 report.pages.push({path,status:response.status,title,descriptionLength:page.description.length,canonical,schemaTypes:nodes.map(node=>node["@type"]),images:images.length});
}
const expectedPaths=Object.keys(pages);
for(const path of expectedPaths.filter(path=>path!=="/"))assert(report.links.some(link=>new URL(link.href,new URL(link.source,base)).pathname===path),`Orphan page: ${path}`);
for(const link of report.links){const url=new URL(link.href,new URL(link.source,base));assert(pages[url.pathname],`Unknown internal link: ${link.source} -> ${link.href}`);if(url.hash){const target=htmlByPath.get(url.pathname);assert(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Missing anchor: ${link.href}`);}}
const sitemapResponse=await fetch(base+"/sitemap.xml");assert.equal(sitemapResponse.status,200);const sitemap=await sitemapResponse.text();const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>decode(match[1]));assert.deepEqual(urls,preview?[]:expectedPaths.map(path=>new URL(path,origin).href));
const robots=await(await fetch(base+"/robots.txt")).text();assert(robots.includes("User-Agent: *")&&robots.includes("Disallow: /api/"));assert(!robots.includes("Disallow: /\n"));if(!preview)assert(robots.includes(origin+"/sitemap.xml"));
const missing=await fetch(base+"/not-a-real-alyoxa-route");assert.equal(missing.status,404);assert((await missing.text()).includes('content="noindex'));
const missingArticle=await fetch(base+"/insights/not-a-real-article");assert.equal(missingArticle.status,404);assert((await missingArticle.text()).includes('content="noindex'));
const legacy=await fetch(base+"/Home",{redirect:"manual"});assert.equal(legacy.status,308);
const api=await fetch(base+"/api/project-inquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"});assert.equal(api.status,400);assert(api.headers.get("x-robots-tag")?.includes("noindex"));
const image=await fetch(base+"/opengraph-image.png");assert.equal(image.status,200);assert(image.headers.get("content-type")?.startsWith("image/png"));
const output=process.env.SEO_REPORT_PATH;if(output)await writeFile(output,JSON.stringify(report,null,2));
console.log(`PASS ${report.pages.length} public pages: metadata, canonical URLs, social tags, schema, headings, internal links, sitemap, robots, 404, redirect, API noindex, social image. No submission or verification performed.`);


