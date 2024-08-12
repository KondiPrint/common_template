// src/app/(pages)/jsonPlaceholder/[id].jsx
import fetcher from '@/app/lib/fetcher';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const data = await fetcher(`https://jsonplaceholder.typicode.com/posts/${id}`);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
