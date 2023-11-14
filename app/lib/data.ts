'use server';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Weight } from '../types/Weight';

export async function fetchWeights(email: string, month: number) {
  noStore();
  try {
    // カレンダーは前後月も少し表示されるため、3カ月分取得する
    const weight = await sql<Weight>`SELECT *
      FROM wm_weights
      WHERE user_id=(SELECT id FROM wm_users WHERE email=${email}) AND EXTRACT(MONTH FROM date) <= ${
      month + 1
    } AND ${month - 1} <= EXTRACT(MONTH FROM date)`;
    return weight.rows;
  } catch (error) {
    throw new Error('Database Error: Failed to fetch Weight list.');
  }
}

export async function fetchWeightByDate(email: string, date: string) {
  noStore();
  try {
    const weight = await sql<Number>`SELECT weight FROM wm_weight
      WHERE user_id=(SELECT id FROM wm_users WHERE email=${email}) AND date=${date}`;

    return weight.rows[0];
  } catch (error) {
    throw new Error('Database Error: Failed to fetch Weight data.');
  }
}

export async function registerWeight(email: string, weight: number, date: string) {
  try {
    await sql`
		INSERT INTO wm_weights (user_id, weight, date)
		VALUES ((SELECT id from wm_users WHERE email=${email}), ${weight}, ${date})
    ON CONFLICT (user_id, date)
    DO UPDATE SET weight = ${weight}`;
  } catch (error) {
    throw new Error('Database Error: Failed to Register Weight.');
  }
}
