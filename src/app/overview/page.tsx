import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーディング規約の概要 | BEM + SMACSS Hybrid",
  description:
    "Tailwind・BEM・SMACSS を組み合わせたハイブリッド運用の基本方針と構造・命名・開発プロセスをまとめた概要ページ。",
};

const sections = [
  {
    title: "1. 基本方針",
    body: [
      "UI は BEM (Block / Element / Modifier) でモジュール化し、SMACSS の Base / Layout / Module / State / Theme レイヤーにマッピングして責務を固定します。",
      "Tailwind は瞬発力が必要なレイアウト調整に使い、SCSS はトークンを参照した再利用パターンと状態管理に集中させます。",
    ],
  },
  {
    title: "2. レイヤーとファイル構成",
    body: [
      "`_base.scss` → `_layout.scss` → `_utilities.scss` → `_states.scss` → `_themes.scss` の順で SMACSS レイヤーを読み込み、`main.scss` で順序を固定します。",
      "各コンポーネントは `c-` の BEM ルールで `src/components` に配置し、ページ固有の `app` フォルダでは Tailwind や `l-` レイアウトヘルパーを組み合わせます。",
    ],
  },
  {
    title: "3. Tailwind と SCSS の棲み分け",
    body: [
      "余白・flex/grid・レスポンシブは Tailwind のユーティリティで即時に調整し、長寿命の構造は `.l-` クラスに切り出します。",
      "ボタンやカードは `.c-` モジュールで BEM を適用し、状態は `.is-` / `.has-` の State レイヤーで制御します。",
    ],
  },
  {
    title: "4. 命名規則",
    body: [
      "Base: 要素セレクタ / カスタムプロパティのみ。Layout: `.l-stack` などページ構造。Module: `.c-card`, `.c-card__header`。State: `.is-active`, `.has-error`。",
      "BEM の Modifier は `.c-button--secondary` のように `--` で宣言し、State レイヤーと併用する場合は `className=\"c-button c-button--md is-disabled\"` の順を推奨します。",
    ],
  },
  {
    title: "5. 禁止事項と注意点",
    body: [
      "Tailwind と SCSS で同一責務を二重定義しない・SMACSS のレイヤー順を崩さない・`!important` で State を上書きしないこと。",
      "ユーティリティ/レイアウト クラスが肥大化したら命名ルールを守ったファイル分割を行い、未使用クラスを棚卸しします。",
    ],
  },
  {
    title: "6. 開発フロー",
    body: [
      "Lint → Unit → Visual Test の順で SMACSS レイヤー崩れや BEM ミスを検知し、PR テンプレートにチェック項目を用意します。",
      "Storybook や Playwright で `.c-` モジュールと `.l-` レイアウトの組み合わせ差分を確認し、トークン未使用や状態クラス漏れをレビューで指摘します。",
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
          Next.js + Tailwind + BEM/SMACSS コーディング規約 概要
        </h1>
        <p className="text-lg leading-relaxed text-slate-600">
          このページでは BEM モジュールと SMACSS レイヤーを前提とした運用ルールの要点を抜粋し、Tailwind とどう組み合わせるかを簡潔に整理しています。詳しい実装手順はガイド一覧から参照してください。
        </p>
      </header>

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
