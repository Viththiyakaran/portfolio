import { ContactForm } from '@/components/contact-form';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({ title: 'Contact', description: 'Contact Viththiyakaran Nadarajah about software developer roles, IT support opportunities, websites or business software projects in Wales and remotely.', path: '/contact' });

const validEnquiries = ['Job opportunity', 'Software development', 'IT or application support', 'Website project', 'Business software', 'Technical collaboration', 'General enquiry'];

export default async function Contact({ searchParams }: { searchParams: Promise<{ enquiry?: string; subject?: string }> }) {
  const params = await searchParams;
  const initialEnquiry = validEnquiries.includes(params.enquiry ?? '') ? params.enquiry : '';
  const initialSubject = (params.subject ?? '').slice(0, 180);
  return <><header className="page-head compact-head contact-head"><div className="shell prose"><p className="eyebrow">Contact</p><h1>Let’s discuss a role or project</h1><p className="lede">Get in touch about a software development role, application or IT support opportunity, website, business software project or technical collaboration.</p></div></header><section className="section compact-section"><div className="shell contact-grid"><div className="prose contact-intro"><div className="contact-detail"><span>Location</span><strong>Newtown, Powys</strong><p>Wales, hybrid and suitable UK remote opportunities.</p></div><div className="contact-detail"><span>Direct email</span><strong><a href="mailto:hello@viththiyakaran.co.uk">hello@viththiyakaran.co.uk</a></strong></div><div className="contact-detail"><span>Expected response</span><strong>Within two working days</strong></div><h2>Useful information to include</h2><p>Describe the opportunity or current problem, who it affects, the outcome you need and any important deadline or technical constraint.</p><p className="fine-note">Please do not include passwords, financial information or other sensitive data.</p></div><ContactForm initialEnquiry={initialEnquiry} initialSubject={initialSubject} /></div></section></>;
}
