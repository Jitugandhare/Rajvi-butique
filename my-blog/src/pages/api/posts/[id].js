import connectToDatabase from '../../../lib/mongodb';

export default async (req, res) => {
  const db = await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'GET') {
    const post = await db.collection('posts').findOne({ _id: new MongoClient.ObjectId(id) });
    res.status(200).json(post);
  } else if (req.method === 'PUT') {
    const updatedPost = req.body;
    const result = await db.collection('posts').updateOne(
      { _id: new MongoClient.ObjectId(id) },
      { $set: updatedPost }
    );
    res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    const result = await db.collection('posts').deleteOne({ _id: new MongoClient.ObjectId(id) });
    res.status(200).json(result);
  }
};
