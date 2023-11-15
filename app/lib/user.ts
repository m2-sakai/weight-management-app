'use server';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { User } from '@/app/types/User';

export const getUser = async (email: string): Promise<User> => {
  noStore();
  try {
    const user = await sql<User>`SELECT *
		FROM wm_users
		WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    throw new Error('Database Error: Failed to get user for calender.');
  }
};
