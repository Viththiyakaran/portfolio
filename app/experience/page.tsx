import Link from 'next/link';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({ title: 'Experience', description: 'Viththiyakaran Nadarajah’s software engineering, technical support, education and operational experience, with an honest skills-focused timeline.', path: '/experience' });

const timeline = [
  { label: 'Technical', title: 'Software engineering experience', text: 'Experience contributing to software work and building a foundation in application development. Exact employer, responsibilities and dates remain a content TODO until verified information is supplied.', skills: ['Application development', 'Technical decisions', 'Problem solving'] },
  { label: 'Technical', title: 'Technical support experience', text: 'Supporting users and technical issues through structured investigation, clear communication and practical resolution. Exact employer and date details remain a content TODO until verified information is supplied.', skills: ['Troubleshooting', 'User communication', 'Issue ownership'] },
  { label: 'Current', title: 'UK operational and supervisory experience', text: 'Responsibility for day-to-day operations, compliance, customer service, problem solving and team coordination. This strengthens my understanding of business processes, clear handovers and accountable decision-making.', skills: ['Leadership', 'Compliance', 'Team coordination', 'Customer communication'] },
  { label: 'Education', title: 'MSc IT studies — UWE Bristol', text: 'Postgraduate IT studies at the University of the West of England, Bristol. Completion status, dates and modules should be added only when verified details are provided.', skills: ['Postgraduate IT study'] },
  { label: 'Education', title: 'B.Tech in Software Technology', text: 'Technical degree background in software technology. Institution, dates and classification remain a content TODO until verified details are provided.', skills: ['Software technology'] }
];

export default function Experience() {
  return <><header className="page-head"><div className="shell prose"><p className="eyebrow">Experience</p><h1>Software, support and operational experience</h1><p className="lede">An honest timeline connecting previous technical experience with the leadership and business-process understanding developed in my current UK work.</p></div></header>
    <section className="section"><div className="shell experience-layout"><div className="timeline">{timeline.map((item) => <article className="timeline-item" key={`${item.label}-${item.title}`}><span className="timeline-label">{item.label}</span><div><h2>{item.title}</h2><p>{item.text}</p><ul className="tags timeline-skills">{item.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div></article>)}</div><aside className="side-card"><strong>Technical direction</strong><p>My technical experience and current project work lead the story, supported by transferable operational strengths.</p><ul><li>Software developer</li><li>Application support analyst</li><li>IT or technical support</li><li>Systems support</li><li>Junior cloud role</li></ul><p>Wales-based, hybrid and suitable UK remote opportunities.</p><Link className="button" href="/contact">Discuss a job opportunity</Link></aside></div></section>
    <section className="section tint"><div className="shell prose"><h2>Evidence across this portfolio</h2><p>Review the <Link href="/projects/qr-facility-access-system">QR access management architecture case study</Link>, the <Link href="/projects/fuelops-rota-planning">FuelOps rota planning concept</Link>, and my article on <Link href="/blog/supportable-business-software">building business software that is easier to support</Link>.</p></div></section>
  </>;
}
