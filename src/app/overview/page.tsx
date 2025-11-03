import type { Metadata } from "next";
{/**課題21-CommonCalloutコンポーネント導入 */}
import CommonCallouts from "@/components/callout/CommonCallouts";

export const metadata: Metadata = {
  title: "コーディング規約の概要 | Next.js + Tailwind + SCSS",
  description:
    "Tailwind と SCSS を組み合わせる際の基本方針・構造・命名・開発プロセスをシンプルにまとめた概要ページ。",
};

const sections = [
  {
    title: "1. 基本方針",
    body: [
      "Tailwind はレイアウトや余白など即時調整が必要な箇所で使用し、SCSS は再利用されるUIパターンとデザイントークン管理に集中させます。",
      "コードは「読みやすさ」と「再利用性」を最優先し、複雑なロジックや mixin/function の多用は避けます。",
    ],
  },
  {
    title: "2. レイヤーとファイル構成",
    body: [
      "スタイルは `src/styles` 配下に集約し、_tokens.scss / _base.scss / _utilities.scss / main.scss の4層で管理します。",
      "各コンポーネントは `src/components` に TypeScript と SCSS のペアで配置し、ページ固有の実装は `src/app` 配下にとどめます。",
    ],
  },
  {
    title: "3. Tailwind と SCSS の棲み分け",
    body: [
      "余白・flex/grid・レスポンシブは Tailwind のユーティリティクラスで素早く構築します。",
      "ボタンやカードといったパターンは `.u-` ユーティリティや `.c-` コンポーネントとして SCSS で表現し、トークン変数を必ず参照します。",
    ],
  },
  {
    title: "4. 命名規則",
    body: [
      "ユーティリティは `u-`、コンポーネントは `c-`、レイアウトは `l-`、状態は `is-/has-` のプレフィックスで役割を明確にします。",
      "BEM 記法に従い、Block / Element / Modifier を `.c-card`, `.c-card__header`, `.c-card--highlight` のように命名します。",
    ],
  },
  {
    title: "5. 禁止事項と注意点",
    body: [
      "Tailwind と同一責務の SCSS を重ねないようにし、`!important` や ID セレクタは原則使用しません。",
      "ユーティリティが増えすぎた場合はファイル分割を検討し、未使用クラスを定期的に整理します。",
    ],
  },
  {
    title: "6. 開発フロー",
    body: [
      "ESLint / Prettier / Stylelint を導入し、自動フォーマットと静的解析で規約逸脱を検知します。",
      "Pull Request ではトークンの再利用可否と命名規則の遵守を確認し、Storybook や Playwright などのツールで視覚差分を最小化します。",
    ],
  },
];

export default function OverviewPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 md:px-8">
      <header className="flex flex-col gap-4 text-center md:text-left">
        <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Coding Guidelines Overview
        </span>
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          Next.js + Tailwind + SCSS コーディング規約 概要
        </h1>
        <p className="text-lg leading-relaxed text-slate-600">
          このページでは各ガイドの要点だけを抜粋し、プロジェクトで守るべきルールと意思決定の基準を簡潔に整理しています。詳しい実装手順はガイド一覧から参照してください。
        </p>
      </header>

      {/**課題20-Callout コンポーネントを使用して注意書きとヒントを表示 */}
      {/* <Callout title="注意" tone="warning">
        このページの内容は学習用です。実際のプロジェクトでは適切な規約に従ってください。
      </Callout> */}
      {/* <Callout title="ヒント" tone="info">
        コーディング規約を守ると、チーム開発がスムーズになります。
      </Callout> */}

      {/**課題21-共通の Callout ブロックを追加 */}
      <CommonCallouts />

      <section className="grid gap-6">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
            <ul className="mt-4 grid gap-3 text-base leading-relaxed text-slate-600">
              {section.body.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-slate-400" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
