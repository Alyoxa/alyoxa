import { absoluteUrl, seoPages, siteUrl, type PublicPath } from "@/lib/seo";
import { studioContact } from "@/lib/studioContact";
import { serviceDisciplines } from "@/lib/serviceDisciplines";
import { workProjects } from "@/app/work/projects";
const organizationId=absoluteUrl("/#organization");
const websiteId=absoluteUrl("/#website");
function JsonLd({id,graph}:{id:string;graph:Record<string,unknown>[]}) {
 return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@graph":graph}).replace(/</g,"\\u003c")}}/>;
}
export function SiteStructuredData(){return <JsonLd id="alyoxa-entity-schema" graph={[
 {"@type":"Organization","@id":organizationId,name:"ALYOXA",url:siteUrl,description:seoPages["/"].description,logo:{"@type":"ImageObject",url:absoluteUrl("/images/logo-icon.svg")},email:studioContact.email,sameAs:[studioContact.instagram],contactPoint:[studioContact.uk,studioContact.pk].map(contact=>({"@type":"ContactPoint",contactType:"Project enquiries via WhatsApp",telephone:contact.display.replace(/ /g,""),url:contact.href,email:studioContact.email,availableLanguage:["English"]})),areaServed:{"@type":"Place",name:"Worldwide"}},
 {"@type":"WebSite","@id":websiteId,url:siteUrl,name:"ALYOXA",description:seoPages["/"].description,inLanguage:"en",publisher:{"@id":organizationId}},
 ]}/>;}
export function PageStructuredData({path}:{path:PublicPath}){
 const page=seoPages[path],url=absoluteUrl(path),pageId=`${url}#webpage`;
 const graph:Record<string,unknown>[]=[{"@type":page.type,"@id":pageId,url,name:page.title,description:page.description,inLanguage:"en",isPartOf:{"@id":websiteId},about:{"@id":organizationId},publisher:{"@id":organizationId}}];
 if(path!=="/"){
  const breadcrumbId=`${url}#breadcrumb`;
  graph[0].breadcrumb={"@id":breadcrumbId};
  graph.push({"@type":"BreadcrumbList","@id":breadcrumbId,itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:siteUrl},{"@type":"ListItem",position:2,name:page.name,item:url}]});
 }
 if(path==="/services"){
  const services=serviceDisciplines.map(service=>({"@type":"Service","@id":`${url}#${service.id}`,name:service.title,serviceType:service.title,url:`${url}#${service.id}`,description:service.description,provider:{"@id":organizationId},areaServed:{"@type":"Place",name:"Worldwide"}}));
  graph.push(...services,{"@type":"ItemList","@id":`${url}#disciplines`,name:"ALYOXA services",itemListElement:services.map((service,index)=>({"@type":"ListItem",position:index+1,item:{"@id":service["@id"]}}))});
  graph[0].mainEntity={"@id":`${url}#disciplines`};
 }
 if(path==="/work"){
  const concepts=workProjects.map(project=>({"@type":"CreativeWork","@id":`${url}#concept-${project.id}`,url:`${url}#concept-${project.id}`,name:`${project.name} - Concept project`,genre:"Illustrative concept exploration",creativeWorkStatus:"Concept",image:absoluteUrl(project.image),creator:{"@id":organizationId},isPartOf:{"@id":pageId}}));
  graph.push(...concepts,{"@type":"ItemList","@id":`${url}#portfolio`,name:"ALYOXA concept portfolio",itemListElement:concepts.map((concept,index)=>({"@type":"ListItem",position:index+1,item:{"@id":concept["@id"]}}))});
  graph[0].mainEntity={"@id":`${url}#portfolio`};
 }
 return <JsonLd id="alyoxa-page-schema" graph={graph}/>;
}
