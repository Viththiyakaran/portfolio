import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogCard } from '@/components/blog-card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { publishedPosts } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const categories = [...new Set(publishedPosts.map((post) => post.category))];
export const dynamicParams = false;
export function generateStaticParams() { return categories.map((category) => ({ category: slugify(category) })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const name = categories.find((item) => slugify(item) === category);
  return name ? createMetadata({ title: `${name} Articles`, description: `Practical ${name.toLowerCase()} articles covering software decisions, supportability and implementation lessons.`, path: `/blog/category/${category}` }) : {};
}

export default async function Category({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const name = categories.find((item) => slugify(item) === category);
  if (!name) notFound();
  const matches = publishedPosts.filter((post) => post.category === name);
  return <><div className="shell"><Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name, href: `/blog/category/${category}` }]} /></div><header className="page-head"><div className="shell prose"><p className="eyebrow">Blog category</p><h1>{name} articles</h1><p className="lede">Focused, practical writing about {name.toLowerCase()}, connecting technical choices to users and operations.</p></div></header><section className="section"><div className="shell blog-grid">{matches.map((post) => <BlogCard post={post} key={post.slug} />)}</div></section></>;
}
