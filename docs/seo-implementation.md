# ALYOXA SEO implementation report

Date: November 25, 2026. Status: local implementation only. No commit, push, production deployment, ownership verification, sitemap submission, or IndexNow notification has been performed. Branch HEAD remains a8b9565.

## Audit and fixes

- Audited eight public routes, layouts, navigation, semantic HTML, assets, Satoshi loading, client/server boundaries, GSAP gates, dependencies, enquiry API, and Netlify configuration. Public pages are statically generated; the enquiry endpoint remains server-only.
- Replaced inconsistent/inherited metadata with one route registry and unique intent-led titles/descriptions, absolute production canonical URLs, verified existing landscape Open Graph image, full Open Graph and Twitter cards. No keyword stuffing, unsupported service claims, or geographic doorway pages.
- Added server-rendered Organization and WebSite entities plus per-page WebPage, AboutPage, ContactPage, BreadcrumbList, four Service entities, and six explicitly fictional CreativeWork concepts. Shared service copy prevents schema/content drift. JSON-LD escapes HTML-sensitive opening brackets. Only the verified Instagram profile, email, WhatsApp numbers, and website are used. No invented offices, reviews, ratings, awards, or registration details.
- Sitemap derives from the route registry; removed fabricated build-time modification dates. Only the supplied legal revision date is emitted. Robots permits public crawlers and excludes the API; API responses also carry X-Robots-Tag. Production indexes by default. Netlify nonproduction CONTEXT values or SEO_INDEXING_DISABLED=true set page noindex and emit an empty sitemap. Public preview crawling stays allowed so crawlers can read noindex.
- Added a branded real HTTP 404 with useful links and noindex. Preserved the permanent /Home redirect. Verified all public routes are internally linked and all rendered internal fragment links resolve.
- Added optional Google/Bing verification environment hooks and an explicit, dry-run-by-default IndexNow utility with production ownership-file and URL checks. No secrets or fabricated tokens were added. No runtime dependency changes.
- Corrected invalid ARIA on the project filter group and accessible-name mismatches on hero cards without changing visible text. Fixed existing lint blockers with equivalent JSX entities, safe draft restoration, equivalent DOM style setters, and constant timeline declarations. Regression checks preserve their behavior.

## Design and international/AI discovery

Existing typography, CSS, section composition, nav behavior, responsive styles, intro duration, GSAP timelines, and ScrollTrigger behavior are preserved. Only the new 404 has new styling. Existing five local Satoshi weights and image optimizations remain; the main hero image is preloaded while secondary hero images are not. Content is present in the server HTML; no-JavaScript fallback and script-failure visibility fallback were checked.

One genuine English site serves international clients. No fabricated US/UK/France/Germany/UAE/Saudi offices or translated URLs were added. Hreflang is deliberately absent until actual localized alternatives exist. Existing explicit service copy and new metadata/entity relationships support accurate representation by search engines; inclusion, rankings, and AI citations cannot be guaranteed. Wildcard crawler access covers search crawlers without unverified bot-specific rules. llms.txt was evaluated and deferred: it is experimental, duplicates this small crawlable site, and is not an established Google Search requirement or ranking factor.

## Validation

- Production build and TypeScript: pass; all eight public pages statically generated.
- ESLint: pass, no errors or warnings.
- Production and deploy-preview builds: eight-route HTTP SEO checks pass. Tests cover metadata, canonicals, social cards, schema JSON/entity IDs, concept labels, headings, alt attributes, internal routes/fragments, sitemap, robots, actual 404, legacy 308 redirect, API noindex, and social image delivery.
- Desktop/mobile inner-page entry and scroll motion, layout overflow, reduced motion, and deep links: pass.
- Initial-paint animation gate, six-second script-failure fallback, and no-JavaScript content: pass.
- Intro drawing/portal handoff/session replay/mobile skip/reduced-motion/deep-link/no-JavaScript handling: pass. Full first-visit intro unlock observed around 4.05 seconds.
- Work gallery filters, card-to-dialog morph, close/focus return, screenshots, mobile, and reduced motion: pass.
- Contact draft restoration and mocked send failure/retry/success: pass; no email sent.
- IndexNow dry run: eight URLs listed, zero submitted.

### Lighthouse lab results

| Final local homepage audit | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| mobile | 74 | 96 | 100 | 100 | 4.72s | 0 | 327ms |
| desktop | 96 | 96 | 100 | 100 | 0.97s | 0 | 112ms |

Raw numeric summary: [seo-audit-results.json](./seo-audit-results.json). Temporary Lighthouse installation/cache is outside the repository; no app dependency was added. These are single local navigation runs, not deployed CDN/field measurements, and scores vary. Initial mobile run was 67 performance / 4.8s LCP; final run is recorded above. Desktop LCP can identify the preloader rather than the fully revealed site; it is not a promise that the entire intro completes within that time. INP cannot be certified from these navigation audits; TBT is a lab diagnostic, not INP.

