import Link from "next/link";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import AlyoxaMark from "@/components/ui/AlyoxaMark/AlyoxaMark";
import { PageStructuredData } from "@/components/seo/StructuredData";
import { markets, type Market } from "@/lib/markets";
import { insights, insightPath } from "@/lib/insights";
import "./MarketPage.css";

/* One country's landing page: localised copy, FAQs, links to the guides and the other markets. */
export default function MarketPage({ market }: { market: Market }) {
  const fr = market.lang === "fr";
  return <div className="market-page" id="alyoxa-site" lang={market.lang}>
    <Navbar page="services" />
    <PageStructuredData path={market.path as `/web-design-agency/${string}`} />
    <main id="main-content" className="market">
      <header className="market__hero market__wrap">
        <p className="market__eyebrow"><AlyoxaMark className="market__mark" />{market.eyebrow}</p>
        <h1>{market.heading[0]}<br /><em>{market.heading[1]}</em></h1>
        <div className="market__intro">
          <p>{market.intro}</p>
          <p className="market__services">{market.labels.services}</p>
          <BrandButton href="/contact" label={market.cta} />
        </div>
      </header>

      <section className="market__wrap market__why" aria-labelledby="market-why">
        <h2 id="market-why">{market.labels.why}</h2>
        <div className="market__grid">
          {market.sections.map((section, index) => <article key={section.title} className="market__card">
            <span className="market__num">0{index + 1}</span>
            <h3>{section.title}</h3>
            <p>{section.text}</p>
            <AlyoxaMark className="brand-seal" />
          </article>)}
        </div>
      </section>

      <section className="market__wrap market__faq" aria-labelledby="market-faq">
        <h2 id="market-faq">{market.labels.faq}</h2>
        {market.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
      </section>

      {!fr && <section className="market__wrap market__guides" aria-labelledby="market-guides">
        <h2 id="market-guides">Guides before you hire a studio</h2>
        <ul>{insights.slice(0, 4).map((post) => <li key={post.slug}><Link href={insightPath(post.slug)}>{post.title}</Link></li>)}</ul>
      </section>}

      <section className="market__wrap market__end">
        <h2>{market.labels.contact}</h2>
        <BrandButton href="/contact" label={market.cta} />
        <nav className="market__others" aria-label={fr ? "Autres marchés" : "Other markets"}>
          {markets.filter((other) => other.slug !== market.slug).map((other) => <Link key={other.slug} href={other.path} hrefLang={other.lang}>{other.country}</Link>)}
        </nav>
      </section>
    </main>
    <Footer />
  </div>;
}
