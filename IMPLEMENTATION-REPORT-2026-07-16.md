# Portfolio improvement implementation report

Date: 16 July 2026

## 1. Original problems found

- The homepage hero was single-column, visually oversized and left useful space empty.
- Recruiter-focused details such as UK work status, qualifications, previous engineering/support experience and current operational strengths were missing.
- Project and blog cards relied heavily on text, used fixed three-column grids and did not expose status, role, reading time or implemented-versus-planned technology.
- There was no downloadable CV or verified LinkedIn link.
- The contact form opened `mailto:` and had no server validation, error summary, consent, honeypot or organisation field.
- Privacy and cookie pages were absent, and analytics consent could not be changed after the first choice.
- The canonical origin was correct, but it was hard-coded and the Netlify production subdomain returned `200`, creating a duplicate host.
- There was no `netlify.toml`, preview/branch noindex protection, `typecheck` script or test suite.

## 2. Files changed

Main groups:

- Configuration: `.env.example`, `.gitignore`, `package.json`, `next.config.ts`, `netlify.toml`, `middleware.ts`
- SEO/data: `lib/site.ts`, `lib/content.ts`, `scripts/seo-audit.ts`
- Layout/UI: `app/globals.css`, `app/layout.tsx`, homepage, About, Experience, Projects, Blog, Services and Contact routes
- Components: header, footer, analytics, contact form, cookie preferences, project card and blog card
- New routes: `/api/contact`, `/privacy`, `/cookies`
- Assets: two descriptive project SVG visuals and `viththiyakaran-nadarajah-cv.pdf`
- Validation: `tests/content.test.ts`, `scripts/generate-cv.py`
- Documentation: `README.md`, this implementation report

## 3. UI improvements

- Two-column recruiter-focused hero with a professional information card.
- Requested homepage positioning, actions, work-status statement and compact credibility grid.
- Smaller inner-page headings and more compact vertical rhythm.
- Responsive auto-fit project and blog grids that use available width evenly.
- Equal-height cards with 16:9 visuals, metadata and aligned calls to action.
- Clearer project status, role and technology sections.
- Contact form moved before supporting information on small screens.

## 4. SEO improvements

- Homepage title and description updated for software developer intent in Wales.
- `NEXT_PUBLIC_SITE_URL` added as the single configurable canonical origin.
- Canonical, Open Graph, structured-data, sitemap, RSS and sharing URLs continue to resolve to `https://viththiyakaran.co.uk`.
- Privacy and Cookies added to the sitemap.
- RSS autodiscovery added to the root layout.
- SEO audit expanded to check project status, role, image alt text, accessibility content, CV presence and Netlify host configuration.
- Netlify production subdomain and `www` redirects configured.
- Preview/branch Netlify hosts receive `X-Robots-Tag: noindex, nofollow, noarchive`.

## 5. Accessibility improvements

- Strong visible keyboard focus across links, controls and form fields.
- Accessible mobile menu labels, state and `aria-current`.
- Status uses visible text and an icon rather than colour alone.
- Contact form includes labels, consent, validation messages, error summary focus and status announcements.
- Touch targets are at least 44 pixels for primary controls.
- Reduced-motion handling, responsive code overflow and descriptive image alt text are present.
- Semantic landmarks, skip link, headings and breadcrumbs remain in place.

## 6. Performance improvements

- Public content remains server-rendered or statically generated.
- Project visuals are lightweight local SVG assets with fixed dimensions.
- Next Image supplies responsive sizing and modern format support.
- No animation library or external font request was added.
- GA4 remains non-blocking and consent-gated.
- Shared first-load JavaScript reported by Next.js remains approximately 102 kB; representative content routes report 106-111 kB.

## 7. Analytics events

- `page_view`
- `project_view`
- `blog_post_view`
- `cv_download`
- `github_click`
- `linkedin_click`
- `outbound_link_click`
- `contact_form_start`
- `contact_form_submit`
- `job_opportunity_enquiry`
- `service_enquiry`

Analytics does not run locally and loads in production only after consent. Successful form events occur only after server confirmation.

## 8. Netlify and domain configuration

- `netlify.toml` defines `npm run build`, `.next`, Node 20 and `NEXT_PUBLIC_SITE_URL`.
- Edge redirects cover `www` and `dazzling-khapse-99460c.netlify.app`.
- Next.js contains matching host redirects as defence in depth.
- Middleware adds noindex headers to deploy-preview and branch-deploy hosts.
- Security headers include content-type, referrer, permissions and frame protections.
- HTTPS is currently available on the custom domain. The new duplicate-host redirects require deployment before they can be verified live.

