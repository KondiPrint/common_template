import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function PrevNext({ data, setCurrentSite, currentSite, dataLength, amountPerSite }) {
  const maxAmountOfSites = Math.ceil(dataLength / amountPerSite);

  return (
    <>
      <aside className='flex flex-col my-10 w-full items-center'>
        <div className='flex gap-2'>
          <button
            className='btn btn-primary text-current sm:hidden'
            onClick={() => setCurrentSite(currentSite - 1)}
            disabled={currentSite <= 0}>
            <FaChevronLeft />
          </button>
          <div className='hidden sm:flex'>
            <div>
              <nav className='isolate inline-flex -space-x-px shadow-sm' aria-label='Pagination'>
                <div className='join'>
                  <button
                    className='join-item text-current btn btn-primary'
                    onClick={() => setCurrentSite(currentSite - 1)}
                    disabled={currentSite <= 0}>
                    <FaChevronLeft />
                  </button>
                  {Array.from({ length: maxAmountOfSites }).map((f, index) => (
                    <button
                      key={index}
                      className={`relative join-item text-current btn ${
                        currentSite === index ? 'bg-secondary' : 'bg-base-100'
                      }`}
                      onClick={() => setCurrentSite(index)}>
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className='join-item text-current btn btn-primary'
                    onClick={() => setCurrentSite(currentSite + 1)}
                    disabled={currentSite + 1 >= Math.ceil(dataLength / amountPerSite)}>
                    <FaChevronRight />
                  </button>
                </div>
              </nav>
            </div>
          </div>
          <button
            className='text-current btn btn-primary sm:hidden'
            onClick={() => setCurrentSite(currentSite + 1)}
            disabled={currentSite + 1 >= Math.ceil(dataLength / amountPerSite)}>
            <FaChevronRight />
          </button>
        </div>

        <div className='text-center mt-5'>
          <p className=''>
            Showing{' '}
            {/* <span className='font-medium'>
              {Math.min(currentSite * amountPerSite + 1, dataLength || 0)}
            </span>{' '}
            to{' '} */}
            <span className='font-semibold'>
              {Math.min((currentSite + 1) * amountPerSite, dataLength || 0)}
            </span>{' '}
            of <span className='font-semibold'>{dataLength || 0}</span> results
          </p>
        </div>
      </aside>
    </>
  );
}
