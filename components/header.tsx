'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [['/about', 'About'], ['/experience', 'Experience'], ['/projects', 'Projects'], ['/services', 'Services'], ['/blog', 'Blog'], ['/contact', 'Contact']] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header"><div className="shell nav-wrap">
    <Link className="brand" href="/" aria-label="Viththiyakaran Nadarajah, home"><span className="brand-mark"><Image src="/images/viththiyakaran-icon.png" alt="" width={256} height={256} priority /></span><strong><span className="brand-full">Viththiyakaran Nadarajah</span><span className="brand-short">Viththiyakaran</span></strong></Link>
    <button className="menu-button" type="button" aria-expanded={open} aria-controls="site-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    <nav id="site-navigation" aria-label="Primary navigation" className={open ? 'nav open' : 'nav'}>{links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(`${href}/`) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
  </div></header>;
}
