import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '../../../lib/mongodb';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const db = await connectToDatabase();
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (user && user.password === credentials.password) {
          return { id: user._id, name: user.name, email: user.email };
        }
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
});
