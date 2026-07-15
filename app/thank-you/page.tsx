import Link from 'next/link'; import { createMetadata } from '@/lib/seo';
export const metadata=createMetadata({title:'Thank You',description:'Thank you for contacting Viththiyakaran Nadarajah.',path:'/thank-you',noIndex:true});
export default function Thanks(){return <section className="hero"><div className="shell prose"><p className="eyebrow">Message prepared</p><h1>Thank you for getting in touch.</h1><p className="lede">Return to the portfolio while your email is on its way.</p><Link className="button" href="/projects">Explore software projects</Link></div></section>}
