import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
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
      const isLoggedIn = !!auth?.user;
      const isOnTop = nextUrl.pathname.startsWith('/top');
      if (isOnTop) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/top', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
