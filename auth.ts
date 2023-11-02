import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User } from './app/types/User';

async function getUser(email: string): Promise<User | undefined> {
  try {
    // const user = await sql<User>`SELECT * from USERS where email=${email}`;
    const user: User = {
      id: 'abcd',
      name: 'm2-sakai',
      email: 'test@gmail.com',
      password: 'password',
      height: 160,
    };
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          if (password === user.password) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
