import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/ui/globals.css';
import { NextAuthProvider } from '@/app/provider/NextAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | 体重管理アプリ',
    default: '体重管理アプリ',
  },
  description: 'Manage Weight App built with App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <NextAuthProvider> */}
        {children}
        {/* </NextAuthProvider> */}
      </body>
    </html>
  );
}
