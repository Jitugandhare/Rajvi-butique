import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '../../../lib/mongodb';
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db('personal_blog');
        const user = await db.collection('users').findOne({ email: credentials.email });
        if (user && (await compare(credentials.password, user.password))) {
          return { id: user._id, email: user.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
});
