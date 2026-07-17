import Link from 'next/link';

export function FinalCta() {
  return <section className="final-cta"><div className="shell final-cta-inner"><div><p className="eyebrow">Start a conversation</p><h2>Need a developer or technical support professional in Wales?</h2><p>I am open to relevant software development, application support, technical support and focused business software conversations.</p></div><div className="actions"><Link className="button accent" href="/contact">Contact Viththiyakaran</Link><Link className="button inverse" href="/projects">View projects</Link></div></div></section>;
}
