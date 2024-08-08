'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const storedCookieConsent = localStorage.getItem('cookie_consent');
    setCookieConsent(storedCookieConsent === 'true');
  }, []);

  useEffect(() => {
    if (window.gtag) {
      const newValue = cookieConsent ? 'granted' : 'denied';
      window.gtag('consent', 'update', {
        analytics_storage: newValue,
      });
    }
    localStorage.setItem('cookie_consent', cookieConsent);
  }, [cookieConsent]);

  const isCookiePolicyPage = pathname === '/cookie-policy';

  return (
    <>
      {!cookieConsent && !isCookiePolicyPage && (
        <div className='fixed inset-0 bg-black opacity-50 z-10' aria-hidden='true'></div>
      )}
      <div
        role='alert'
        className={`alert ${
          cookieConsent || isCookiePolicyPage ? 'hidden' : 'fixed inset-y-1/3 bottom-0 h-fit z-20'
        }`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='stroke-info size-12 shrink-0'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
        </svg>
        <p className='max-w-4xl text-sm leading-6'>
          This website uses cookies to enhance your browsing experience, analyze site traffic, and
          serve better user experiences. By continuing to use this site, you consent to our use of
          cookies. Learn more in our{' '}
          <Link className='font-semibold text-[#8A2BE2]' href='/cookie-policy'>
            cookie policy
          </Link>
        </p>
        <div className='space-x-2'>
          <button
            onClick={() => setCookieConsent(true)}
            type='button'
            className='btn btn-sm btn-primary'>
            Accept
          </button>
          <button
            onClick={() => setCookieConsent(false)}
            type='button'
            className='btn btn-sm btn-ghost'>
            Reject all
          </button>
        </div>
      </div>
    </>
  );
}
