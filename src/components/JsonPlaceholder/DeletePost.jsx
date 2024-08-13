'use client';

import React from 'react';
import useRequestData from '@/app/lib/useRequestData';
import { MdDeleteForever } from 'react-icons/md';

export default function JsonDeletePost({ postId }) {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const handleDelete = () => {
    makeRequest(`https://jsonplaceholder.typicode.com/posts/${postId}`, 'DELETE');
  };

  return (
    <>
      <button onClick={handleDelete} disabled={isLoading} className='btn btn-small btn-ghost'>
        {isLoading ? 'Deleting...' : <MdDeleteForever className='text-red-800 size-8' />}
      </button>

      {error && <p>{error}</p>}
    </>
  );
}
