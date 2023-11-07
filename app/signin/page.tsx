import { Metadata } from 'next';
import SignInForm from '@/app/ui/signin/SignInForm';
import AppLogo from '@/app/ui/AppLogo';

export const metadata: Metadata = {
  title: 'サインイン',
};

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-green-500 p-3 md:h-28">
          <div className="w-32 text-white md:w-80">
            <AppLogo />
          </div>
        </div>
        <SignInForm />
      </div>
    </main>
  );
}
