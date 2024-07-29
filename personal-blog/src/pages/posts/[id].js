import { useRouter } from 'next/router';
import { useState } from 'react';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default function Post({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`/api/posts/${post._id}`, { method: 'DELETE' });
    router.push('/');
  };

  const handleSave = async () => {
    await fetch(`/api/posts/${post._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const client = await clientPromise;
  const db = client.db('personal_blog');
  const post = await db.collection('posts').findOne({ _id: new ObjectId(params.id) });
  return { props: { post: JSON.parse(JSON.stringify(post)) } };
}
