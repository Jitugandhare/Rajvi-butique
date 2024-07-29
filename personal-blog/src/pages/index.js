import Link from 'next/link';
import clientPromise from '../lib/mongodb';

export default function Home({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link href={`/posts/${post._id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db('personal_blog');
  const posts = await db.collection('posts').find({}).toArray();
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
}
