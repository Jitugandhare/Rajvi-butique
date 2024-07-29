import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <aside>
      <nav>
        <Link href="/">Home</Link>
        {session ? (
          <>
            <Link href="/posts/new">New Post</Link>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <Link href="/auth/signin">Sign In</Link>
        )}
      </nav>
    </aside>
  );
}
