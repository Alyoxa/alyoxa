import { readFile } from "node:fs/promises";
const pages=JSON.parse(await readFile(new URL("../src/lib/seo-pages.json",import.meta.url),"utf8"));
const host="alyoxa.com",origin=`https://${host}`;
const urls=Object.keys(pages).map(path=>new URL(path,origin).href);
if(!process.argv.includes("--submit")){
 console.log(JSON.stringify({mode:"dry-run",host,urls,submitted:false},null,2));
 console.log("No URLs were submitted. After approval and production deployment, configure INDEXNOW_KEY, publish /<key>.txt, then rerun with --submit.");
}else{
 const key=process.env.INDEXNOW_KEY?.trim();
 if(!key||!/^[A-Za-z0-9-]{8,128}$/.test(key))throw new Error("Set the owner's valid INDEXNOW_KEY before submitting.");
 const keyLocation=`${origin}/${key}.txt`;
 const verification=await fetch(keyLocation,{redirect:"error"});
 if(!verification.ok||(await verification.text()).trim()!==key)throw new Error("The production ownership file does not match INDEXNOW_KEY. Nothing submitted.");
 for(const url of urls){
  const response=await fetch(url,{redirect:"manual"});
  if(response.status!==200)throw new Error(`Production URL is not indexable (${response.status}): ${url}. Nothing submitted.`);
  if((response.headers.get("x-robots-tag")||"").includes("noindex"))throw new Error(`Production URL has noindex: ${url}. Nothing submitted.`);
  const html=await response.text();
  if(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html))throw new Error(`Production page has noindex: ${url}. Nothing submitted.`);
 }
 const response=await fetch("https://api.indexnow.org/indexnow",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({host,key,keyLocation,urlList:urls}),signal:AbortSignal.timeout(20000)});
 if(![200,202].includes(response.status))throw new Error(`IndexNow returned HTTP ${response.status}. Submission not confirmed.`);
 console.log(`IndexNow accepted the notification for ${urls.length} URLs (HTTP ${response.status}). This does not guarantee indexing.`);
}
