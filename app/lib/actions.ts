'use server';

import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const CreateUser = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  height: z.string(),
});

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

export async function createAccount(prevState: string | undefined, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    height: formData.get('height'),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return 'FailedSignIn';
  }

  const id = uuidv4();
  const { name, email, password, height } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const heightNum = Number(height);

  try {
    await sql`
		INSERT INTO wm_users (id, name, email, password, height)
		VALUES (${id}, ${name}, ${email}, ${hashedPassword}, ${heightNum})`;
  } catch (error) {
    return 'FailedSignIn';
  }

  redirect('/top');
}