import { ContactForm } from '@/components/contact-form';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({ title: 'Contact', description: 'Contact Viththiyakaran Nadarajah about software developer roles, IT support opportunities, websites or business software projects in Wales and remotely.', path: '/contact' });

const validEnquiries = ['Job opportunity', 'Software development', 'IT or application support', 'Website project', 'Business software', 'Technical collaboration', 'General enquiry'];

export default async function Contact({ searchParams }: { searchParams: Promise<{ enquiry?: string; subject?: string }> }) {
  const params = await searchParams;
  const initialEnquiry = validEnquiries.includes(params.enquiry ?? '') ? params.enquiry : '';
  const initialSubject = (params.subject ?? '').slice(0, 180);
  return <><header className="page-head compact-head"><div className="shell prose"><p className="eyebrow">Contact</p><h1>Start a useful conversation</h1><p className="lede">Get in touch about a software development role, application or IT support opportunity, website, business software project or technical collaboration.</p></div></header><section className="section compact-section"><div className="shell contact-grid"><div className="prose contact-intro"><h2>What to include</h2><p>Describe the opportunity or current problem, who it affects, the outcome you need and any important deadline or technical constraint.</p><h2>Location and availability</h2><p>Based in Newtown, Powys. Available for Wales-based, hybrid and suitable UK remote opportunities. Right to work in the UK without sponsorship.</p><h2>Direct email</h2><p><a href="mailto:hello@viththiyakaran.co.uk">hello@viththiyakaran.co.uk</a></p><h2>Response expectations</h2><p>I aim to acknowledge genuine enquiries within two working days. Please do not include passwords, financial information or other sensitive data.</p></div><ContactForm initialEnquiry={initialEnquiry} initialSubject={initialSubject} /></div></section></>;
}
