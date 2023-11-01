import { Metadata } from 'next';
import LoginForm from '@/app/ui/login/login-form';
import AppLogo from '../ui/app-logo';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-28">
          <div className="w-32 text-white md:w-80">
            <AppLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
