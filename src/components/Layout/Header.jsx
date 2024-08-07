// 'app/components/Header.js'

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollToTop from './ScrollToTop';
import ToggleMenu from './ToggleMenu';
import ThemeToggler from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { CgProfile } from 'react-icons/cg';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLinks = [{ name: 'Wonders', href: '/wonders' }];

  const navLinksDrop = [
    { name: 'Gallery', href: '/gallery' },
    { name: 'Page_2', href: '/page_2' },
    { name: 'Page_3', href: '/page_3' },
    { name: 'Page_4', href: '/page_4' },
    { name: 'Page_5', href: '/page_5' },
  ];

  const defaultImage = () => {
    return <CgProfile />;
  };

  return (
    <header id='top' className='relative border-b-2 px-2'>
      <nav className='navbar'>
        <div>
          <Link href={'/'} className='btn'>
            Home
          </Link>
        </div>
        <div className='flex-1 gap-2'>
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
          <ToggleMenu />
        </div>

        <div>
          {session ? (
            <div className='dropdown dropdown-end'>
              <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <Image
                    alt='Beautiful profile picture!'
                    width={700}
                    height={700}
                    src={session.user.image || <CgProfile />}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
                <li>
                  <Link href={'/profile'} className='justify-between'>
                    Profile
                    <span className='badge'>New</span>
                  </Link>
                </li>
                <li>
                  <Link href={'/dashboard'} className='justify-between'>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={() => signOut()} className='btn btn-sm btn-error mt-5'>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href={'/signin'} className='btn'>
              Login
            </Link>
          )}
        </div>
      </nav>

      <ScrollToTop />
    </header>
  );
}
