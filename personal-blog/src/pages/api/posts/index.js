import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('personal_blog');

  if (req.method === 'POST') {
    const newPost = await db.collection('posts').insertOne(req.body);
    res.json(newPost);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
