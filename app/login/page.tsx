import { Metadata } from 'next';
import LoginForm from '@/app/ui/login/LoginForm';
import AppLogo from '@/app/ui/AppLogo';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ログイン',
};

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
          <Link
            className="mb-2 flex h-20 items-end justify-start rounded-md bg-green-500 p-5 md:h-28"
            href="/"
          >
            <div className="w-auto text-white md:w-40">
              <AppLogo />
            </div>
          </Link>
        <LoginForm />
      </div>
    </main>
  );
}
