'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  ArrowRightIcon,
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../common/Button';
import { useFormState, useFormStatus } from 'react-dom';
import { createAccount } from '@/app/lib/actions';
import Link from 'next/link';
import { MdOutlineHeight, MdOutlineMonitorWeight } from 'react-icons/md';

export default function SignInForm() {
  const [code, action] = useFormState(createAccount, undefined);
  return (
    <form action={action} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-10 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-5 text-1xl`}>
          以下のフォームからサインアップしてください。
        </h1>
        <div className="w-full">
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="name">
            User名
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              name="name"
              type="string"
              placeholder="Enter your user name"
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="w-full">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="height">
              身長
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="height"
                name="height"
                type="number"
                placeholder="Enter your user height"
                required
              />
              <MdOutlineHeight className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="w-full">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="goal">
              目標体重 (kg)
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="goal"
                name="goal"
                type="number"
                placeholder="Enter your user goal weights"
                required
              />
              <MdOutlineMonitorWeight className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <SignInButton />
          <div className="flex h-8 items-end space-x-1">
            {code === 'FailedSignIn' && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p aria-live="polite" className="text-sm text-red-500">
                  サインアップに失敗しました。
                </p>
              </>
            )}
          </div>
          <br />
          <div className="text-right">
            <Link href={'/signin'}>サインインに戻る</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-[150px]" aria-disabled={pending}>
      サインアップ <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
