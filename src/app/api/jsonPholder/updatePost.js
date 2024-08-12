import fetcher from '@/app/lib/fetcher';

export default async function handler(req, res) {
  const { id } = req.query;
  const { title, body, userId } = req.body;

  if (req.method === 'PUT') {
    try {
      const data = await fetcher(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: { title, body, userId },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
