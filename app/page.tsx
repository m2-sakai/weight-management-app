import Link from 'next/link';
import AppLogo from '@/app/ui/AppLogo';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-green-500 p-4 md:h-52">
        <AppLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>夢中になる、新しい自分への第一歩。</strong>
          </p>
          <p>
            ようこそ、最高の自分への旅へ。
            <br />
            私たちの体重管理アプリは、単なる数字を追うだけでなく、あなたが本当に求めている変化をサポートします。
            食事、運動、そしてモチベーションのすべてを一緒に乗り越えましょう。
            目標を達成する喜びを一緒に分かち合い、健康な未来を築きましょう。
          </p>
          <div>
            このアプリは以下の機能を持っています。
            <li>ログイン機能：各ユーザにパーソナライズされています。</li>
            <li>カレンダー機能：毎日の体重を数値で管理することができます。</li>
            <li>グラフ機能：毎日の体重の増減をグラフで視覚的に見ることができます。</li>
            <li>
              チャット機能：優れたAIによる対話を行うことで、あなたにあった食事を提案してくれます。
            </li>
          </div>
          <p>さぁ！以下からログインし、新しい自分の始まりを体験しましょう。</p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>ログイン</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
