import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'nazwa@ckziu.elodz.edu.pl' },
        otp: { label: 'otp', type: 'text' },
      },
      async authorize(credentials, req) {
        const { email, otp } = credentials as {
          email: string;
          otp: string;
        };

        // if (!isAuthenticated) {
        //   throw new Error('Invalid Credentials');
        // }

        return { email: email };
      },
    }),
  ],
  pages: {
    signIn: '/zaloguj',
  },
  secret: process.env.ACCESS_TOKEN,
};

export default NextAuth(authOptions);