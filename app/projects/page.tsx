import { ProjectCard } from '@/components/project-card';
import { projects } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({ title: 'Software Projects', description: 'Detailed .NET, React and business software project case studies by Viththiyakaran Nadarajah, covering architecture, security and lessons learned.', path: '/projects' });

export default function Projects() {
  return <><header className="page-head"><div className="shell prose"><p className="eyebrow">Projects</p><h1>Software project case studies</h1><p className="lede">Project evidence that clearly distinguishes current status, implemented technology and proposed future architecture.</p></div></header><section className="section"><div className="shell project-grid">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div></section></>;
}
