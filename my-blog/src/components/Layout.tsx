// /components/Layout.tsx
import { ReactNode } from 'react';
import { Button, Container, Navbar, Link } from '@shadcn/ui';
import { useSession, signOut } from 'next-auth/react';

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Link href="/">Home</Link>
          </Navbar.Brand>
          <Navbar.End>
            {session ? (
              <>
                <Link href="/posts/new">New Post</Link>
                <Button onClick={() => signOut()}>Sign out</Button>
              </>
            ) : (
              <Link href="/auth/signin">Sign in</Link>
            )}
          </Navbar.End>
        </Container>
      </Navbar>
      <main>{children}</main>
      <footer>
        <Container>
          <p>Footer content here</p>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
