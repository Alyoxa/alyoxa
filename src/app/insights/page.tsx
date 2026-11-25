import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/StructuredData";
import { insights, insightPath, readingMinutes } from "@/lib/insights";
import InsightArtwork from "./InsightArtwork";
import InsightCard from "./InsightCard";

export const metadata = pageMetadata("/insights");

export default function InsightsPage() {
  const featured = insights[0];
  return <>
    <PageStructuredData path="/insights" />
    <main id="main-content" className="journal__wrap">
      <header className="journal__hero">
        <div className="journal__overline"><p className="journal__eyebrow">THE ALYOXA JOURNAL</p><span>STRATEGY / DESIGN / TECHNOLOGY</span></div>
        <div className="journal__hero-grid"><h1>Ideas worth<br /><em>thinking through.</em></h1><div><p>Clearer decisions.<br />More considered digital experiences.</p><span>Practical perspectives on brands, websites, and the work that connects them.</span></div></div>
        <div className="journal__edition"><span>INSIGHTS / VOL. 01</span><a href="#library">Explore all ten guides <span aria-hidden="true">&#8595;</span></a></div>
      </header>
      <section className="journal__featured" aria-labelledby="featured-heading">
        <Link href={insightPath(featured.slug)} className="journal__feature-link">
          <InsightArtwork post={featured} number={1} />
          <div className="journal__feature-copy"><span className="journal__eyebrow">A GOOD PLACE TO START / 01</span><h2 id="featured-heading">{featured.title}</h2><p>{featured.excerpt}</p><div><span>{readingMinutes(featured)} MIN READ</span><span className="journal__read">Read the perspective <span className="insight-arrow" aria-hidden="true">&#8599;</span></span></div></div>
        </Link>
      </section>
      <section id="library" className="journal__library" aria-labelledby="library-heading">
        <div className="journal__section-top"><div><p className="journal__eyebrow">THE READING ROOM</p><h2 id="library-heading">A little perspective.<br /><em>A better starting point.</em></h2></div><span>01—10 / ALL PERSPECTIVES</span></div>
        <div className="journal__grid">{insights.map((post, index) => <InsightCard key={post.slug} post={post} number={index + 1} />)}</div>
      </section>
      <section className="journal__invitation" aria-labelledby="journal-next"><span className="journal__eyebrow">FROM AN IDEA TO A CONVERSATION</span><h2 id="journal-next">What are you<br /><em>thinking about?</em></h2><Link href="/contact">Tell us about your project <span className="insight-arrow" aria-hidden="true">&#8599;</span></Link></section>
    </main>
  </>;
}
