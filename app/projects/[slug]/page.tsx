import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import { projects, publishedPosts } from '@/lib/content';
import { createMetadata } from '@/lib/seo';
import { absoluteUrl, site } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams(){return projects.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projects.find(x=>x.slug===slug);return p?createMetadata({title:p.title,description:p.description,path:`/projects/${p.slug}`,imageTitle:p.title}):{};}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const project=projects.find(p=>p.slug===slug); if(!project)notFound(); const related=publishedPosts.filter(p=>p.relatedProjects.includes(project.slug));
  const schemaType=project.type;
  return <><div className="shell"><Breadcrumbs items={[{name:'Home',href:'/'},{name:'Projects',href:'/projects'},{name:project.title,href:`/projects/${project.slug}`}]}/></div><header className="page-head"><div className="shell"><p className="eyebrow">Architecture case study</p><h1>{project.title}</h1><p className="lede">{project.summary}</p><ul className="tags">{project.technologies.map(t=><li key={t}>{t}</li>)}</ul></div></header>
  <JsonLd data={{'@context':'https://schema.org','@type':schemaType,'@id':`${absoluteUrl(`/projects/${project.slug}`)}#project`,name:project.title,description:project.description,url:absoluteUrl(`/projects/${project.slug}`),dateModified:project.updated,author:{'@type':'Person',name:site.name,url:site.url},keywords:project.technologies.join(', ')}}/>
  <section className="section"><div className="shell case-layout"><article className="prose"><div className="visual" role="img" aria-label={`${project.title} conceptual architecture illustration`}><div><span className="eyebrow">Conceptual system view</span><strong>Interface → secure API → domain rules → operational data</strong><p>This diagram represents the proposed architecture. Original product screenshots will be added only when a real implementation is available.</p></div></div><h2>Problem</h2><p>{project.problem}</p><h2>Context</h2><p>{project.context}</p><h2>Users</h2><p>{project.users}</p><h2>Requirements</h2><ul>{project.requirements.map(x=><li key={x}>{x}</li>)}</ul><h2>Solution</h2><p>{project.solution}</p><h2>Architecture</h2><p>{project.architecture}</p><h2>Technology</h2><p>{project.technologies.join(', ')} form the proposed stack. Each choice would be validated against hosting constraints, team knowledge and the smallest maintainable deployment.</p><h2>Security considerations</h2><ul>{project.security.map(x=><li key={x}>{x}</li>)}</ul><h2>Challenges</h2><p>{project.challenges}</p><h2>Key decisions</h2><ul>{project.decisions.map(x=><li key={x}>{x}</li>)}</ul><h2>Outcomes and measurement</h2><p>{project.outcomes}</p><h2>Lessons learned</h2><p>{project.lessons}</p>{related.length>0&&<><h2>Related technical articles</h2><ul>{related.map(post=><li key={post.slug}><Link href={`/blog/${post.slug}`}>{post.title}</Link></li>)}</ul></>}</article><aside className="side-card"><strong>Case study details</strong><ul><li>Updated {new Date(project.updated).toLocaleDateString('en-GB',{dateStyle:'long'})}</li><li>{project.technologies.length} proposed technologies</li><li>Clearly labelled portfolio concept</li></ul><Link className="button" href="/contact">Discuss a similar problem</Link></aside></div></section></>;
}
