import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card/Card";
import { guideTopics } from "@/content/guides";
import CommonCallouts from "@/components/callout/CommonCallouts";

export const metadata: Metadata = {
  title: "ガイドライン一覧 | Next.js + Tailwind + SCSS",
  description:
    "Tailwind と SCSS のコーディング規約を項目ごとに解説するガイド一覧ページです。",
};

export default function GuidesIndex() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 md:px-12">
      <header className="flex flex-col gap-4 text-center md:text-left">
        <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Guides
        </span>
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          コーディング規約の詳細ガイド
        </h1>
        <p className="text-lg text-slate-600 md:max-w-3xl">
          各項目ごとの実装手順と運用のコツをまとめました。Tailwind と SCSS を組み合わせた開発のベストプラクティスを、具体的なステップとチェックリスト付きで確認できます。
        </p>
        <p className="text-sm text-slate-500 md:max-w-3xl">
          練習問題で手を動かしたい方は
          <Link href="/practice" className="ml-2 font-semibold text-slate-900 underline">
            Practice セクション
          </Link>
          を参照してください。
        </p>
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
          <Link
            href="/overview"
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            概要を確認する
          </Link>
          <span className="text-sm text-slate-500">
            ルール全体の要約は概要ページで確認できます。
          </span>
        </div>
        {/* 課題15- /practice ページへ移動するCTAボタン */}
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
          <Link
            href="/practice"
            className="u-btn u-btn--accent"
          >
            練習問題に挑戦する
          </Link>
        </div>
      </header>

      {/* 課題21-共通の Callout ブロックを追加 */}
      <CommonCallouts />

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {guideTopics.map((topic) => (
          <Card
            key={topic.slug}
            title={topic.title}
            content={topic.lead}
            actions={[{ label: "詳しく見る", href: `/guides/${topic.slug}` }]}
          />
        ))}
      </section>
    </main>
  );
}
