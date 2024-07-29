// /components/PostCard.tsx
import { Card, Text, Link } from '@shadcn/ui';

const PostCard = ({ post }) => {
  return (
    <Card>
      <Text variant="h2">{post.title}</Text>
      <Text>{post.content.substring(0, 100)}...</Text>
      <Link href={`/posts/${post._id}`} variant="button">Read more</Link>
    </Card>
  );
};

export default PostCard;
