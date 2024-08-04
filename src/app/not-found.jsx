import Link from 'next/link';

export default function NotFound() {
  return (
    <article className='space-y-8'>
      <h1 className='text-9xl w-full select-none text-center font-black text-error'>404</h1>
      <h2 className='text-3xl font-bold capitalize leading-7'>
        You have discovered a secret place
      </h2>
      <h3 className='text-2xl font-medium break-words text-dull'>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </h3>
      <Link href='/' className='btn btn-sm btn-primary hover:animate-heartbeat'>
        &lt;- Go back to Home Page
      </Link>
    </article>
  );
}
