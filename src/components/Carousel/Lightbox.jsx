'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Lightbox({ image, onClose }) {
  const [animation, setAnimation] = useState('animate-zoom-in');

  const handleCloseClick = () => {
    setAnimation('animate-zoom-out');
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    setAnimation('animate-zoom-in');
  }, [image]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!image) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseClick();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 z-10'
      onClick={handleBackdropClick}>
      <div className={`card w-fit bg-base-100 shadow-xl gap-2 ${animation}`}>
        <figure className='relative'>
          <div className='absolute right-0 top-0'>
            <button
              className='btn btn-square btn-sm rounded-tl-none rounded-br-none rounded-bl-xl bg-opacity-60 border-none'
              onClick={handleCloseClick}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <Image src={image.src} alt={image.txt} width={800} height={800} className='w-3/4 p-2' />
        </figure>
        <div className='pb-2'>
          <p className='text-center'>{image.txt}</p>
        </div>
      </div>
    </div>
  );
}
