import { GetServerSideProps } from 'next';
import Comments from '../../components/Comments';
import SocialShare from '@/components/Socialshare';


interface Post {
  _id: string;
  title: string;
  content: string;
}

interface Props {
  post: Post;
}

const PostPage = ({ post }: Props) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post._id}`; 

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <SocialShare url={url} title={post.title} />
      <Comments postId={post._id} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`);

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const post = await res.json();

    return { props: { post } };
  } catch (error) {
    console.error(error);
    return { notFound: true }; /
  }
};

export default PostPage;
