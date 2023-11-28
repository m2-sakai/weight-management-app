import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: any;
      request: {
        nextUrl: any;
      };
    }) {
      const isSignedIn = !!auth?.user;
      const isOnTop = nextUrl.pathname.startsWith('/top');
      if (isOnTop) {
        if (isSignedIn) return true;
        return false;
      } else if (isSignedIn) {
        return Response.redirect(new URL('/top', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
