import { useState } from 'react';
import useSWR from 'swr';
import PostCard from '../components/PostCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const [query, setQuery] = useState('');
  const { data: posts, error } = useSWR('/api/posts', fetcher);

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  if (error) return <div>Failed to load posts</div>;
  if (!posts) return <div>Loading...</div>;

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
      />
      {filteredPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
