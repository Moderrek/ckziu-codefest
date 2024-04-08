import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/zaloguj',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPanel = nextUrl.pathname.startsWith('/panel');
      if (isOnPanel) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL(`/panel`, nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
