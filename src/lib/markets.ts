/* Market landing pages. Each one is written for its country (law, time zone, buying habits),
   not a copied template: thin "city pages" are treated as doorway pages by Google. */
export type Market = {
  slug: string;
  path: string;
  lang: "en" | "fr";
  locale: string;
  country: string;
  countryCode: string;
  name: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: [string, string];
  intro: string;
  sections: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  cta: string;
  labels: { why: string; faq: string; services: string; contact: string };
};

const servicesEn = "Custom website design and development, brand identity, interactive and 3D web experiences, product and UX design.";

export const markets: Market[] = [
  {
    slug: "united-states", path: "/web-design-agency/united-states", lang: "en", locale: "en_US", country: "United States", countryCode: "US",
    name: "Web design agency for US brands",
    title: "Creative Web Design & Branding Agency for US Brands | ALYOXA",
    description: "ALYOXA designs and builds custom websites, brand identities, and interactive 3D web experiences for US startups and brands. Accessible, fast, and built to convert.",
    eyebrow: "United States / Creative web design agency",
    heading: ["Websites US brands", "remember."],
    intro: "ALYOXA is an independent creative technology studio working with founders, startups, and growing brands across the United States. We combine brand strategy, award-level visual design, and engineering in one team, so the site you launch looks like a flagship and performs like a product.",
    sections: [
      { title: "Accessibility is built in, not bolted on", text: "US businesses face real legal exposure under the ADA when a website is hard to use with assistive technology. We design and build against WCAG 2.2 AA from the first wireframe: semantic structure, keyboard paths, contrast, reduced-motion support, and readable copy, so ambitious motion never costs you compliance." },
      { title: "Built for how US buyers decide", text: "American buyers compare quickly and expect proof. We plan pages around clear positioning, outcomes, social proof, and a frictionless path to a call or demo, then measure what matters with privacy-aware analytics that respect state privacy laws such as the CCPA." },
      { title: "Working across time zones", text: "We run projects asynchronously with fixed weekly check-ins scheduled for Eastern or Pacific mornings, shared design files, and staging links you can review on your own time. Quotes and invoices are in USD." },
    ],
    faqs: [
      { question: "How much does a custom website cost in the US?", answer: "Most custom marketing websites we build for US brands fall between a focused launch site and a full brand and web programme. We quote a fixed price in USD after a short discovery call, so the scope and cost are clear before any work starts." },
      { question: "Can you work with US startups remotely?", answer: "Yes. Our whole process is designed for remote collaboration, with scheduled calls in US hours, async reviews, and a single point of contact from brief to launch." },
    ],
    cta: "Start a US project", labels: { why: "Why US brands choose ALYOXA", faq: "Questions from US clients", services: servicesEn, contact: "Tell us about your project" },
  },
  {
    slug: "united-kingdom", path: "/web-design-agency/united-kingdom", lang: "en", locale: "en_GB", country: "United Kingdom", countryCode: "GB",
    name: "Web design agency for UK brands",
    title: "Creative Web Design & Branding Agency UK | ALYOXA",
    description: "Independent creative studio designing bespoke websites, brand identities, and immersive digital experiences for UK businesses. UK GDPR-aware, accessible, and fast.",
    eyebrow: "United Kingdom / Creative web design agency",
    heading: ["Bespoke websites for", "UK brands."],
    intro: "ALYOXA partners with UK companies, from London startups to established brands across the country, on bespoke websites, brand identity, and interactive digital experiences. One senior team takes you from strategy to launch, with a UK phone line and WhatsApp for quick conversations.",
    sections: [
      { title: "UK GDPR and PECR from day one", text: "Cookie consent, analytics, and enquiry forms are set up to respect UK GDPR and PECR: no non-essential tracking before consent, clear privacy information, and data collected only for the reason you asked for it." },
      { title: "Accessible to every customer", text: "The Equality Act expects services to be usable by disabled people. We design to WCAG 2.2 AA and test with keyboards and screen readers, so a distinctive site is also an inclusive one, which matters even more if you sell to the public sector." },
      { title: "Clear pricing, British hours", text: "Fixed-price proposals in GBP, milestone-based invoicing, and calls during UK working hours. You always know what is being built, when it lands, and what it costs." },
    ],
    faqs: [
      { question: "Do you work with businesses outside London?", answer: "Yes. We work with clients across the UK remotely, with video calls, shared design files, and staging links, so location never slows a project down." },
      { question: "How long does a bespoke website take?", answer: "A focused marketing website typically takes six to ten weeks from discovery to launch. Larger brand and web projects are planned in phases, so you can launch sooner and keep improving." },
    ],
    cta: "Start a UK project", labels: { why: "Why UK teams work with ALYOXA", faq: "Questions from UK clients", services: servicesEn, contact: "Tell us about your project" },
  },
  {
    slug: "singapore", path: "/web-design-agency/singapore", lang: "en", locale: "en_SG", country: "Singapore", countryCode: "SG",
    name: "Web design agency for Singapore brands",
    title: "Creative Web Design & 3D Website Agency Singapore | ALYOXA",
    description: "ALYOXA creates custom websites, brand identities, and interactive 3D web experiences for Singapore companies. PDPA-aware, fast on mobile, built for regional growth.",
    eyebrow: "Singapore / Creative web design agency",
    heading: ["Digital flagships for", "Singapore brands."],
    intro: "Singapore is one of the most competitive digital markets in Asia. ALYOXA helps Singapore companies stand out with custom websites, sharp brand identities, and interactive and 3D web experiences, designed to impress and engineered to load fast on every device.",
    sections: [
      { title: "PDPA-ready by design", text: "Forms, analytics, and newsletters are configured with Singapore's Personal Data Protection Act in mind: clear consent, collection limited to its purpose, and a privacy notice your customers can actually read." },
      { title: "Mobile-first, regional-ready", text: "Most Singapore traffic is mobile. We design mobile journeys first, keep pages light for fast loading across Southeast Asia, and structure the site so adding markets or languages later is simple." },
      { title: "Interactive and 3D without the weight", text: "Immersive WebGL scenes, motion, and 3D product views can be a real differentiator. We use them where they tell your story, then optimise assets so performance and Core Web Vitals stay strong." },
    ],
    faqs: [
      { question: "Do you build 3D and interactive websites for Singapore companies?", answer: "Yes. We design and develop interactive and 3D web experiences, from subtle motion to full WebGL scenes, always balanced against speed, accessibility, and search visibility." },
      { question: "Can we pay in SGD and meet during Singapore hours?", answer: "Yes. We can quote in SGD and schedule calls that suit Singapore working hours, with async reviews in between." },
    ],
    cta: "Start a Singapore project", labels: { why: "Why Singapore brands choose ALYOXA", faq: "Questions from Singapore clients", services: servicesEn, contact: "Tell us about your project" },
  },
  {
    slug: "malaysia", path: "/web-design-agency/malaysia", lang: "en", locale: "en_MY", country: "Malaysia", countryCode: "MY",
    name: "Web design agency for Malaysia brands",
    title: "Creative Web Design & Branding Agency Malaysia | ALYOXA",
    description: "Custom website design, brand identity, and interactive web experiences for businesses in Kuala Lumpur and across Malaysia. PDPA-aware, mobile-first, fast.",
    eyebrow: "Malaysia / Creative web design agency",
    heading: ["Distinctive websites for", "Malaysian brands."],
    intro: "From Kuala Lumpur to Penang and Johor Bahru, Malaysian brands are competing regionally and online. ALYOXA designs custom websites and brand identities that look world-class and work hard: clear on mobile, quick to load, and built to turn visitors into enquiries.",
    sections: [
      { title: "Aligned with Malaysia's PDPA", text: "Enquiry forms, analytics, and marketing tools are set up with Malaysia's Personal Data Protection Act 2010 in mind, with clear notices and consent, so your website builds trust from the first visit." },
      { title: "Designed for a multilingual audience", text: "Many Malaysian brands speak to customers in English, Bahasa Malaysia, and Chinese. We plan typography, layouts, and content structure so additional languages can be added cleanly without redesigning the site." },
      { title: "Mobile-first and fast", text: "We design for phones first and keep every page lean, so the experience stays smooth on real mobile connections, which also helps search visibility." },
    ],
    faqs: [
      { question: "Do you work with companies in Kuala Lumpur?", answer: "Yes. We work with businesses in Kuala Lumpur and across Malaysia remotely, with calls in Malaysian working hours and quotes in MYR on request." },
      { question: "Can my website support Bahasa Malaysia as well as English?", answer: "Yes. We can design and build multilingual websites, or prepare an English site so other languages can be added later without a rebuild." },
    ],
    cta: "Start a Malaysia project", labels: { why: "Why Malaysian brands choose ALYOXA", faq: "Questions from Malaysian clients", services: servicesEn, contact: "Tell us about your project" },
  },
  {
    slug: "uae", path: "/web-design-agency/uae", lang: "en", locale: "en_AE", country: "United Arab Emirates", countryCode: "AE",
    name: "Web design agency for UAE brands",
    title: "Creative Web Design & Branding Agency UAE | Dubai & Abu Dhabi | ALYOXA",
    description: "Luxury-grade custom websites, brand identities, and interactive 3D web experiences for brands in Dubai, Abu Dhabi, and across the UAE. Arabic-ready, PDPL-aware.",
    eyebrow: "United Arab Emirates / Creative web design agency",
    heading: ["Websites worthy of", "UAE ambition."],
    intro: "Dubai and Abu Dhabi set a high bar for premium experiences, and a brand's website is expected to match it. ALYOXA designs custom websites, brand identities, and immersive digital experiences for UAE startups, real estate, hospitality, and luxury brands, with one senior team from strategy to launch.",
    sections: [
      { title: "Arabic and English, built properly", text: "We plan bilingual sites from the start: right-to-left layouts that mirror correctly, Arabic typography chosen with the same care as Latin type, and a content structure that keeps both languages in step. No bolted-on translation plugins." },
      { title: "Aligned with the UAE PDPL", text: "Enquiry forms, analytics, and marketing tools are configured with the UAE's Personal Data Protection Law (Federal Decree-Law No. 45 of 2021) in mind, with clear consent and purpose-limited data collection. Free-zone clients in DIFC or ADGM can be set up against their own data rules too." },
      { title: "Premium feel, fast on mobile", text: "Cinematic motion, 3D, and rich imagery suit UAE audiences, but only if pages stay quick on mobile. We optimise every asset, so the experience feels luxurious without the wait. Quotes can be in AED, with calls on Gulf Standard Time." },
    ],
    faqs: [
      { question: "Do you build bilingual Arabic and English websites in the UAE?", answer: "Yes. We design and build bilingual websites with proper right-to-left Arabic layouts and typography, or prepare an English site so Arabic can be added later without a rebuild." },
      { question: "Do you work with real estate and hospitality brands in Dubai?", answer: "Yes. Immersive, image-led websites for real estate, hospitality, and lifestyle brands are a natural fit for our mix of design, motion, and 3D, always built to load fast and capture enquiries." },
    ],
    cta: "Start a UAE project", labels: { why: "Why UAE brands choose ALYOXA", faq: "Questions from UAE clients", services: servicesEn, contact: "Tell us about your project" },
  },
  {
    slug: "saudi-arabia", path: "/web-design-agency/saudi-arabia", lang: "en", locale: "en_SA", country: "Saudi Arabia", countryCode: "SA",
    name: "Web design agency for Saudi brands",
    title: "Creative Web Design & Branding Agency Saudi Arabia | Riyadh | ALYOXA",
    description: "Custom websites, brand identities, and interactive digital experiences for Saudi companies in Riyadh, Jeddah, and beyond. Arabic-first, PDPL-aware, built for Vision 2030 growth.",
    eyebrow: "Saudi Arabia / Creative web design agency",
    heading: ["Digital presence for a", "new Saudi era."],
    intro: "Vision 2030 has made Saudi Arabia one of the fastest-moving digital markets in the world, from giga-projects to a new generation of startups. ALYOXA helps Saudi brands launch websites and identities that feel world-class, speak to local audiences, and are ready to grow.",
    sections: [
      { title: "Arabic-first, not translated later", text: "For many Saudi audiences Arabic is the primary language. We design Arabic-first or fully bilingual experiences: right-to-left layouts, considered Arabic typography, and copy structure that reads naturally in both directions." },
      { title: "Ready for Saudi PDPL", text: "Saudi Arabia's Personal Data Protection Law, overseen by SDAIA, sets clear expectations for consent and data handling. Forms, analytics, and integrations are configured with it in mind from the first build." },
      { title: "Built to scale with you", text: "Startups and established groups alike need sites that grow: new services, new cities, new languages. We build on a flexible design system, with quotes in SAR and calls on Arabia Standard Time around the Saudi working week." },
    ],
    faqs: [
      { question: "Can you design an Arabic-first website for a Saudi company?", answer: "Yes. We design Arabic-first or bilingual websites with right-to-left layouts and dedicated Arabic typography, so the Arabic experience is as polished as the English one." },
      { question: "Do you work with startups in Riyadh?", answer: "Yes. We work remotely with startups and established companies in Riyadh, Jeddah, and across the Kingdom, with scheduled calls and async reviews that fit the Sunday to Thursday week." },
    ],
    cta: "Start a Saudi project", labels: { why: "Why Saudi brands choose ALYOXA", faq: "Questions from Saudi clients", services: servicesEn, contact: "Tell us about your project" },
  },
  {
    slug: "qatar", path: "/web-design-agency/qatar", lang: "en", locale: "en_QA", country: "Qatar", countryCode: "QA",
    name: "Web design agency for Qatar brands",
    title: "Creative Web Design & Branding Agency Qatar | Doha | ALYOXA",
    description: "ALYOXA designs custom websites, brand identities, and immersive web experiences for businesses in Doha and across Qatar. Bilingual, privacy-aware, and fast.",
    eyebrow: "Qatar / Creative web design agency",
    heading: ["Refined websites for", "Qatari brands."],
    intro: "Qatar's brands compete on quality, from hospitality and culture to finance and fast-growing startups. ALYOXA creates custom websites and brand identities with the refinement Doha expects, and the clarity that turns visitors into conversations.",
    sections: [
      { title: "Respecting Qatar's data protection law", text: "Qatar was the first GCC country with a national data protection law (Law No. 13 of 2016). We set up consent, forms, and analytics with it in mind, so your website earns trust from the first visit." },
      { title: "Bilingual by design", text: "Arabic and English experiences are planned together: mirrored right-to-left layouts, matched typography, and navigation that works naturally in both languages." },
      { title: "Culture-led storytelling", text: "Motion, imagery, and 3D can carry a brand's story with real depth. We use them with restraint and purpose, and keep every page fast. Quotes can be in QAR, with calls on Doha time." },
    ],
    faqs: [
      { question: "Do you work with businesses in Doha?", answer: "Yes. We work remotely with companies in Doha and across Qatar, with calls during Qatari working hours and clear, fixed-price proposals." },
      { question: "Can you create a bilingual Arabic and English website?", answer: "Yes. We design and build bilingual sites with proper right-to-left Arabic layouts, or structure an English site so Arabic can be added later." },
    ],
    cta: "Start a Qatar project", labels: { why: "Why Qatari brands choose ALYOXA", faq: "Questions from Qatari clients", services: servicesEn, contact: "Tell us about your project" },
  },
  {
    slug: "kuwait", path: "/web-design-agency/kuwait", lang: "en", locale: "en_KW", country: "Kuwait", countryCode: "KW",
    name: "Web design agency for Kuwait brands",
    title: "Creative Web Design & Branding Agency Kuwait | ALYOXA",
    description: "Custom websites, brand identities, and interactive web experiences for businesses in Kuwait City and across Kuwait. Bilingual, mobile-first, and privacy-aware.",
    eyebrow: "Kuwait / Creative web design agency",
    heading: ["Distinctive websites for", "Kuwaiti brands."],
    intro: "Kuwait has one of the region's most connected, mobile-first audiences, and some of its most loyal customers. ALYOXA helps Kuwaiti retailers, F&B concepts, startups, and family businesses launch websites and identities that look exceptional and make it easy to buy, book, or enquire.",
    sections: [
      { title: "Mobile-first for a connected audience", text: "Most Kuwaiti customers will meet your brand on a phone, often from social media. We design mobile journeys first and keep pages light, so the jump from Instagram to your site feels seamless." },
      { title: "Arabic and English together", text: "Bilingual sites are planned from the start, with right-to-left layouts, considered Arabic type, and content that stays consistent in both languages." },
      { title: "Privacy and trust", text: "Forms and analytics are configured with Kuwait's data privacy regulation from CITRA in mind, with clear notices and purpose-limited data. Quotes can be in KWD, with calls around the Kuwaiti working week." },
    ],
    faqs: [
      { question: "Do you design websites for retail and F&B brands in Kuwait?", answer: "Yes. Image-led, mobile-first websites for retail, F&B, and lifestyle brands are a strong fit, designed to turn social media attention into orders, bookings, and enquiries." },
      { question: "Can you work with us remotely from Kuwait?", answer: "Yes. Our process is built for remote collaboration, with scheduled calls in Kuwaiti hours, shared design files, and staging links for every review." },
    ],
    cta: "Start a Kuwait project", labels: { why: "Why Kuwaiti brands choose ALYOXA", faq: "Questions from Kuwaiti clients", services: servicesEn, contact: "Tell us about your project" },
  },
  {
    slug: "france", path: "/fr/agence-web-creative", lang: "fr", locale: "fr_FR", country: "France", countryCode: "FR",
    name: "Agence web créative pour les marques françaises",
    title: "Agence Web Créative : Création de Site Sur Mesure & Branding | ALYOXA",
    description: "ALYOXA conçoit des sites web sur mesure, des identités de marque et des expériences web interactives et 3D pour les entreprises en France. Accessible, rapide, conforme RGPD.",
    eyebrow: "France / Agence web créative",
    heading: ["Des sites sur mesure", "qui marquent."],
    intro: "ALYOXA est un studio indépendant de technologie créative. Nous accompagnons les startups, les marques et les maisons françaises dans la création de sites internet sur mesure, d'identités visuelles et d'expériences digitales interactives, de la stratégie au lancement, avec une seule équipe senior.",
    sections: [
      { title: "Conforme au RGPD et aux recommandations de la CNIL", text: "Bandeau de consentement, mesure d'audience et formulaires sont configurés selon le RGPD et les recommandations de la CNIL : aucun traceur non essentiel avant consentement, et des données collectées uniquement pour leur finalité." },
      { title: "Accessibilité numérique (RGAA et WCAG)", text: "Nous concevons selon les WCAG 2.2 AA, base du référentiel RGAA. Avec l'entrée en application de l'European Accessibility Act, un site accessible n'est plus une option : c'est un avantage pour vos clients et pour votre référencement." },
      { title: "Design ambitieux, performance maîtrisée", text: "Animations, scènes 3D et interactions servent votre histoire de marque, sans sacrifier la vitesse. Chaque page est optimisée pour les Core Web Vitals et pour le mobile." },
    ],
    faqs: [
      { question: "Combien coûte un site internet sur mesure ?", answer: "Le budget dépend du périmètre : site vitrine, refonte complète ou programme marque et web. Après un court appel de découverte, nous proposons un devis forfaitaire en euros, clair avant le démarrage." },
      { question: "Travaillez-vous avec des entreprises en France à distance ?", answer: "Oui. Nous travaillons à distance avec des points réguliers aux horaires français, des maquettes partagées et des liens de prévisualisation pour valider chaque étape." },
    ],
    cta: "Démarrer un projet", labels: { why: "Pourquoi les marques françaises choisissent ALYOXA", faq: "Questions fréquentes", services: "Création de site web sur mesure, identité de marque, expériences web interactives et 3D, design produit et UX.", contact: "Parlez-nous de votre projet" },
  },
];

export const getMarket = (slug: string) => markets.find((market) => market.slug === slug);
