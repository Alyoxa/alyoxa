import Link from "next/link";
import LegalContents from "./LegalContents";
import { studioContact } from "@/lib/studioContact";
type Document = {title:string;updated:string;updatedISO:string;intro:string[];sections:{id:string;title:string;blocks:({kind:string;text?:string;items?:string[]})[]}[]};
function textWithLinks(text:string) {
 const tokens=text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+|hello@alyoxa\.com|\+44 7440 779802|\+92 340 6995234)/g);
 return tokens.map((token,index)=>{
  if(token.startsWith("**")&&token.endsWith("**"))return <strong key={index}>{token.slice(2,-2)}</strong>;
  if(token===studioContact.email)return <a key={index} href={`mailto:${token}`}>{token}</a>;
  if(token===studioContact.uk.display||token===studioContact.pk.display)return <a key={index} href={token===studioContact.uk.display?studioContact.uk.href:studioContact.pk.href} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${token} (opens in a new tab)`}>{token}</a>;
  if(token.startsWith(studioContact.website+"/"))return <Link key={index} href={token.slice(studioContact.website.length)}>{token}</Link>;
  if(token.startsWith("https://")||token.startsWith("http://"))return <a key={index} href={token}>{token}</a>;
  return token;
 });
}
export default function LegalDocument({document}: {document:Document}) {
 const lastSpace=document.title.lastIndexOf(" ");
 const privacy=document.title==="Privacy Policy";
 return <article className="legal-document">
  <header className="legal-document__intro"><div className="legal-document__overline"><p className="legal-page__eyebrow">THE STUDIO / LEGAL</p><span>DOCUMENT {privacy?"01":"02"} / 02</span></div><div className="legal-document__hero-grid"><h1>{document.title.slice(0,lastSpace)} <em>{document.title.slice(lastSpace+1)}</em></h1><div className="legal-document__overview"><span>{privacy?"YOUR INFORMATION. YOUR CONFIDENCE.":"CLEAR EXPECTATIONS. BETTER PARTNERSHIPS."}</span>{document.intro.map(paragraph=><p key={paragraph}>{textWithLinks(paragraph)}</p>)}</div></div><div className="legal-document__meta"><p>Last updated <time dateTime={document.updatedISO}>{document.updated}</time></p><nav aria-label="Policy documents"><Link href="/privacy-policy" aria-current={privacy?"page":undefined}>Privacy Policy</Link><Link href="/terms-and-conditions" aria-current={!privacy?"page":undefined}>Terms &amp; Conditions</Link></nav></div></header>
  <div className="legal-document__layout"><aside className="legal-document__contents"><LegalContents sections={document.sections}/><div className="legal-document__help"><span>LET'S KEEP THINGS CLEAR</span><h2>A question<br/><em>about the details?</em></h2><p>We're here to help you understand how we work.</p><a href={`mailto:${studioContact.email}`}>{studioContact.email} <span aria-hidden="true">&#8599;</span></a><div><a href={studioContact.uk.href} target="_blank" rel="noopener noreferrer">UK WhatsApp &#8599;</a><a href={studioContact.pk.href} target="_blank" rel="noopener noreferrer">PK WhatsApp &#8599;</a></div></div></aside>
  <div className="legal-document__body">{document.sections.map((section,index)=><section id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`} className={index===document.sections.length-1?"legal-document__contact-section":undefined}><div className="legal-document__section-title"><span aria-hidden="true">{String(index+1).padStart(2,"0")}</span><h2 id={`${section.id}-heading`}>{section.title.replace(/^\d+\.\s*/,"")}</h2></div>{section.blocks.map((block,index)=>block.kind==="list"?<ul key={index}>{block.items?.map(item=><li key={item}>{textWithLinks(item)}</li>)}</ul>:<p key={index}>{textWithLinks(block.text??"")}</p>)}</section>)}</div></div>
 </article>;
}
