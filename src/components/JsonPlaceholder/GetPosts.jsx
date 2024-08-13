'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

const JsonGetPosts = ({ data }) => {
  return (
    <>
      <h2>All Posts</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {data &&
          data.map((post) => (
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
    </>
  );
};

export default JsonGetPosts;
