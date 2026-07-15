import Link from 'next/link';
import { JsonLd } from '@/components/json-ld';
import { projects, publishedPosts, services } from '@/lib/content';
import { createMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = createMetadata({ title: 'Viththiyakaran Nadarajah | Software Developer & IT Support Engineer in Wales', description: site.description, path: '/' });

export default function HomePage() {
  return <>
    <JsonLd data={[
      { '@context': 'https://schema.org', '@type': 'Person', '@id': `${site.url}/#person`, name: site.name, url: site.url, jobTitle: ['Software Developer', 'IT Support Engineer'], address: { '@type': 'PostalAddress', addressLocality: 'Newtown', addressRegion: 'Powys', addressCountry: 'GB' }, knowsAbout: ['.NET', 'React', 'Technical support', 'Business software', 'Cloud technology'] },
      { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, description: site.description, inLanguage: 'en-GB', publisher: { '@id': `${site.url}/#person` } },
      { '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': `${site.url}/#profile`, url: site.url, name: `${site.name} professional profile`, mainEntity: { '@id': `${site.url}/#person` }, isPartOf: { '@id': `${site.url}/#website` } }
    ]} />
    <section className="hero"><div className="shell"><p className="eyebrow">Software developer · IT professional · Newtown, Wales</p><h1>Practical software, clear support and thoughtful web experiences.</h1><p className="lede">I’m Viththiyakaran Nadarajah, a software developer and IT professional based in Newtown, Powys. I explore dependable .NET and React systems, technical support practices, cloud technology and useful business software.</p><div className="actions"><Link className="button" href="/projects">Explore software project case studies</Link><Link className="button secondary" href="/contact">Discuss a role or project</Link></div></div></section>
    <section className="section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>Projects designed around real operational questions</h2></div><p>Detailed case studies explain the problem, architecture, security decisions, trade-offs and honest lessons—not just a list of technologies.</p></div><div className="grid">{projects.map(project => <Link className="card" href={`/projects/${project.slug}`} key={project.slug}><ul className="tags">{project.technologies.slice(0,3).map(t => <li key={t}>{t}</li>)}</ul><h3>{project.title}</h3><p>{project.summary}</p><span className="arrow">Read the {project.title} case study →</span></Link>)}</div></div></section>
    <section className="section tint"><div className="shell"><div className="section-heading"><div><p className="eyebrow">How I can help</p><h2>Technology services for small organisations</h2></div><p>Available for conversations with teams in Newtown, Powys, Mid Wales, wider Wales and UK remote clients.</p></div><div className="grid">{services.map(service => <Link className="card" href={`/services/${service.slug}`} key={service.slug}><h3>{service.title}</h3><p>{service.description}</p><span className="arrow">Explore {service.title.toLowerCase()} →</span></Link>)}</div></div></section>
    <section className="section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Practical notes</p><h2>Latest software and support articles</h2></div><Link href="/blog">Browse all technical articles</Link></div><div className="grid">{publishedPosts.map(post => <Link className="card" href={`/blog/${post.slug}`} key={post.slug}><span className="eyebrow">{post.category}</span><h3>{post.title}</h3><p>{post.description}</p><span className="arrow">Read {post.title.toLowerCase()} →</span></Link>)}</div></div></section>
    <section className="section tint"><div className="shell prose"><p className="eyebrow">Next step</p><h2>Looking for a developer or technical support professional in Wales?</h2><p>I’m open to relevant career opportunities and honest conversations about websites, business software and application support. Share the problem, current constraints and what a useful outcome would look like.</p><Link className="button" href="/contact">Contact Viththiyakaran</Link></div></section>
  </>;
}
