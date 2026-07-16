# Viththiyakaran Nadarajah - portfolio

SEO-first Next.js portfolio for a software developer and IT support professional based in Newtown, Powys, Wales.

## Local development

```bash
npm install
npm run dev
```

Run the complete release check before publishing:

```bash
npm run verify
```

This runs ESLint, TypeScript checking, content tests, the SEO audit and the production build.

## Netlify deployment

`netlify.toml` configures the Next.js build, Node 20, security headers and permanent redirects from:

- `https://www.viththiyakaran.co.uk/*`
- `https://dazzling-khapse-99460c.netlify.app/*`

to `https://viththiyakaran.co.uk`.

Middleware adds `X-Robots-Tag: noindex, nofollow, noarchive` to other `*.netlify.app` hosts used for deploy previews and branch deploys.

Configure these production variables:

```text
NEXT_PUBLIC_SITE_URL=https://viththiyakaran.co.uk
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_LINKEDIN_URL=
```

Netlify provides `URL` to the server-side contact route. `/api/contact` validates requests, checks a honeypot and basic rate limit, then passes accepted submissions to the detected Netlify form in `public/netlify-contact.html`.

## SEO architecture

### Metadata and canonical URLs

`lib/seo.ts` is the reusable metadata factory. Every indexable route supplies a unique title, description, self-referencing canonical, robots rule, Open Graph metadata and Twitter card. `lib/site.ts` reads the base from `NEXT_PUBLIC_SITE_URL` and safely defaults to `https://viththiyakaran.co.uk`.

Canonical route paths never include UTM parameters. Next.js normalises trailing slashes. Netlify and Next.js both protect the non-`www` apex as the canonical production host.

### Sitemap, robots and RSS

- `/sitemap.xml` contains public static pages, published posts, projects, services and useful categories with known modification dates.
- `/robots.txt` allows public resources, excludes internal/form/query variants and references the production sitemap.
- `/rss.xml` contains published articles with title, description, author, publication date and canonical URL.
- The root layout includes RSS autodiscovery metadata.

Drafts and noindex routes are excluded.

### Structured data

Reusable JSON-LD rendering lives in `components/json-ld.tsx`.

- Home/About: `Person`, `WebSite`, `ProfilePage`
- Blog: `Blog`, `BreadcrumbList`
- Articles: `BlogPosting`, author, dates, image, reading time and `BreadcrumbList`
- Projects: `CreativeWork` and `BreadcrumbList`
- Services: `Service` and `BreadcrumbList`

Structured data must match visible claims. Do not add ratings, reviews, awards, employer details, prices or qualifications without evidence.

### Blog content

Typed records in `lib/content.ts` support title, SEO title, description, slug, publication and update dates, author, category, tags, featured image and alt text, draft status, related projects/posts, introduction and structured sections. Reading time is calculated from visible content.

Only `publishedPosts` are used for static generation, sitemap, RSS and listings.

### Project content

Project records include:

- honest status and personal role;
- implemented and planned technologies;
- problem, context, users and requirements;
- solution and proposed architecture;
- security and accessibility considerations;
- decisions, trade-offs, challenges, outcomes and lessons;
- optional live demo and repository links.

Do not label a project `Live` without a working deployment. Replace conceptual SVG visuals with original, optimised screenshots only when genuine product imagery exists.

## Images

For new images:

- use descriptive filenames;
- provide accurate alt text, or empty alt text for decoration;
- specify width and height;
- use responsive Next.js Image output;
- lazy-load below-the-fold images;
- prefer WebP or AVIF for raster screenshots.

`/api/og` generates a branded 1200 x 630 fallback Open Graph image.

## Analytics and consent

GA4 loads only when all conditions are true:

- the site is running in production;
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` exists;
- the visitor selected Allow analytics.

Implemented events:

- `page_view`
- `project_view`
- `blog_post_view`
- `github_click`
- `linkedin_click`
- `outbound_link_click`
- `contact_form_start`
- `contact_form_submit`
- `job_opportunity_enquiry`
- `service_enquiry`

Form success events run only after server confirmation. Never send names, email addresses or message text to analytics.

Suggested UTM values:

- CV: `?utm_source=cv&utm_medium=job_application&utm_campaign=software_developer`
- LinkedIn: `?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio`
- Email: `?utm_source=email&utm_medium=direct_outreach&utm_campaign=portfolio`
- Job application: `?utm_source=employer_or_board&utm_medium=job_application&utm_campaign=role_name`

## Privacy, cookies and contact

- `/privacy` explains contact processing and analytics.
- `/cookies` explains preference storage and optional GA4.
- Visitors can accept, reject and later change analytics preferences.
- `/api/contact` provides server validation, request-size checking, honeypot handling and an in-memory rate-limit guard.

The in-memory limiter is a first defensive layer, not a durable distributed rate limiter. For sustained traffic, add Netlify Edge controls, a durable store or a specialist anti-spam service.

## Google Search Console

1. Add a Domain property for `viththiyakaran.co.uk`.
2. Verify ownership through the supplied DNS TXT record.
3. Optionally set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
4. Submit `https://viththiyakaran.co.uk/sitemap.xml`.
5. Inspect the homepage, projects, services and published articles.
6. Request indexing after the final production deployment and redirects are confirmed.
7. Monitor indexing, queries, clicks, impressions and Core Web Vitals.

## Audit every new page

1. Confirm one visible H1 and logical heading structure.
2. Add a unique title and useful description.
3. Confirm the canonical route and index/noindex choice.
4. Validate Open Graph output and image alt text/dimensions.
5. Add truthful structured data that matches visible content.
6. Add descriptive internal links.
7. Ensure drafts are absent from sitemap, RSS and static parameters.
8. Run `npm run verify`.
9. Test keyboard, mobile and form behaviour.
10. Run Lighthouse against the deployed production build and record only measured results.

## Content still required

- verified software engineering employer, dates and responsibilities;
- verified technical support employer, dates and responsibilities;
- B.Tech institution, dates and classification;
- MSc IT dates, modules and completion status;
- real project repositories, implementation status, screenshots and measured outcomes;
- verified LinkedIn profile URL;
- analytics and Search Console IDs;
- genuine legacy URLs requiring redirects.

The current site marks missing facts rather than inventing them.