## 9. Sitemap, robots and RSS

- `/sitemap.xml`: generated successfully and contains all intended public route groups.
- `/robots.txt`: generated successfully, references the production sitemap and excludes internal form/API/query routes.
- `/rss.xml`: generated successfully from published posts.
- Local HTTP checks returned `200` with the expected content types.

## 10. Structured-data types

- `Person`
- `WebSite`
- `ProfilePage`
- `Blog`
- `BlogPosting`
- `CreativeWork`
- `Service`
- `BreadcrumbList`

No reviews, ratings, employers, awards, prices or unsupported business schema were added.

## 11. Validation results

- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run test`: 4 tests passed
- `npm run seo:audit`: passed for 17 primary indexable routes
- `npm run build`: passed and generated 28 pages/routes
- Local endpoint checks: sitemap `200`, robots `200`, RSS `200`, CV `200`, missing route `404`
- Contact API: invalid payload `400`, honeypot payload `200`, valid local payload `503` by design because Netlify's `URL` variable exists only in deployment
- CV: rendered to PNG and visually inspected with no clipping or layout defects
- Desktop homepage and Projects screenshots: inspected after local rendering

## 12. Lighthouse

Lighthouse was not run. No Lighthouse scores are claimed.

## 13. Remaining TODO placeholders

- Software engineering employer, dates and detailed responsibilities
- Technical support employer, dates and detailed responsibilities
- B.Tech institution, dates and classification
- MSc IT dates, modules and completion status
- Genuine project repository/demo URLs, current implementation details and original screenshots
- Verified LinkedIn profile URL
- GA4 and Search Console values

## 14. Missing personal content to provide

Provide the verified details above plus any preferred telephone number, final CV wording and genuine project evidence. The generated CV is intentionally factual but incomplete.

## 15. Incomplete or deployment-blocked requirements

- Netlify Forms delivery cannot complete locally; it must be tested after Netlify detects the hidden form.
- Production redirects and preview noindex headers require a new Netlify deployment.
- A persistent distributed rate limiter is not included; the API has an in-memory guard and is ready for a stronger Netlify/Edge-backed limiter.
- LinkedIn is hidden until `NEXT_PUBLIC_LINKEDIN_URL` is supplied.
- Original raster project screenshots are unavailable; labelled conceptual SVG visuals are used.
- Browser screenshot inspection was completed for desktop routes. Mobile behaviour is implemented through responsive CSS but should still be checked on a real phone or browser device emulator after deployment.

## 16. Exact deployment steps

1. Push the changes to the GitHub `main` branch.
2. In Netlify, confirm the repository and production branch are `Viththiyakaran/portfolio` and `main`.
3. Confirm build command `npm run build`, publish directory `.next` and Node version `20`.
4. Add `NEXT_PUBLIC_SITE_URL=https://viththiyakaran.co.uk`.
5. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_LINKEDIN_URL` only when verified.
6. Trigger a clear-cache production deploy so Netlify re-detects the `contact` form.
7. Set `viththiyakaran.co.uk` as the primary custom domain and retain `www` as a redirect alias.
8. Confirm Netlify's automatic TLS certificate is active for both domain names.
9. Submit one real test form and confirm it appears in Netlify Forms and reaches the configured notification destination.

## 17. Checks after deployment

1. Confirm `http://viththiyakaran.co.uk` redirects to HTTPS.
2. Confirm `https://www.viththiyakaran.co.uk/test` redirects to `https://viththiyakaran.co.uk/test`.
3. Confirm `https://dazzling-khapse-99460c.netlify.app/test` redirects to the apex domain.
4. Open a deploy-preview URL and confirm `X-Robots-Tag: noindex, nofollow, noarchive`.
5. Check `/`, `/about`, `/experience`, `/projects`, one project, `/services`, one service, `/blog`, one article, `/contact`, `/privacy`, `/cookies` and a missing route.
6. Check `/sitemap.xml`, `/robots.txt`, `/rss.xml`, `/api/og` and the CV download.
7. Submit invalid and valid contact forms; confirm accessible messages and Netlify delivery.
8. Accept, reject and later change cookie preferences; confirm GA loads only after acceptance.
9. Inspect canonical, Open Graph and structured-data output on representative routes.
10. Test keyboard navigation and the mobile menu on a real phone.
11. Run Lighthouse on the six requested routes and record actual results.
12. Add the Search Console Domain property, submit the sitemap and inspect important URLs.
