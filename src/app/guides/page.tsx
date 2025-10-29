import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card/Card";
import { guideTopics } from "@/content/guides";
import { Callout } from "@/components/callout/Callout";

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
         <Callout>
          これは伏すのテキストでございます。
        </Callout>

        <Callout title="重要" tone="warning">
          これは重要な注意書きです。
        </Callout>

        <Callout title="成功" tone="success">
          操作が正常に完了しました。
        </Callout>
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/overview"
              className="inline-flex items-center justify-center rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              概要を確認する
            </Link>
            <Link
              href="/practice"
              className="u-btn u-btn-accent rounded-full px-6 py-3 text-sm font-medium hover:opacity-90"
            >
              練習問題に挑戦
            </Link>
          </div>
          <span className="text-sm text-slate-500">
            ルール全体の要約は概要ページで確認できます。
          </span>
        </div>
      </header>

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
