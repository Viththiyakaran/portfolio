import Link from 'next/link';
import { absoluteUrl } from '@/lib/site';
import { JsonLd } from './json-ld';

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>{items.map((item, index) => <li key={item.href}>{index < items.length - 1 ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}</ol>
    </nav>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.href) })) }} />
  </>;
}
