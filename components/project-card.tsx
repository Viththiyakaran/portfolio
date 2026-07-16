import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/content';

export function ProjectCard({ project }: { project: Project }) {
  return <article className="card project-card">
    <div className="card-media"><Image src={project.image} alt={project.imageAlt} width={1200} height={675} sizes="(max-width: 760px) 100vw, 50vw" /></div>
    <div className="card-body">
      <div className="card-meta"><span className="status"><span aria-hidden="true">●</span>{project.status}</span><span>{project.role}</span></div>
      <h2>{project.title}</h2>
      <p>{project.summary}</p>
      <ul className="tags">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
      <div className="card-links"><Link href={`/projects/${project.slug}`}>Read the {project.title} case study</Link>{project.demoUrl && <a href={project.demoUrl} rel="noopener noreferrer">Open live demo</a>}{project.repositoryUrl && <a href={project.repositoryUrl} rel="noopener noreferrer">View source code</a>}</div>
    </div>
  </article>;
}