## Remaining issues and decisions

1. Mobile LCP and performance do not meet the requested targets. Intro/hydration/GSAP work and animation-related layout reads remain material. Reducing first-visit delay or restructuring motion requires a separately approved performance pass under the strict animation/design protection requirement. No audit-only bypass or animation removal was used.
2. Lighthouse still flags existing small bronze/grey labels for contrast. Accessibility is 96 mobile; adjusting their colors requires approval because this task protects the design. Automated scores are not a full accessibility certification.
3. No real field 75th-percentile LCP/INP/CLS data, Search Console ownership/access, external rich-result validation submission, indexing confirmation, or search performance data is available in this local task.
4. Portfolio entries remain concepts. Replace them with genuine project content/URLs when ready; only then expand case-study schema and dedicated crawlable detail routes. Existing supplied testimonials are unchanged and have no rating markup.
5. No translations, physical office claims, analytics IDs, or verification values were inferred. No new hidden keywords or unsupported e-commerce/technology service promises were introduced merely to match target queries.

## Owner deployment and search steps

1. Review this report and approve before any commit/push. Then review the Netlify preview and merge to the existing connected production branch when ready. Keep Node 24, the current root build configuration, and existing Resend variables.
2. In Netlify, scope optional GOOGLE_SITE_VERIFICATION and BING_SITE_VERIFICATION to Builds, using only tokens from your verified accounts. Alternatively verify through DNS. Redeploy after adding HTML verification tokens. Ensure SEO_INDEXING_DISABLED is false/unset in production; allow Netlify to supply its normal CONTEXT. Preview contexts must remain noindex.
3. Verify https://alyoxa.com in Google Search Console and Bing Webmaster Tools; submit https://alyoxa.com/sitemap.xml after launch. Inspect the eight canonical URLs and a missing URL; confirm production returns index/follow, intended canonicals, HTTP 200/404, accessible assets, and correct sitemap.
4. Validate deployed structured data with Schema.org Validator and Google Rich Results Test. Generic Organization/Service/CreativeWork markup is not a guarantee of a Google rich result.
5. Optional IndexNow: generate your own valid key, publish public/<key>.txt containing that key, deploy, and set INDEXNOW_KEY locally. Run npm run seo:indexnow to inspect the dry run. Only after explicit deployment/submission approval run npm run seo:indexnow -- --submit. Ownership verification and 200 responses do not guarantee indexing.
6. Monitor indexing, country/query impressions, conversions, and field Core Web Vitals after launch. No analytics provider or tracking ID was added. Recheck PageSpeed Insights on production; investigate real LCP/INP/CLS at the 75th percentile as field data accumulates.

## Maintenance

Run npm run lint and npm run build. With a local production server on port 3107, run npm run seo:check. Set SEO_TEST_BASE_URL for another port. For a build made with CONTEXT=deploy-preview, set SEO_EXPECT_NOINDEX=true for validation. Keep src/lib/seo-pages.json in sync when adding/removing public routes. Keep factual service content in src/lib/serviceDisciplines.ts and business identity in src/lib/studioContact.ts.

## Changed files

- .env.example
- eslint.config.mjs
- next.config.ts
- package.json
- src/app/(legal)/LegalDocument.tsx
- src/app/(legal)/privacy-policy/page.tsx
- src/app/(legal)/terms-and-conditions/page.tsx
- src/app/about/page.tsx
- src/app/approach/page.tsx
- src/app/contact/ContactForm.tsx
- src/app/contact/page.tsx
- src/app/layout.tsx
- src/app/page.tsx
- src/app/robots.ts
- src/app/services/page.tsx
- src/app/sitemap.ts
- src/app/work/WorkGallery.tsx
- src/app/work/page.tsx
- src/components/motion/Preloader/Preloader.tsx
- src/components/motion/useCardDialog.ts
- src/components/sections/Hero/Hero.tsx
- src/components/sections/Work/Work.tsx
- src/lib/studioContact.ts
- docs/seo-audit-results.json
- scripts/submit-indexnow.mjs
- scripts/validate-seo.mjs
- src/app/not-found.css
- src/app/not-found.tsx
- src/components/seo/StructuredData.tsx
- src/lib/seo-pages.json
- src/lib/seo.ts
- src/lib/serviceDisciplines.ts
- docs/seo-implementation.md
- README.md (report link and commands)

## References

- [Google Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google AI features and website owners](https://developers.google.com/search/docs/appearance/ai-features)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Core Web Vitals thresholds and field measurement](https://web.dev/articles/vitals)
- [IndexNow ownership and submission protocol](https://www.indexnow.org/documentation)
