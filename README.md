# Viththiyakaran Nadarajah — portfolio

SEO-first Next.js portfolio for a software developer and IT support professional based in Newtown, Powys, Wales.

## Run locally

```bash
npm install
npm run dev
```

Use `npm run seo:audit`, `npm run lint` and `npm run build` before publishing. Copy `.env.example` to `.env.local` only when verification or analytics values are available.

## SEO architecture

### Metadata and canonical URLs

`lib/seo.ts` is the reusable metadata factory. Every indexable route provides a unique title, description, canonical URL, robots rule, Open Graph metadata and Twitter card. The production base is `https://viththiyakaran.co.uk`; canonical URLs never use query parameters. Next.js normalises trailing slashes, and `next.config.ts` permanently redirects the `www` host to the non-`www` domain. The hosting platform and DNS must also force HTTP to HTTPS before launch.

### Sitemap, robots and RSS

- `/sitemap.xml` is generated from static routes, published posts, projects, services and useful categories. It uses known content update dates and excludes drafts/noindex routes.
- `/robots.txt` allows public resources, blocks internal/API/query variants and references the production sitemap.
- `/rss.xml` contains published articles with title, description, author, publication date and canonical URL.

Do not add invented priority or change-frequency values. Update the source content date whenever a page receives a meaningful change.

### Structured data

Reusable JSON-LD rendering lives in `components/json-ld.tsx`. The site implements:

- Home: `Person`, `WebSite`, `ProfilePage`
- Blog: `Blog`, `BreadcrumbList`
- Articles: `BlogPosting`, author, dates, image and `BreadcrumbList`
- Projects: `CreativeWork` and `BreadcrumbList`
- Services: `Service` and `BreadcrumbList`

Structured data must continue to match visible claims. Do not add ratings, reviews, qualifications, awards, employer details, prices or business schema without evidence.

### Blog content fields

Article records in `lib/content.ts` support SEO title, title, description, slug, published and updated dates, author, category, tags, featured image, featured-image alt, draft status, related projects, related posts, introduction and structured sections. Canonical URLs are derived from the production domain so authors cannot accidentally publish a tracking URL as canonical.

Only `publishedPosts` are used for static generation, sitemap, RSS and article listings. Long posts render a table of contents, one H1, logical H2 sections, author details, related projects and previous/next navigation. Add category pages only when they have a useful introduction and enough durable content; do not generate thin tag archives.

### Project content fields

Project records include the problem, context, users, requirements, solution, architecture, technologies, security considerations, challenges, decisions, outcomes and lessons. Current entries are explicitly labelled architecture case studies. Replace conceptual visuals with properly licensed, optimised screenshots only when a real implementation exists.

For new images:

- use descriptive lower-case filenames such as `qr-access-admin-dashboard.webp`;
- provide accurate alt text, or empty alt text for decoration;
- specify intrinsic width and height;
- use responsive Next.js Image output where appropriate;
- lazy-load content images below the fold;
- do not reuse the page title as every alt value.

### Open Graph images

`/api/og` generates a branded 1200×630 image containing the page title, name and domain. Metadata uses it as a fallback for every route. A page can pass a more specific image title; real article or project imagery can replace the fallback later.

## Google Search Console after deployment

1. Open Google Search Console and add a **Domain property** for `viththiyakaran.co.uk`.
2. Add the supplied DNS TXT record with the DNS provider and wait for verification.
3. Optionally set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the verification token; metadata is emitted only when the variable exists.
4. Submit `https://viththiyakaran.co.uk/sitemap.xml`.
5. Inspect the homepage, primary project pages, service pages and published articles with URL Inspection.
6. Request indexing after the canonical HTTPS deployment is live—not while preview URLs are in use.
7. Monitor indexing, Core Web Vitals, clicks, impressions and queries. Investigate exclusions rather than repeatedly requesting indexing.

## Analytics, consent and event measurement

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to a GA4 measurement ID. The analytics script is not loaded until a visitor chooses **Allow analytics** in the consent panel. A declined choice is stored locally and no GA request is made.

The event helper supports these recommended names:

- `page_view` (handled by GA configuration; add route-change tracking if navigation behaviour requires it)
- `blog_post_view`, `project_view`
- `cv_download`
- `contact_submission`, `service_enquiry`
- `github_click`, `linkedin_click`, `external_link_click`

The contact event is implemented. Add tracked CV, GitHub and LinkedIn links when their verified URLs/assets are supplied. Never send message contents, email addresses or other personal data to analytics.

Canonical URLs omit UTM values. Suggested sharing links:

- LinkedIn: `?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio`
- CV: `?utm_source=cv&utm_medium=job_application&utm_campaign=software_developer`
- Email: `?utm_source=email&utm_medium=direct_outreach&utm_campaign=portfolio`
- Other social: `?utm_source=platform_name&utm_medium=social&utm_campaign=portfolio`
- Job application: `?utm_source=employer_or_board&utm_medium=job_application&utm_campaign=role_name`

Use lower-case, stable values and never put personal recipient data into UTM parameters.

## Redirects and deployment

`next.config.ts` contains permanent redirects for `www`, legacy `/work/:slug` and `/articles/:slug` routes. Add explicit old-to-new mappings when real legacy URLs are known. Do not redirect unrelated missing URLs to the homepage; the custom `not-found.tsx` returns the framework’s true 404 response.

At the hosting layer:

1. Point the apex domain at the production deployment.
2. Attach `www` and enforce its 308 redirect to the apex domain.
3. Enforce HTTP to HTTPS for both hosts.
4. Prevent preview/development deployments from being indexed using platform access controls or an `X-Robots-Tag: noindex` header.

## Audit every new page

Before publishing:

1. Confirm one visible H1 and logical H2/H3 hierarchy.
2. Add a unique, intent-focused title and 140–160 character description where practical.
3. Confirm the canonical route and index/noindex choice.
4. Validate Open Graph output and all visible image alt text/dimensions.
5. Add truthful structured data that matches visible content.
6. Add descriptive internal links from and to relevant pages.
7. Confirm draft content is absent from sitemap, RSS and static parameters.
8. Run `npm run seo:audit`, `npm run lint` and `npm run build`.
9. Test keyboard navigation, mobile layouts, forms, code blocks and tables.
10. Run Lighthouse against production-mode pages. Record scores only from an actual run.

## Current content placeholders

Before presenting this as a final professional record, supply and verify:

- employment history, dates and responsibilities;
- qualifications or certifications;
- real project status, repositories, screenshots and measured outcomes;
- CV asset and verified GitHub/LinkedIn profile URLs;
- final contact handling or privacy notice if a server-side form provider is introduced;
- analytics and Search Console IDs;
- any genuine legacy URLs requiring redirects.

The current copy deliberately avoids making up those facts.
