'use server';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Weight } from '../types/Weight';

export async function fetchWeights(userId: string, month: number) {
  noStore();
  try {
    const weight = await sql<Weight>`SELECT *
      FROM wm_weights
      WHERE user_id=${userId} AND EXTRACT(MONTH FROM date) = ${month}`;
    return weight.rows;
  } catch (error) {
    throw new Error('Database Error: Failed to fetch Weight list.');
  }
}

export async function fetchWeightByDate(userId: string, date: string) {
  noStore();
  try {
    const weight =
      await sql<Number>`SELECT weight FROM wm-weight WHERE user_id=${userId} AND date=${date}`;

    return weight.rows[0];
  } catch (error) {
    throw new Error('Database Error: Failed to fetch Weight data.');
  }
}

export async function registerWeight(userId: string | null, weight: number, date: string) {
  try {
    await sql`
		INSERT INTO wm_weights (user_id, weight, date)
		VALUES (${userId}, ${weight}, ${date})
    ON CONFLICT (user_id, date)
    DO UPDATE SET weight = ${weight}`;
  } catch (error) {
    throw new Error('Database Error: Failed to Register Weight.');
  }
}
