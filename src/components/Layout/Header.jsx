'use client';

import React from 'react';
import Link from 'next/link';
import ScrollToTop from './ScrollToTop';
import ThemeToggler from './ThemeToggle';
import { usePathname } from 'next/navigation';
import DrawerMenu from './DrawerMenu';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [{ name: 'Wonders', href: '/wonders' }];

  const navLinksDrop = [
    { name: 'Gallery', href: '/gallery' },
    { name: 'Posts', href: '/jsonplaceholder' },
    { name: 'Page_2', href: '/page_2' },
    { name: 'Page_3', href: '/page_3' },
    { name: 'Page_4', href: '/page_4' },
    { name: 'Page_5', href: '/page_5' },
  ];

  return (
    <header id='top' className='relative border-b-2 px-2'>
      <nav className='navbar'>
        <div className='flex-1 gap-4'>
          <Link href={'/'} className='btn'>
            Home
          </Link>

          <ThemeToggler />
        </div>

        <div className='flex-none hidden sm:flex'>
          <ul className='menu menu-horizontal px-1'>
            {navLinks.map((links) => {
              const isActive = pathname.startsWith(links.href);

              return (
                <li key={links.name} className=''>
                  <Link
                    href={links.href}
                    className={isActive ? 'text-primary font-bold' : 'font-normal'}>
                    {links.name}
                  </Link>
                </li>
              );
            })}

            <li>
              <details className=''>
                <summary>Playground</summary>
                <ul className='p-2 rounded-t-none'>
                  {navLinksDrop.map((links) => {
                    const isActive = pathname.startsWith(links.href);
                    return (
                      <li key={links.name}>
                        <Link
                          href={links.href}
                          className={isActive ? 'text-primary font-bold' : 'font-normal'}>
                          {links.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div className='sm:hidden'>
          {/* <ToggleMenu /> */}
          <DrawerMenu />
        </div>
      </nav>

      <ScrollToTop />
    </header>
  );
}
