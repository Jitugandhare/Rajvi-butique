import connectToDatabase from '../../../lib/mongodb';

export default async (req, res) => {
  const db = await connectToDatabase();

  if (req.method === 'GET') {
    const { postId } = req.query;
    const comments = await db.collection('comments').find({ postId }).toArray();
    res.status(200).json(comments);
  } else if (req.method === 'POST') {
    const comment = req.body;
    const result = await db.collection('comments').insertOne(comment);
    res.status(201).json(result);
  }
};
