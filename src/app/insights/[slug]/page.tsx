import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { insights, getInsight, insightPath, readingMinutes, insightDate } from "@/lib/insights";
import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/StructuredData";
import InsightArtwork from "../InsightArtwork";
import InsightCard from "../InsightCard";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return insights.map(post => ({ slug: post.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getInsight((await params).slug);
  if (!post) notFound();
  return pageMetadata(insightPath(post.slug));
}

export default async function InsightPage({ params }: Props) {
  const post = getInsight((await params).slug);
  if (!post) notFound();
  const number = insights.indexOf(post) + 1;
  const related = post.related.map(getInsight).filter(item => item !== undefined);
  return <>
    <PageStructuredData path={insightPath(post.slug)} />
    <main id="main-content" className="journal__wrap">
      <article className="journal-article">
        <header className="journal-article__hero">
          <nav className="journal-article__breadcrumbs" aria-label="Breadcrumb"><Link href="/">Studio</Link><span aria-hidden="true">/</span><Link href="/insights">Insights</Link><span aria-hidden="true">/</span><span aria-current="page">{post.category}</span></nav>
          <div className="journal__overline"><p className="journal__eyebrow">{post.category}</p><span>FIELD NOTE / {String(number).padStart(2, "0")}</span></div>
          <h1>{post.title}</h1>
          <div className="journal-article__meta"><Link href="/about">By ALYOXA Studio <span aria-hidden="true">&#8599;</span></Link><time dateTime={post.date}>{insightDate(post.date)}</time><span>{readingMinutes(post)} MIN READ</span></div>
          <div className="journal-article__opening"><div><span className="journal__eyebrow">THE SHORT ANSWER</span><p>{post.intro}</p></div><InsightArtwork post={post} number={number} /></div>
        </header>
        <div className="journal-article__reading">
          <aside className="journal-article__aside" aria-label="Article navigation"><details open><summary>IN THIS PERSPECTIVE <span aria-hidden="true">+</span></summary><nav aria-label="Table of contents"><ol>{post.sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.title}</a></li>)}<li><a href="#questions"><span aria-hidden="true">Q</span>Common questions</a></li></ol></nav></details><Link className="journal-article__service" href={post.servicePath}>{post.serviceLabel}<span aria-hidden="true">&#8599;</span></Link></aside>
          <div className="journal-article__body">
            <div className="journal-article__takeaway"><span className="journal__eyebrow">KEEP IN MIND</span><p>{post.takeaway}</p></div>
            {post.sections.map((section, index) => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="journal-article__section"><span className="journal-article__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h2 id={`${section.id}-heading`}>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}{section.table && <div className="journal-article__table" role="region" aria-label={`${section.title} comparison`} tabIndex={0}><table><caption>{section.title}: at a glance</caption><thead><tr>{section.table.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, col) => col === 0 ? <th scope="row" key={col}>{cell}</th> : <td key={col}>{cell}</td>)}</tr>)}</tbody></table></div>}</section>)}
            <section className="journal-article__questions" id="questions" aria-labelledby="questions-heading"><span className="journal__eyebrow">A FEW USEFUL ANSWERS</span><h2 id="questions-heading">Common questions.</h2>{post.questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</section>
            {post.sources.length > 0 && <section className="journal-article__sources" aria-labelledby="sources-heading"><h2 id="sources-heading">Further reading</h2><ul>{post.sources.map(source => <li key={source.url}><a href={source.url}>{source.label} <span aria-hidden="true">&#8599;</span></a></li>)}</ul></section>}
            <footer className="journal-article__author"><span className="journal-article__author-mark" aria-hidden="true">A</span><div><Link href="/about">ALYOXA Studio</Link><p>A creative technology studio connecting strategy, design, and technology. Perspectives for people building brands and digital experiences.</p><Link href={post.servicePath}>{post.serviceLabel} <span aria-hidden="true">&#8599;</span></Link></div></footer>
          </div>
        </div>
      </article>
      <section className="journal__related" aria-labelledby="related-heading"><div className="journal__section-top"><div><p className="journal__eyebrow">KEEP THE THOUGHT GOING</p><h2 id="related-heading">Another <em>perspective.</em></h2></div><Link href="/insights">All insights <span aria-hidden="true">&#8599;</span></Link></div><div className="journal__grid journal__grid--related">{related.map(item => <InsightCard key={item.slug} post={item} number={insights.indexOf(item) + 1} />)}</div></section>
      <section className="journal__invitation" aria-labelledby="journal-next"><span className="journal__eyebrow">YOUR NEXT CHAPTER</span><h2 id="journal-next">Put the thinking<br /><em>into practice.</em></h2><Link href="/contact">Start a project conversation <span className="insight-arrow" aria-hidden="true">&#8599;</span></Link></section>
    </main>
  </>;
}
