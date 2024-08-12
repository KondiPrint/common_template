import fetcher from '@/app/lib/fetcher';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, body, userId } = req.body;

    try {
      const data = await fetcher('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: { title, body, userId },
      });
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
