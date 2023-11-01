'use client';

import {
  AdjustmentsVerticalIcon,
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'カレンダー', href: '/top/calender', icon: CalendarIcon },
  {
    name: 'グラフ',
    href: '/top/graph',
    icon: AdjustmentsVerticalIcon,
  },
  { name: 'チャット', href: '/top/chat', icon: ChatBubbleLeftEllipsisIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-50 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-green-50 text-green-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
