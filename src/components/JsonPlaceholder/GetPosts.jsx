'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AmountPerSite from '../Pagination/AmountPerSite';
import PrevNext from '../Pagination/Prev_Next';

export default function JsonGetPosts({ data }) {
  const [amountPerSite, setAmountPerSite] = useState(5);
  const [currentSite, setCurrentSite] = useState(0);

  const sliceData = (dataToSlice) => {
    return dataToSlice.slice(
      currentSite * amountPerSite,
      currentSite * amountPerSite + amountPerSite
    );
  };

  return (
    <>
      <h2>All Posts</h2>

      <AmountPerSite setAmountPerSite={setAmountPerSite} setCurrentSite={setCurrentSite} />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {data &&
          sliceData(data).map((post) => (
            <div className='card bg-base-100 w-fit shadow-xl' key={post.id}>
              <div className='card-body'>
                <h3 className='card-title'>{post.title}</h3>
                <p>{post.body}</p>
                <div className='card-actions justify-end'>
                  <Link href={`/jsonplaceholder/${post.id}`} className='btn btn-primary'>
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      <PrevNext
        setCurrentSite={setCurrentSite}
        currentSite={currentSite}
        dataLength={data?.length}
        amountPerSite={amountPerSite}
      />
    </>
  );
}
