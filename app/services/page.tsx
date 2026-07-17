import Link from 'next/link';
import { SimpleIcon } from '@/components/simple-icon';
import { services } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({ title: 'Software & Website Services', description: 'Website development, business software automation and technical support for organisations in Newtown, Powys, Wales and UK remote clients.', path: '/services' });
const icons = ['website', 'automation', 'support'] as const;

export default function Services() {
  return <><header className="page-head"><div className="shell prose"><p className="eyebrow">Services</p><h1>Practical software and website services in Wales</h1><p className="lede">Clear, maintainable technology work for small organisations in Newtown, Powys, Mid Wales, wider Wales and suitable UK remote engagements.</p></div></header><section className="section"><div className="shell grid service-grid">{services.map((service, index) => <article className="card service-card" key={service.slug}><div className="card-body"><SimpleIcon name={icons[index]} /><h2>{service.title}</h2><p>{service.description}</p><strong className="mini-heading">Example deliverables</strong><ul className="service-deliverables">{service.deliverables.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul><div className="card-links"><Link href={`/services/${service.slug}`}>See the {service.title.toLowerCase()} approach <span aria-hidden="true">→</span></Link></div></div></article>)}</div></section></>;
}
