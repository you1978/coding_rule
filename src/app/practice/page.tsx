"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { practiceQuestions } from "@/content/practice";
import "@/components/practice/practice.scss";
// バッジコンポーネントのインポート
import Badge from "@/components/badge/Badge";
// 練習ページ用のサマリーコンポーネントのインポート
import PracticeSummary from "@/components/practice/PracticeSummary";

const difficultyLabel: Record<string, string> = {
  easy: "初級",
  medium: "中級",
  hard: "上級",
};

// 難易度に応じてバッジのトークンマッピング
const difficultyToneMap: Record<string, "success" | "accent" | "danger"> = {
  easy: "success",   
  medium: "accent",  
  hard: "danger",   
};

export default function PracticePage() {
  // 現在選択されている難易度状態を管理
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  // 課題27-完了状態を管理する useState（id の配列で管理）
  const [completed, setCompleted] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("completedTasks");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // 検索文字列の状態を管理
  const [searchQuery, setSearchQuery] = useState<string>("");


  // 課題27-完了状態を保存
  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completed));
  }, [completed]);

  const filteredQuestions = practiceQuestions
  .filter((q) =>
    selectedDifficulty === "all" ? true : q.difficulty === selectedDifficulty
  )
  .filter((q) =>
    q.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 md:px-10">
      {/* 課題17-ヘッドはクライアントコンポーネントのメタデータを置き換えます */}
      <Head>
        <title>練習問題 | Next.js + Tailwind + SCSS コーディング規約</title>
        <meta
          name="description"
          content="Tailwind と SCSS のコーディング規約を身につけるための練習問題30問。基本から応用まで段階的に学べます。"
        />
      </Head>
      <header className="flex flex-col gap-4 text-center md:text-left">
        <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Practice Set
        </span>
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          コーディング規約 練習問題 30
        </h1>
        <p className="text-lg leading-relaxed text-slate-600 md:max-w-3xl">
          規約の理解度をチェックするために、簡単な確認問題から設計レベルの応用問題まで 30 問用意しました。概要ページや詳細ガイドを参照しつつ、チーム内のトレーニングや自主学習に活用してください。
        </p>
        {/* 課題14-薄い文字で補足説明を表示（概要ページリンク用） */}
        <p className="u-text-muted md:max-w-3xl">
          各問題の概要や進め方については <Link href="/overview" className="underline">概要ページ</Link> をご参照ください。
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
          <Link
            href="/overview"
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            概要を確認する
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            詳細ガイドへ戻る
          </Link>
        </div>
      </header>

      {/* 難易度概要カードを表示する */}
      <PracticeSummary />

      {/* 課題30 - 完了率を示す進捗バー */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between text-sm mb-2 text-slate-600">
          <span>Progress</span>
          <span>
            {completed.length} / {practiceQuestions.length} Completed
          </span>
        </div>

        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-3 bg-blue-500 transition-all duration-300"
            style={{
              width: `${(completed.length / practiceQuestions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* 課題19 - Q1〜Q30 の目次リンクを追加 */}
      <nav className="flex flex-wrap justify-center gap-2 md:gap-3">
        {practiceQuestions.map((q) => (
          <a
            key={q.id}
            href={`#${q.slug}`} // 課題29-Anchorリンク
            className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition"
          >
            Q{q.id}
          </a>
        ))}
      </nav>


      {/* 課題16-難易度フィルターボタン */}
      <div className="flex justify-center gap-3">
        {["all", "easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedDifficulty(level)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              selectedDifficulty === level
                ? "bg-blue-500 text-white border-blue-500"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {level === "all"
              ? "すべて"
              : difficultyLabel[level as keyof typeof difficultyLabel]}
          </button>
        ))}
      </div>

      {/* 課題28-クエリボックスを追加 */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="キーワードで検索"
          className="w-full max-w-md rounded border px-4 py-2 text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <section className="grid gap-6">
        {filteredQuestions.map((question) => (
          <article
            key={question.id}
            id={question.slug} // 課題29-Anchorターゲット
            className={`c-practice-card c-practice-card--${question.difficulty}`} // 課題23
            aria-labelledby={`${question.slug}-title`}
          >
            <div className="flex items-center justify-between gap-4">
              <span
                id={`${question.slug}-title`}
                className="text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                Q{question.id}
              </span>

              <div className="flex items-center gap-2">
                {/* 課題27-チェックボックスの追加 */}
                <input
                  type="checkbox"
                  checked={completed.includes(question.id)}
                  onChange={() => {
                    if (completed.includes(question.id)) {
                      setCompleted(completed.filter((id) => id !== question.id));
                    } else {
                      setCompleted([...completed, question.id]);
                    }
                  }}
                  className="w-4 h-4 accent-blue-500 cursor-pointer"
                />
                <Badge
                  tone={difficultyToneMap[question.difficulty]}
                  aria-label={`難易度: ${difficultyLabel[question.difficulty]}`}
                >
                  {difficultyLabel[question.difficulty]}
                </Badge>
              </div>
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {question.prompt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <Link
                href={`/practice/${question.slug}`}
                className="inline-flex items-center gap-1 font-semibold hover:text-slate-900"
              >
                問題ページへ移動
                <span aria-hidden>→</span>
              </Link>

              {/* 課題22-質問コピーボタン追加 */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(question.prompt);
                  alert(`Q${question.id} の質問をコピーしました！`);
                }}
                className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                質問をコピー
              </button>

              <span className="text-slate-400">
                対象ファイル: {question.files.length} 件
              </span>
            </div>
            {/* 課題-18*/ }
            {question.recommendedGuides && question.recommendedGuides.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-blue-600">
                <span className="font-semibold text-slate-600">関連ガイド:</span>
                {question.recommendedGuides.map((guide) => (
                  <Link
                    key={guide}
                    href={`/guides/${guide}`}
                    className="underline hover:text-blue-800"
                  >
                    {guide}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>
      {/* 課題16-結果が0件のときのメッセージ */}
      {filteredQuestions.length === 0 && (
        <p className="text-center text-slate-500 mt-8">
          該当する問題はありません。
        </p>
      )}
    </main>
  );
}
