'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ToggleMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const closeDropdown = async () => {
    setMenuOpen(false);
    await new Promise((resolve) => setTimeout(resolve, 0));
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const navLinks = [
    { name: 'Carousel test', href: '/carousel' },
    { name: 'Wonders', href: '/wonders' },
  ];

  const navLinksDrop = [
    { name: 'Page_1', href: '/page_1' },
    { name: 'Page_2', href: '/page_2' },
    { name: 'Page_3', href: '/page_3' },
    { name: 'Page_4', href: '/page_4' },
    { name: 'Page_5', href: '/page_5' },
  ];

  const pathname = usePathname();

  return (
    <div>
      {/* Button to toggle the menu */}
      <label className='btn btn-circle swap swap-rotate'>
        {/* this hidden checkbox controls the state */}
        <input type='checkbox' checked={menuOpen} onChange={toggleMenuOpen} />

        {/* hamburger icon */}
        <svg
          className='swap-off fill-current'
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 512 512'>
          <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
        </svg>

        {/* close icon */}
        <svg
          className='swap-on fill-current'
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 512 512'>
          <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
        </svg>
      </label>

      {/* Menu container */}
      {menuOpen && (
        <div ref={dropdownRef} className='absolute mt-2 shadow-md left-0 right-0 z-10 bg-base-100'>
          {/* Menu items */}
          <ul className='py-2 menu menu-vertical'>
            {navLinks.map((links) => {
              const isActive = pathname.startsWith(links.href);

              return (
                <li key={links.name}>
                  <Link
                    href={links.href}
                    className={isActive ? 'text-primary font-bold' : 'font-normal'}
                    onClick={closeDropdown}>
                    {links.name}
                  </Link>
                </li>
              );
            })}

            <li>
              <details className=''>
                <summary>Playground</summary>
                <ul className='p-2 rounded-t-none '>
                  {navLinksDrop.map((links) => {
                    const isActive = pathname.startsWith(links.href);
                    return (
                      <li key={links.name}>
                        <Link
                          href={links.href}
                          className={isActive ? 'text-primary font-bold' : 'font-normal'}
                          onClick={closeDropdown}>
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
      )}
    </div>
  );
}
