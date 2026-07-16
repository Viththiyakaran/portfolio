import Link from 'next/link';
import { BlogCard } from '@/components/blog-card';
import { JsonLd } from '@/components/json-ld';
import { ProjectCard } from '@/components/project-card';
import { projects, publishedPosts, services } from '@/lib/content';
import { createMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = createMetadata({ title: 'Viththiyakaran Nadarajah | Software Developer in Wales', description: site.description, path: '/' });

const credibility = [
  'Previous software engineering experience',
  'Technical support experience',
  'C#, .NET, React and SQL',
  'Real-world business application projects',
  'Based in Wales',
  'Available for Wales-based, hybrid and UK remote opportunities'
];

export default function HomePage() {
  return <>
    <JsonLd data={[
      { '@context': 'https://schema.org', '@type': 'Person', '@id': `${site.url}/#person`, name: site.name, url: site.url, jobTitle: ['Software Developer', 'IT Support Professional'], address: { '@type': 'PostalAddress', addressLocality: 'Newtown', addressRegion: 'Powys', addressCountry: 'GB' }, knowsAbout: ['C#', '.NET', 'React', 'SQL', 'Application support', 'Business software', 'AWS cloud fundamentals'], sameAs: [site.github, site.linkedin].filter(Boolean) },
      { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, description: site.description, inLanguage: 'en-GB', publisher: { '@id': `${site.url}/#person` } },
      { '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': `${site.url}/#profile`, url: site.url, name: `${site.name} professional profile`, mainEntity: { '@id': `${site.url}/#person` }, isPartOf: { '@id': `${site.url}/#website` } }
    ]} />
    <section className="hero"><div className="shell hero-grid">
      <div>
        <p className="eyebrow">Viththiyakaran Nadarajah · Newtown, Powys, Wales</p>
        <h1>Software developer and IT support professional in Wales</h1>
        <p className="lede">I build practical .NET and React applications, support business systems and design software around real operational requirements.</p>
        <div className="actions"><Link className="button" href="/projects">View my projects</Link><Link className="button secondary" href="/contact">Contact me</Link></div>
        <nav className="text-links" aria-label="Professional links"><a href={site.github} rel="me noopener">GitHub</a>{site.linkedin && <a href={site.linkedin} rel="me noopener">LinkedIn</a>}<Link href="/contact">Contact</Link></nav>
      </div>
      <aside className="hero-card" aria-label="Professional profile summary">
        <p className="eyebrow">Professional focus</p>
        <h2>Development shaped by operational experience</h2>
        <dl><div><dt>Build</dt><dd>C#, .NET, React, TypeScript and SQL</dd></div><div><dt>Support</dt><dd>Applications, incidents, users and business processes</dd></div><div><dt>Explore</dt><dd>AWS cloud foundations and maintainable automation</dd></div></dl>
        <Link href="/experience">Review my experience and transferable strengths</Link>
      </aside>
    </div></section>
    <section className="credibility-section" aria-label="Professional credibility"><div className="shell credibility-grid">{credibility.map((item) => <div key={item}><span aria-hidden="true">✓</span><span>{item}</span></div>)}</div></section>
    <section className="section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>Projects designed around real operational questions</h2></div><p>Each case study separates implemented work, planned technology and proposed architecture, with no invented client outcomes.</p></div><div className="project-grid">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div></div></section>
    <section className="section tint"><div className="shell"><div className="section-heading"><div><p className="eyebrow">How I can help</p><h2>Technology services for small organisations</h2></div><p>Available for conversations with teams in Newtown, Powys, Mid Wales, wider Wales and UK remote clients.</p></div><div className="grid">{services.map((service) => <Link className="card" href={`/services/${service.slug}`} key={service.slug}><div className="card-body"><h3>{service.title}</h3><p>{service.description}</p><span className="arrow">Explore the {service.title.toLowerCase()} service →</span></div></Link>)}</div></div></section>
    <section className="section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Practical notes</p><h2>Latest software and support articles</h2></div><Link href="/blog">Browse all technical articles</Link></div><div className="blog-grid">{publishedPosts.map((post) => <BlogCard post={post} headingLevel="h3" key={post.slug} />)}</div></div></section>
    <section className="section tint"><div className="shell prose"><p className="eyebrow">Next step</p><h2>Looking for a developer or technical support professional in Wales?</h2><p>I am open to software development, application support, IT support, systems and junior cloud opportunities, alongside appropriate small-business technology enquiries.</p><div className="actions"><Link className="button" href="/contact">Contact Viththiyakaran</Link><Link className="button secondary" href="/about">Read my professional background</Link></div></div></section>
  </>;
}
