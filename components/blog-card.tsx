import Image from 'next/image';
import Link from 'next/link';
import { readingTime, type Post } from '@/lib/content';

export function BlogCard({ post, headingLevel = 'h2' }: { post: Post; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return <article className="card blog-card">
    <div className="card-media"><Image src={post.featuredImage} alt={post.featuredImageAlt} width={1200} height={675} sizes="(max-width: 760px) 100vw, 50vw" /></div>
    <div className="card-body">
      <span className="eyebrow">{post.category}</span>
      <Heading>{post.title}</Heading>
      <p>{post.description}</p>
      <div className="card-meta"><span>{new Date(post.published).toLocaleDateString('en-GB', { dateStyle: 'medium' })}</span>{post.updated !== post.published && <span>Updated {new Date(post.updated).toLocaleDateString('en-GB', { dateStyle: 'medium' })}</span>}<span>{readingTime(post)} min read</span></div>
      <div className="card-links"><Link href={`/blog/${post.slug}`}>Read {post.title.toLowerCase()}</Link></div>
    </div>
  </article>;
}
