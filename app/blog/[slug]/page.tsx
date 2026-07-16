import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import { posts, projects, publishedPosts, readingTime } from '@/lib/content';
import { createMetadata } from '@/lib/seo';
import { absoluteUrl, site } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return publishedPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  return post ? createMetadata({ title: post.seoTitle, description: post.description, path: `/blog/${post.slug}`, type: 'article', noIndex: post.draft, publishedTime: post.published, modifiedTime: post.updated, imageTitle: post.title }) : {};
}
const id = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = publishedPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const index = publishedPosts.findIndex((item) => item.slug === slug);
  const previous = publishedPosts[index - 1];
  const next = publishedPosts[index + 1];
  const relatedProjects = projects.filter((project) => post.relatedProjects.includes(project.slug));
  const relatedPosts = publishedPosts.filter((item) => post.relatedPosts.includes(item.slug));
  return <>
    <div className="shell"><Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: post.title, href: `/blog/${post.slug}` }]} /></div>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${absoluteUrl(`/blog/${post.slug}`)}#article`, headline: post.title, description: post.description, image: absoluteUrl(post.featuredImage), datePublished: post.published, dateModified: post.updated, author: { '@type': 'Person', name: post.author, url: site.url }, publisher: { '@type': 'Person', name: site.name, url: site.url }, mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug}`) }, url: absoluteUrl(`/blog/${post.slug}`), keywords: post.tags.join(', '), articleSection: post.category, timeRequired: `PT${readingTime(post)}M` }} />
    <header className="page-head"><div className="shell prose"><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="lede">{post.intro}</p><div className="article-meta"><span>By {post.author}</span><span>Published {new Date(post.published).toLocaleDateString('en-GB')}</span><span>Updated {new Date(post.updated).toLocaleDateString('en-GB')}</span><span>{readingTime(post)} min read</span></div></div></header>
    <section className="section"><div className="shell case-layout"><article className="prose">
      <figure className="project-figure"><Image src={post.featuredImage} alt={post.featuredImageAlt} width={1200} height={675} sizes="(max-width: 900px) 100vw, 760px" priority /></figure>
      <nav className="toc" aria-label="Table of contents"><strong>On this page</strong><ol>{post.sections.map((section) => <li key={section.heading}><a href={`#${id(section.heading)}`}>{section.heading}</a></li>)}</ol></nav>
      {post.sections.map((section) => <section key={section.heading}><h2 id={id(section.heading)}>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
      {relatedProjects.length > 0 && <><h2>Related projects</h2>{relatedProjects.map((project) => <p key={project.slug}><Link href={`/projects/${project.slug}`}>See how these ideas shape the {project.title} case study</Link>.</p>)}</>}
      {relatedPosts.length > 0 && <><h2>Related articles</h2><ul>{relatedPosts.map((item) => <li key={item.slug}><Link href={`/blog/${item.slug}`}>{item.title}</Link></li>)}</ul></>}
      <div className="author-box"><div className="avatar" aria-hidden="true">VN</div><div><strong>About Viththiyakaran Nadarajah</strong><p>Software developer and IT professional in Newtown, Powys, writing about dependable applications, technical support and useful business technology.</p><Link href="/about">About Viththiyakaran and his working approach</Link></div></div>
      <nav className="post-nav" aria-label="Article navigation">{previous ? <Link href={`/blog/${previous.slug}`}>← Previous: {previous.title}</Link> : <span />}{next && <Link href={`/blog/${next.slug}`}>Next: {next.title} →</Link>}</nav>
    </article><aside className="side-card"><strong>Article topics</strong><ul>{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><a className="button" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absoluteUrl(`/blog/${post.slug}`))}`} rel="noopener noreferrer" target="_blank">Share on LinkedIn</a></aside></div></section>
  </>;
}
