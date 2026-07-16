import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import { projects, publishedPosts } from '@/lib/content';
import { createMetadata } from '@/lib/seo';
import { absoluteUrl, site } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? createMetadata({ title: project.title, description: project.description, path: `/projects/${project.slug}`, imageTitle: project.title }) : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const related = publishedPosts.filter((post) => post.relatedProjects.includes(project.slug));
  return <>
    <div className="shell"><Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Projects', href: '/projects' }, { name: project.title, href: `/projects/${project.slug}` }]} /></div>
    <header className="page-head"><div className="shell"><p className="eyebrow">{project.status}</p><h1>{project.title}</h1><p className="lede">{project.summary}</p><div className="project-facts"><span><strong>Role:</strong> {project.role}</span><span><strong>Status:</strong> {project.status}</span></div></div></header>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': project.type, '@id': `${absoluteUrl(`/projects/${project.slug}`)}#project`, name: project.title, description: project.description, url: absoluteUrl(`/projects/${project.slug}`), image: absoluteUrl(project.image), dateModified: project.updated, author: { '@type': 'Person', name: site.name, url: site.url }, keywords: [...project.technologies, ...project.plannedTechnologies].join(', '), creativeWorkStatus: project.status }} />
    <section className="section"><div className="shell case-layout"><article className="prose">
      <figure className="project-figure"><Image src={project.image} alt={project.imageAlt} width={1200} height={675} sizes="(max-width: 900px) 100vw, 760px" priority /><figcaption>Conceptual interface visual for this {project.status.toLowerCase()}; it is not a screenshot of a live client system.</figcaption></figure>
      <h2>Context</h2><p>{project.context}</p>
      <h2>Business problem</h2><p>{project.problem}</p>
      <h2>Users and roles</h2><p>{project.users}</p>
      <h2>Requirements</h2><ul>{project.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
      <h2>Solution</h2><p>{project.solution}</p>
      <h2>Technology</h2><h3>Implemented or actively explored</h3><ul>{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul><h3>Planned for a future version</h3><ul>{project.plannedTechnologies.map((item) => <li key={item}>{item}</li>)}</ul>
      <h2>Proposed architecture</h2><p>{project.architecture}</p>
      <h2>Security considerations</h2><ul>{project.security.map((item) => <li key={item}>{item}</li>)}</ul>
      <h2>Accessibility considerations</h2><ul>{project.accessibility.map((item) => <li key={item}>{item}</li>)}</ul>
      <h2>Key decisions</h2><ul>{project.decisions.map((item) => <li key={item}>{item}</li>)}</ul>
      <h2>Trade-offs</h2><ul>{project.tradeoffs.map((item) => <li key={item}>{item}</li>)}</ul>
      <h2>Current status</h2><p>This project is currently labelled <strong>{project.status}</strong>. It is not presented as a live client deployment.</p>
      <h2>Challenges</h2><p>{project.challenges}</p>
      <h2>Outcomes and measurement</h2><p>{project.outcomes}</p>
      <h2>Lessons learned</h2><p>{project.lessons}</p>
      {related.length > 0 && <><h2>Related technical articles</h2><ul>{related.map((post) => <li key={post.slug}><Link href={`/blog/${post.slug}`}>{post.title}</Link></li>)}</ul></>}
    </article><aside className="side-card"><strong>Case study details</strong><ul><li>Updated {new Date(project.updated).toLocaleDateString('en-GB', { dateStyle: 'long' })}</li><li>Status: {project.status}</li><li>Role: {project.role}</li></ul>{project.demoUrl && <a className="button" href={project.demoUrl}>Open live demo</a>}{project.repositoryUrl && <a className="button secondary" href={project.repositoryUrl}>View source code</a>}<Link className="button" href={`/contact?enquiry=Software%20development&subject=${encodeURIComponent(project.title)}`}>Discuss a similar problem</Link></aside></div></section>
  </>;
}
