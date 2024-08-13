'use client';

import React, { useState } from 'react';
import useRequestData from '@/app/lib/useRequestData';

export default function JsonUpdatePost({ postId }) {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleUpdate = () => {
    makeRequest(`https://jsonplaceholder.typicode.com/posts/${postId}`, 'PUT', {
      title,
      body,
      userId: 1,
    });
  };

  return (
    <>
      <section className='flex flex-col justify-center items-center animate-fade-in my-auto'>
        <form className='space-y-5 p-2 mb-10 sm:mb-0 border-2'>
          <div className='relative indicator w-full'>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=' '
              className='input input-bordered peer focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary valid:border-success focus:valid:border-success focus:valid:ring-success w-full'
            />
            <label
              htmlFor='title'
              className='absolute top-3 left-3 transition-all duration-300 peer-focus:-top-3 peer-focus:-left-1 peer-valid:-top-3 peer-valid:-left-1 peer-focus:bg-base-100 peer-valid:bg-base-100 px-1'>
              Title:
            </label>
          </div>

          <div className='relative indicator w-full'>
            <textarea
              name='content'
              id='content'
              rows='4'
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder=' '
              className='textarea textarea-bordered peer focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary valid:border-success focus:valid:border-success focus:valid:ring-success w-full'></textarea>
            <label
              htmlFor='content'
              className='absolute top-3 left-3 transition-all duration-300 peer-focus:-top-3 peer-focus:-left-1 peer-valid:-top-3 peer-valid:-left-1 peer-focus:bg-base-100 peer-valid:bg-base-100 px-1'>
              Content:
            </label>
          </div>

          <div className='text-center flex'>
            <button
              type='submit'
              onClick={handleUpdate}
              disabled={isLoading}
              className='text-base text-base-100 btn btn-primary w-full md:w-auto md:justify-start hover:animate-heartbeat'>
              {isLoading ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </form>

        {error && <p>{error}</p>}
        {data && (
          <div>
            <h3>Post Updated</h3>
            <p>ID: {data.id}</p>
            <p>Title: {data.title}</p>
            <p>Body: {data.body}</p>
          </div>
        )}
      </section>
    </>
  );
}
