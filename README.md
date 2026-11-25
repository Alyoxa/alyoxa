# ALYOXA

Creative technology studio website built with Next.js App Router, Satoshi, and GSAP.

## Development

Use Node.js 24 (`.nvmrc`), then run `npm ci` and `npm run dev`.
Run `npm run build` to verify the production build.

## Existing Netlify deployment

This app stays at the repository root. `netlify.toml` sets the build command to
`npm run build`, the publish directory to `.next`, and Node.js to 24.
Netlify's current Next.js adapter handles API routes and image optimisation.
Keep the existing Netlify site and domain connected to this GitHub repository.
A merge to the connected production branch can deploy the new site automatically.
Use a preview first; this branch does not change the production branch.

### Enquiry email

`POST /api/project-inquiry` sends to `hello@alyoxa.com` via Resend's REST API.
The existing Netlify variables must be named `RESEND_API_KEY` and `RESEND_FROM`.
Their scopes must include Functions and their values must apply to the intended
production/preview context. The sender must belong to a verified Resend domain.
Never commit the API key or prefix it with `NEXT_PUBLIC_`.
For local sending, copy `.env.example` to `.env.local` and fill the values privately.
Failed sends preserve the brief. Identical retry payloads use an idempotency key.
The client email is set as Reply-To. Company and budget are optional.

## Content before launch

- Work examples are labelled concepts. Replace `src/app/work/projects.ts` with real projects.
- Supplied client testimonials are in `src/components/sections/Testimonials/testimonialsData.ts`. Add case-study links when those pages are ready.
- Contact numbers are WhatsApp links in `src/lib/studioContact.ts`.
- The supplied legal documents are stored under `src/app/(legal)/`.

## Compatibility

`/Home` redirects permanently to `/`. The sitemap includes all new public pages.
Existing public social images and brand assets are retained in the deployment branch.

## SEO and search readiness

See [the SEO implementation report](docs/seo-implementation.md) for validation, measured limitations, and owner deployment/submission steps. Run `npm run seo:check` against a local production server (default port 3107). `npm run seo:indexnow` is a dry run; it never submits without `--submit` and valid production ownership. Optional verification variables are documented in `.env.example`.

## Insights journal

The editorial index is `/insights`; ten statically generated articles live under `/insights/[slug]`. Content is in `src/content/insights/posts.json`. The only homepage promotion is a small footer link. See [keyword research and editorial notes](docs/insights-keyword-strategy.md) for evidence, intent mapping, and maintenance. After meaningful revisions, update the article date and rerun the production build and `npm run seo:check`; metadata and sitemap entries derive from the content.
