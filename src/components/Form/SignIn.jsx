// app/login/page.js

'use client';

import { getProviders, signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [providers, setProviders] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const handleSignUp = (event) => {
    event.preventDefault();
    setMessage('Your account has been created.');
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const result = await signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    });

    if (result.ok) {
      setMessage(`Welcome, ${credentials.username}`);
    } else {
      setMessage('Invalid username or password.');
    }
  };

  if (status === 'authenticated') {
    return (
      <div>
        <h1>Welcome, {session.user.name}</h1>
        <button onClick={() => router.push('/')}>Go to Homepage</button>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center animate-fade-in my-auto p-2'>
      <h1>Sign In</h1>
      {message && <p>{message}</p>}
      {isSignUp ? (
        <form onSubmit={handleSignUp} className='space-y-5 p-2 mb-10 sm:mb-0 border-2'>
          <h2>Sign Up</h2>
          <div className='relative indicator w-full'>
            <input
              type='text'
              name='username'
              id='username'
              required
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder=' '
              className='input input-bordered peer focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary valid:border-success focus:valid:border-success focus:valid:ring-success w-full'
            />
            <label
              htmlFor='username'
              className='absolute top-3 left-3 transition-all duration-300 peer-focus:-top-3 peer-focus:-left-1 peer-valid:-top-3 peer-valid:-left-1 peer-focus:bg-base-100 peer-valid:bg-base-100 px-1'>
              Username:
            </label>
            <span className='indicator-item indicator-center badge peer-focus:hidden'>
              Required
            </span>
          </div>

          <div className='relative indicator w-full'>
            <input
              type='password'
              name='password'
              id='password'
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder=' '
              className='input input-bordered peer focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary valid:border-success focus:valid:border-success focus:valid:ring-success w-full'
            />
            <label
              htmlFor='password'
              className='absolute top-3 left-3 transition-all duration-300 peer-focus:-top-3 peer-focus:-left-1 peer-valid:-top-3 peer-valid:-left-1 peer-focus:bg-base-100 peer-valid:bg-base-100 px-1'>
              Password:
            </label>
            <span className='indicator-item indicator-center badge peer-focus:hidden'>
              Required
            </span>
          </div>

          <div className='flex justify-between'>
            <button className='btn btn-success' type='submit'>
              Sign Up
            </button>
            <button className='btn-link' type='button' onClick={() => setIsSignUp(false)}>
              Already have an account?
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSignIn} className='space-y-5 p-2 mb-10 sm:mb-0 border-2'>
          <h2>Sign In with Credentials</h2>

          <div className='relative indicator w-full'>
            <input
              type='text'
              name='username'
              id='username'
              required
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder=' '
              className='input input-bordered peer focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary valid:border-success focus:valid:border-success focus:valid:ring-success w-full'
            />
            <label
              htmlFor='name'
              className='absolute top-3 left-3 transition-all duration-300 peer-focus:-top-3 peer-focus:-left-1 peer-valid:-top-3 peer-valid:-left-1 peer-focus:bg-base-100 peer-valid:bg-base-100 px-1'>
              Username:
            </label>
            <span className='indicator-item indicator-center badge peer-focus:hidden'>
              Required
            </span>
          </div>

          <div className='relative indicator w-full'>
            <input
              type='password'
              name='password'
              id='password'
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder=' '
              className='input input-bordered peer focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary valid:border-success focus:valid:border-success focus:valid:ring-success w-full'
            />
            <label
              htmlFor='password'
              className='absolute top-3 left-3 transition-all duration-300 peer-focus:-top-3 peer-focus:-left-1 peer-valid:-top-3 peer-valid:-left-1 peer-focus:bg-base-100 peer-valid:bg-base-100 px-1'>
              Password:
            </label>
            <span className='indicator-item indicator-center badge peer-focus:hidden'>
              Required
            </span>
          </div>
          <div className='flex justify-between'>
            <button type='submit' className='btn btn-success'>
              Sign In
            </button>
            <button type='button' onClick={() => setIsSignUp(true)} className='btn-link'>
              Create an account
            </button>
          </div>
        </form>
      )}

      <div>
        <h2>Sign In with a Provider</h2>
        {providers &&
          Object.values(providers).map(
            (provider) =>
              provider.id !== 'credentials' && (
                <div key={provider.name}>
                  <button onClick={() => signIn(provider.id)} className='btn'>
                    {provider.name}
                  </button>
                </div>
              )
          )}
      </div>
    </div>
  );
}
