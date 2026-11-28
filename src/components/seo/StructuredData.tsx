import { absoluteUrl, seoPages, siteUrl, type PublicPath } from "@/lib/seo";
import { studioContact } from "@/lib/studioContact";
import { serviceDisciplines } from "@/lib/serviceDisciplines";
import { workProjects } from "@/app/work/projects";
import { insights, insightPath, insightWordCount } from "@/lib/insights";
import { markets } from "@/lib/markets";
const areaServed=markets.map(market=>({"@type":"Country",name:market.country}));
const knowsAbout=["Web design","Website development","Brand identity","Creative technology","Interactive websites","3D web experiences","UX design","Product design","Next.js development"];
const organizationId=absoluteUrl("/#organization");
const websiteId=absoluteUrl("/#website");
function JsonLd({id,graph}:{id:string;graph:Record<string,unknown>[]}) {
 return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@graph":graph}).replace(/</g,"\\u003c")}}/>;
}
export function SiteStructuredData(){return <JsonLd id="alyoxa-entity-schema" graph={[
 {"@type":"Organization","@id":organizationId,name:"ALYOXA",url:siteUrl,knowsAbout,slogan:"Creative technology studio",description:seoPages["/"].description,logo:{"@type":"ImageObject",url:absoluteUrl("/images/logo-icon.svg")},email:studioContact.email,sameAs:studioContact.socials.map(social=>social.href),contactPoint:[studioContact.uk,studioContact.pk].map(contact=>({"@type":"ContactPoint",contactType:"Project enquiries via WhatsApp",telephone:contact.display.replace(/ /g,""),url:contact.href,email:studioContact.email,availableLanguage:["English"]})),areaServed},
 {"@type":"WebSite","@id":websiteId,url:siteUrl,name:"ALYOXA",description:seoPages["/"].description,inLanguage:"en",publisher:{"@id":organizationId}},
 ]}/>;}
export function PageStructuredData({path}:{path:PublicPath}){
 const page=seoPages[path],url=absoluteUrl(path),pageId=`${url}#webpage`;
 const graph:Record<string,unknown>[]=[{"@type":page.type,"@id":pageId,url,name:page.title,description:page.description,inLanguage:"en",isPartOf:{"@id":websiteId},about:{"@id":organizationId},publisher:{"@id":organizationId}}];
 if(path!=="/"){
  const breadcrumbId=`${url}#breadcrumb`;
  graph[0].breadcrumb={"@id":breadcrumbId};
  const isArticle=path.startsWith("/insights/");
  graph.push({"@type":"BreadcrumbList","@id":breadcrumbId,itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:siteUrl},...(isArticle?[{"@type":"ListItem",position:2,name:"Insights",item:absoluteUrl("/insights")}]:[]),{"@type":"ListItem",position:isArticle?3:2,name:page.name,item:url}]});
 }
 if(path==="/services"){
  const services=serviceDisciplines.map(service=>({"@type":"Service","@id":`${url}#${service.id}`,name:service.title,serviceType:service.title,url:`${url}#${service.id}`,description:service.description,provider:{"@id":organizationId},areaServed}));
  graph.push(...services,{"@type":"ItemList","@id":`${url}#disciplines`,name:"ALYOXA services",itemListElement:services.map((service,index)=>({"@type":"ListItem",position:index+1,item:{"@id":service["@id"]}}))});
  graph[0].mainEntity={"@id":`${url}#disciplines`};
 }
 if(path==="/work"){
  const concepts=workProjects.map(project=>({"@type":"CreativeWork","@id":`${url}#concept-${project.id}`,url:`${url}#concept-${project.id}`,name:`${project.name} - Concept project`,genre:"Illustrative concept exploration",creativeWorkStatus:"Concept",image:absoluteUrl(project.image),creator:{"@id":organizationId},isPartOf:{"@id":pageId}}));
  graph.push(...concepts,{"@type":"ItemList","@id":`${url}#portfolio`,name:"ALYOXA concept portfolio",itemListElement:concepts.map((concept,index)=>({"@type":"ListItem",position:index+1,item:{"@id":concept["@id"]}}))});
  graph[0].mainEntity={"@id":`${url}#portfolio`};
 }
 if(path==="/insights"){
  graph.push({"@type":"Blog","@id":`${url}#journal`,name:"ALYOXA Insights",url,description:page.description,publisher:{"@id":organizationId},blogPost:insights.map(post=>({"@id":`${absoluteUrl(insightPath(post.slug))}#article`}))});
  graph[0].mainEntity={"@id":`${url}#journal`};
 }
 const market=markets.find(item=>item.path===path);
 if(market){
  graph[0].inLanguage=market.lang;
  graph.push({"@type":"Service","@id":`${url}#service`,name:market.name,serviceType:"Web design and branding",description:market.description,provider:{"@id":organizationId},areaServed:{"@type":"Country",name:market.country},availableLanguage:market.lang});
 }
 const faqs=market?.faqs??insights.find(item=>insightPath(item.slug)===path)?.questions;
 if(faqs?.length)graph.push({"@type":"FAQPage","@id":`${url}#faq`,inLanguage:market?.lang??"en",mainEntity:faqs.map(faq=>({"@type":"Question",name:faq.question,acceptedAnswer:{"@type":"Answer",text:faq.answer}}))});
 const post=insights.find(item=>insightPath(item.slug)===path);
 if(post){
  const articleId=`${url}#article`;
  graph[0].mainEntity={"@id":articleId};
  graph.push({"@type":"BlogPosting","@id":articleId,url,headline:post.title,description:post.description,datePublished:`${post.date}T00:00:00+05:00`,dateModified:`${post.date}T00:00:00+05:00`,inLanguage:"en",articleSection:post.category,wordCount:insightWordCount(post),author:{"@type":"Organization","@id":organizationId,name:"ALYOXA",url:absoluteUrl("/about")},publisher:{"@id":organizationId},mainEntityOfPage:{"@id":pageId},isPartOf:{"@type":"Blog","@id":`${absoluteUrl("/insights")}#journal`,name:"ALYOXA Insights",url:absoluteUrl("/insights")},image:absoluteUrl("/opengraph-image.png")});
 }
 return <JsonLd id="alyoxa-page-schema" graph={graph}/>;
}
