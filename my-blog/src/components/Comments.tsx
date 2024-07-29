// /components/Comments.tsx
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { TextField, Button, Card } from '@shadcn/ui';
import { fetcher } from '../utils/fetcher';

const Comments = ({ postId }) => {
  const { data: comments, error } = useSWR(`/api/comments?postId=${postId}`, fetcher);
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async () => {
    await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId, content: comment }),
    });
    setComment('');
    mutate(`/api/comments?postId=${postId}`);
  };

  if (error) return <div>Failed to load comments</div>;
  if (!comments) return <div>Loading...</div>;

  return (
    <div>
      {comments.map((comment) => (
        <Card key={comment._id}>
          <Text>{comment.content}</Text>
        </Card>
      ))}
      <TextField
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <Button onClick={handleCommentSubmit}>Submit</Button>
    </div>
  );
};

export default Comments;
