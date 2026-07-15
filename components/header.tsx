'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [['/about', 'About'], ['/experience', 'Experience'], ['/projects', 'Projects'], ['/services', 'Services'], ['/blog', 'Blog'], ['/contact', 'Contact']] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header"><div className="shell nav-wrap">
    <Link className="brand" href="/" aria-label="Viththiyakaran Nadarajah, home"><span>VN</span><strong>Viththiyakaran</strong></Link>
    <button className="menu-button" type="button" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>Menu</button>
    <nav id="site-navigation" aria-label="Primary navigation" className={open ? 'nav open' : 'nav'}>{links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(`${href}/`) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
  </div></header>;
}
