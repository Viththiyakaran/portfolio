import Image from 'next/image';
import Link from 'next/link';
import { BlogCard } from '@/components/blog-card';
import { FinalCta } from '@/components/final-cta';
import { JsonLd } from '@/components/json-ld';
import { SimpleIcon } from '@/components/simple-icon';
import { projects, publishedPosts, services } from '@/lib/content';
import { createMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = createMetadata({ title: 'Viththiyakaran Nadarajah | Software Developer in Wales', description: site.description, path: '/' });

const capabilities = [
  { title: 'Build', icon: 'build' as const, description: 'C#, ASP.NET Core, React, TypeScript and SQL applications designed around clear requirements.', tags: ['.NET', 'React', 'SQL'] },
  { title: 'Support', icon: 'support' as const, description: 'Application troubleshooting, user support, documentation and operational problem solving.', tags: ['Diagnostics', 'Users', 'Runbooks'] },
  { title: 'Grow', icon: 'grow' as const, description: 'AWS cloud learning, workflow automation and modern deployment practices.', tags: ['AWS', 'Automation', 'Netlify'] }
];

const serviceIcons = ['website', 'automation', 'support'] as const;

export default function HomePage() {
  const featured = projects[0];
  return <>
    <JsonLd data={[
      { '@context': 'https://schema.org', '@type': 'Person', '@id': `${site.url}/#person`, name: site.name, url: site.url, jobTitle: ['Software Developer', 'IT Support Professional'], address: { '@type': 'PostalAddress', addressLocality: 'Newtown', addressRegion: 'Powys', addressCountry: 'GB' }, knowsAbout: ['C#', '.NET', 'React', 'SQL', 'Application support', 'Business software', 'AWS cloud fundamentals'], sameAs: [site.github, site.linkedin].filter(Boolean) },
      { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, description: site.description, inLanguage: 'en-GB', publisher: { '@id': `${site.url}/#person` } },
      { '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': `${site.url}/#profile`, url: site.url, name: `${site.name} professional profile`, mainEntity: { '@id': `${site.url}/#person` }, isPartOf: { '@id': `${site.url}/#website` } }
    ]} />

    <section className="hero home-hero"><div className="shell hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">Viththiyakaran Nadarajah · Newtown, Wales</p>
        <h1>I build practical software for real operational problems.</h1>
        <p className="lede">Software developer and IT professional working with .NET, React, SQL and modern cloud technologies.</p>
        <div className="actions"><Link className="button" href="/projects">View projects</Link><Link className="button secondary" href="/contact">Contact me</Link></div>
        <nav className="text-links" aria-label="Professional links"><a href={site.github} rel="me noopener">GitHub</a>{site.linkedin && <a href={site.linkedin} rel="me noopener">LinkedIn</a>}</nav>
      </div>
      <article className="hero-project" aria-label={`Featured project: ${featured.title}`}>
        <div className="browser-bar" aria-hidden="true"><span /><span /><span /><small>Project preview</small></div>
        <div className="hero-project-media"><Image src={featured.image} alt={featured.imageAlt} width={1200} height={675} sizes="(max-width: 960px) 100vw, 48vw" priority /></div>
        <div className="hero-project-caption"><div><span className="status"><span aria-hidden="true">●</span>{featured.status}</span><h2>{featured.title}</h2></div><Link href={`/projects/${featured.slug}`} aria-label={`Read the ${featured.title} case study`}>Explore case study <span aria-hidden="true">→</span></Link></div>
      </article>
    </div></section>

    <section className="section tint numbered-section"><div className="shell"><span className="section-number" aria-hidden="true">01</span><div className="section-heading"><div><p className="eyebrow">Professional focus</p><h2>Technical thinking grounded in real operations</h2></div><p>Development, support and continuous learning work together to create software people can understand and maintain.</p></div><div className="capability-grid">{capabilities.map((item) => <article className="capability-card" key={item.title}><SimpleIcon name={item.icon} /><h3>{item.title}</h3><p>{item.description}</p><ul className="tags" aria-label={`${item.title} topics`}>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></article>)}</div></div></section>

    <section className="section featured-work numbered-section"><div className="shell"><span className="section-number" aria-hidden="true">02</span><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>Product-style case studies built around operational questions</h2></div><p>Each project clearly separates explored technology, proposed architecture and current delivery status.</p></div><div className="featured-projects">{projects.map((project, index) => <article className="featured-project" key={project.slug}><div className="featured-project-media"><Image src={project.image} alt={project.imageAlt} width={1200} height={675} sizes="(max-width: 760px) 100vw, 55vw" /></div><div className="featured-project-copy"><span className="status"><span aria-hidden="true">●</span>{project.status}</span><p className="eyebrow">Project {String(index + 1).padStart(2, '0')}</p><h3>{project.title}</h3><p>{project.summary}</p><p className="project-role"><strong>Contribution:</strong> {project.role}</p><ul className="tags">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul><div className="card-links"><Link href={`/projects/${project.slug}`}>Read the {project.title} case study <span aria-hidden="true">→</span></Link>{project.demoUrl && <a href={project.demoUrl} rel="noopener noreferrer">Open live demo</a>}</div></div></article>)}</div></div></section>

    <section className="section services-band numbered-section"><div className="shell"><span className="section-number" aria-hidden="true">03</span><div className="section-heading"><div><p className="eyebrow">How I can help</p><h2>Focused technology services for small organisations</h2></div><p>Available for suitable conversations in Newtown, Powys, Mid Wales, wider Wales and with UK remote clients.</p></div><div className="grid service-grid">{services.map((service, index) => <article className="card service-card" key={service.slug}><div className="card-body"><SimpleIcon name={serviceIcons[index]} /><h3>{service.title}</h3><p>{service.description}</p><strong className="mini-heading">Typical deliverables</strong><ul className="service-deliverables">{service.deliverables.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul><div className="card-links"><Link href={`/services/${service.slug}`}>Explore {service.title.toLowerCase()} <span aria-hidden="true">→</span></Link></div></div></article>)}</div></div></section>

    <section className="section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Practical notes</p><h2>Software and support articles</h2></div><Link href="/blog">Browse all technical articles</Link></div><div className="blog-grid publication-grid">{publishedPosts.map((post) => <BlogCard post={post} headingLevel="h3" key={post.slug} />)}</div></div></section>
    <FinalCta />
  </>;
}
