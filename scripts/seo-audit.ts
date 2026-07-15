import { projects, publishedPosts, services } from '../lib/content';
import { site } from '../lib/site';

type Item={path:string;title:string;description:string};
const items:Item[]=[
  {path:'/',title:'Viththiyakaran Nadarajah | Software Developer & IT Support Engineer in Wales',description:site.description},
  {path:'/about',title:'About',description:'Learn about Viththiyakaran Nadarajah, a software developer and IT professional in Newtown, Powys, focused on dependable systems and clear support.'},
  {path:'/experience',title:'Experience',description:'Explore Viththiyakaran Nadarajah’s software development and IT support capabilities across .NET, React, troubleshooting and business systems.'},
  {path:'/skills',title:'Skills',description:'Software development and IT support skills spanning .NET, React, TypeScript, SQL, cloud foundations, accessibility, testing and troubleshooting.'},
  {path:'/projects',title:'Software Projects',description:'Detailed .NET, React and business software project case studies by Viththiyakaran Nadarajah, covering architecture, security and lessons learned.'},
  {path:'/services',title:'Software & Website Services',description:'Website development, business software automation and technical support for organisations in Newtown, Powys, Wales and UK remote clients.'},
  {path:'/blog',title:'Software Development Blog',description:'Practical articles by Viththiyakaran Nadarajah about .NET and React development, secure architecture, technical support and business software.'},
  {path:'/contact',title:'Contact',description:'Contact Viththiyakaran Nadarajah about software developer roles, IT support opportunities, websites or business software projects in Wales and remotely.'},
  ...projects.map(p=>({path:`/projects/${p.slug}`,title:p.title,description:p.description})),
  ...services.map(s=>({path:`/services/${s.slug}`,title:s.title,description:s.description})),
  ...publishedPosts.map(p=>({path:`/blog/${p.slug}`,title:p.seoTitle,description:p.description}))
];
const errors:string[]=[];
for(const item of items){if(!item.title.trim())errors.push(`${item.path}: missing title`);if(item.description.length<110||item.description.length>180)errors.push(`${item.path}: description is ${item.description.length} characters`);if(!item.path.startsWith('/'))errors.push(`${item.path}: invalid canonical path`)}
const duplicate=(field:'title'|'description')=>{const seen=new Map<string,string>();for(const item of items){const prior=seen.get(item[field]);if(prior)errors.push(`${item.path}: duplicate ${field} also used by ${prior}`);seen.set(item[field],item.path)}};duplicate('title');duplicate('description');
for(const p of publishedPosts){if(p.draft)errors.push(`${p.slug}: draft included in published posts`);if(!p.featuredImageAlt)errors.push(`${p.slug}: missing featured image alt`);if(!p.sections.length)errors.push(`${p.slug}: empty article`)}
for(const p of projects){for(const related of publishedPosts.filter(x=>x.relatedProjects.includes(p.slug))){if(!related)errors.push(`${p.slug}: invalid related article`)}}
if(errors.length){console.error(`SEO audit failed with ${errors.length} issue(s):\n- ${errors.join('\n- ')}`);process.exit(1)}
console.log(`SEO audit passed: ${items.length} indexable routes, ${projects.length} projects, ${publishedPosts.length} published posts, ${services.length} services.`);
