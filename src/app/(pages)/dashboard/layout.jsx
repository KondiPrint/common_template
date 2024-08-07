'use client';

import { useSession } from 'next-auth/react';

export default function DashboardLayout({ children, users, revenue, notifications, login }) {
  const { data: session, status } = useSession();

  const isLoggedIn = !!session;
  return isLoggedIn ? (
    <section>
      <div className=''>{children}</div>
      <div className='flex flex-wrap'>
        <div className='flex flex-col'>
          {users}
          {revenue}
        </div>
        <div className='flex flex-1'>{notifications}</div>
      </div>
    </section>
  ) : (
    <div>{login}</div>
  );
}
