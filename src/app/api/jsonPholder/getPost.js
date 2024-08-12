// src/app/api/jsonPholder/getPost.js
import fetcher from '@/app/lib/fetcher';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Ensure you use the correct endpoint for fetching posts
      const data = await fetcher('https://jsonplaceholder.typicode.com/posts');
      if (!data) {
        return res.status(404).json({ error: 'No posts found' });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
