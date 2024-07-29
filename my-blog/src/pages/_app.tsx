
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ShadcnProvider } from '@shadcn/ui';
import Layout from '../components/Layout';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ShadcnProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShadcnProvider>
    </SessionProvider>
  );
};

export default MyApp;
