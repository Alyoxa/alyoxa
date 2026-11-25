# ALYOXA Insights: content and keyword research

Prepared November 25, 2026. Ten original English articles, a reading index, and an editorial article template. This is an implementation and research record, not a ranking prediction.

## What was researched

Public web searches reviewed agency-selection, website-cost, custom-versus-template, redesign, brief, and brand-identity topics. Google autocomplete was queried for ten topic seeds and seven additional agency/UK variants. The raw responses and source URLs are in [the evidence file](research/insights-keyword-evidence.json).

Autocomplete returned candidates including `web design agency`, `web design company`, `website design cost for small business`, `custom website vs template`, `website redesign checklist`, `website design brief template`, `brand identity vs logo`, `website conversion rate optimization`, and `website development process`.

**These are not verified monthly search volumes, a list of the most-searched terms, or a ranking of popularity.** The `gl` location parameter is a hint, not reliable country-level demand measurement. Some suggestions are irrelevant or geographic; they were not copied into articles merely because they appeared. The website-launch-checklist seed returned no suggestions in this snapshot; that article remains a useful supporting guide, not a claimed high-volume opportunity. No authenticated Google Keyword Planner, Search Console, or paid keyword dataset was available.

Google's [Keyword Planner](https://support.google.com/google-ads/answer/7337243) provides keyword ideas and estimated searches. For numerical prioritisation, import [the seed CSV](research/insights-keyword-seeds.csv) into an owner-controlled account. Set language, date range, and each actual target market separately: US, UK, France, Germany, UAE, and Saudi Arabia. Record the location and period with each estimate. Do not present English-query evidence as evidence for French, German, or Arabic demand.

## Intent map

| Article URL under /insights/ | Primary editorial target | Supporting terms | Reader intent |
| --- | --- | --- | --- |
| how-to-choose-a-web-design-agency | how to choose a web design agency | web design agency, web design company | Evaluate a partner |
| custom-website-vs-template | custom website vs template | custom website design vs template, website builder | Compare approaches |
| custom-website-cost | custom website cost | website design cost, how much does a custom website cost | Understand scope and pricing drivers |
| website-redesign-checklist | website redesign checklist | website redesign project plan, website redesign | Diagnose and plan a redesign |
| website-design-brief | website design brief | website design brief template, web design brief | Prepare an actionable brief |
| brand-identity-vs-logo | brand identity vs logo | visual identity, brand identity design | Clarify design scope |
| website-conversion-design | website conversion design | website conversion rate optimization, calls to action | Improve an enquiry journey |
| website-animation-performance | website animation performance | interactive website design, GSAP website development | Assess motion and technical trade-offs |
| website-design-development-process | website design and development process | website development process, website design process steps | Understand delivery and responsibilities |
| website-launch-checklist | website launch checklist | website launch SEO checklist, website testing checklist | Verify readiness and handover |

Broad commercial queries such as `web design agency` primarily belong to the main service offering. The articles address distinct buying questions and link to relevant existing service anchors; they do not create ten competing versions of the same agency landing page. Primary and supporting keywords are editorial fields in the server-side source data, not hidden keyword blocks or a meta-keywords tag.

## Editorial rules

- Each article provides an immediate answer, original practical guidance, a checklist or comparison, and two useful questions. There is no copied competitor prose, invented survey, fabricated author, or fake client result.
- ALYOXA Studio is the displayed organisational author, linked to the existing About page. Statements about ALYOXA are limited to its published services and approach.
- Pricing content explains scope and comparison; no unapproved rates, packages, taxes, or delivery guarantees are stated.
- Technical claims reference relevant Google, web.dev, or W3C primary documentation. No FAQ rich-result promise or unqualified performance claim is made.
- Article dates record preparation on November 25, 2026; verify publication dates when actually releasing. Update the date only when the content is meaningfully revised, not on every build.
- Review each article against real sales questions and project experience over time. Add approved case-study evidence when available. Do not publish fabricated outcomes to make a guide seem experienced.

## Presentation and implementation

- `/insights` has a featured perspective and all ten articles. Each has its own statically generated URL, visible author/date, reading time, short answer, sticky desktop contents, responsive reading layout, native expandable questions, service links, and three related guides.
- Code-native SVG illustrations provide an editorial visual language without raster downloads or an extra animation library. They are decorative and excluded from accessibility output. Articles do not wait for a GSAP entrance before becoming readable.
- The only homepage addition is a small **Insights** link in the existing footer's secondary links. No homepage blog section, hero promotion, or main-navigation item was added.
- Existing shared navigation and compact footer are reused. The reading interface adds no client component or runtime dependency. Native anchors and details work without JavaScript.
- Metadata, canonical URLs, article Open Graph fields, Twitter cards, Blog/BlogPosting/WebPage/Breadcrumb JSON-LD, and sitemap entries derive from the article data. Verified existing ALYOXA social imagery is retained; it is brand artwork, not a project screenshot.
- The SEO validator and IndexNow dry run include all 19 public routes. The production/preview indexing policy is unchanged. No external submission is performed automatically.

## Validation

- Production build and TypeScript: passed, including all ten statically generated article routes.
- ESLint: passed.
- HTTP SEO validation: passed for 19 public routes, including article fields, SSR paragraphs, table counts, three-level breadcrumbs, internal links and fragments, sitemap, and missing-article HTTP 404/noindex.
- Browser: index and article checked at 1440, 768, 375, and 320 pixels; no document overflow. Desktop sticky contents, native question expansion, reduced-motion readability, and JavaScript-disabled article content passed. Desktop and mobile screenshots inspected.
- Representative article mobile Lighthouse lab audit: performance 99, SEO 100, best practices 100, accessibility 96; LCP 1.06s, CLS 0, TBT 105ms. These are local lab results, not deployed field metrics. Existing footer contrast findings remain; its phone accessible names were corrected after the audit. See [the numeric summary](research/insights-lab-audit.json).
- Homepage remains without an Insights section. A visible footer link supplies a crawlable path to the journal.

This work does not claim to fix the existing homepage's animation-related mobile performance limitations. New reading pages deliberately avoid adding those effects.

## Measuring whether it helps

After deployment, inspect the journal and several article URLs in Search Console and submit the updated sitemap through the owner's verified accounts. Over time, evaluate index coverage, actual queries, country/device impressions, relevant clicks, and project enquiries. Use that evidence to refine titles and content. A page being indexed or achieving a good technical score is not a promise of first-position rankings.

Useful references: [Google's SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article).
