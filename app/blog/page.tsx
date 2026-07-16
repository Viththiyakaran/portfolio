import { BlogCard } from '@/components/blog-card';
import { JsonLd } from '@/components/json-ld';
import { publishedPosts } from '@/lib/content';
import { createMetadata } from '@/lib/seo';
import { absoluteUrl, site } from '@/lib/site';

export const metadata = createMetadata({ title: 'Software Development Blog', description: 'Practical articles by Viththiyakaran Nadarajah about .NET and React development, secure architecture, technical support and business software.', path: '/blog' });

export default function Blog() {
  return <><JsonLd data={[
    { '@context': 'https://schema.org', '@type': 'Blog', '@id': `${absoluteUrl('/blog')}#blog`, url: absoluteUrl('/blog'), name: `${site.name} software development blog`, description: 'Practical software development, architecture and technical support articles.', publisher: { '@type': 'Person', name: site.name, url: site.url }, blogPost: publishedPosts.map((post) => ({ '@type': 'BlogPosting', headline: post.title, url: absoluteUrl(`/blog/${post.slug}`), datePublished: post.published, dateModified: post.updated })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: site.url }, { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') }] }
  ]} /><header className="page-head"><div className="shell prose"><p className="eyebrow">Blog</p><h1>Software development and technical support notes</h1><p className="lede">Practical explanations of architecture, security, troubleshooting and business software—written to answer useful technical and operational questions.</p></div></header><section className="section"><div className="shell blog-grid">{publishedPosts.map((post) => <BlogCard post={post} key={post.slug} />)}</div></section></>;
}
