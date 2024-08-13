'use client';

import React, { useState } from 'react';
import useRequestData from '@/app/lib/useRequestData';

const JsonCreatePost = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCreate = () => {
    makeRequest('https://jsonplaceholder.typicode.com/posts', 'POST', { title, body, userId: 1 });
  };

  return (
    <div>
      <h2>Create Post</h2>
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea placeholder='Body' value={body} onChange={(e) => setBody(e.target.value)} />
      <button onClick={handleCreate} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h3>Post Created</h3>
          <p>ID: {data.id}</p>
          <p>Title: {data.title}</p>
          <p>Body: {data.body}</p>
        </div>
      )}
    </div>
  );
};

export default JsonCreatePost;
