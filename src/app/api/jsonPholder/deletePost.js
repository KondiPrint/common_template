import fetcher from '@/app/lib/fetcher';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await fetcher(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      res.status(204).end(); // No content, as it's deleted
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
