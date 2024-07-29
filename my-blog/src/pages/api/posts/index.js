import connectToDatabase from '../../../lib/mongodb';

export default async (req, res) => {
  const db = await connectToDatabase();

  if (req.method === 'GET') {
    const posts = await db.collection('posts').find({}).toArray();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const post = req.body;
    const result = await db.collection('posts').insertOne(post);
    res.status(201).json(result);
  }
};
