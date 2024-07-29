import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('personal_blog');

  switch (req.method) {
    case 'GET':
      const post = await db.collection('posts').findOne({ _id: new ObjectId(req.query.id) });
      res.json(post);
      break;
    case 'PUT':
      const updatedPost = await db.collection('posts').updateOne(
        { _id: new ObjectId(req.query.id) },
        { $set: req.body }
      );
      res.json(updatedPost);
      break;
    case 'DELETE':
      const deletedPost = await db.collection('posts').deleteOne({ _id: new ObjectId(req.query.id) });
      res.json(deletedPost);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
