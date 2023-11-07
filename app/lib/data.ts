import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function selectWeight(userId: string | null, date: string) {
  noStore();
  try {
    const weight =
      await sql<Number>`SELECT weight FROM wm-weight WHERE user_id=${userId} AND date=${date}`;

    return weight.rows[0];
  } catch (error) {
    return {
      message: 'Database Error: Failed to fetch Weight data.',
    };
  }
}

export async function registerWeight(userId: string | null, weight: number, date: string) {
  console.log('registering... ');
  try {
    await sql`
		INSERT INTO wm_weights (user_id, weight, date)
		VALUES (${userId}, ${weight}, ${date})`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Register Weight.',
    };
  }
  console.log('registered Weight');
}
