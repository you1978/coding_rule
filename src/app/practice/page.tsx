"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { practiceQuestions, type PracticeQuestion } from "@/content/practice";
import "@/components/practice/practice.scss";
import { Badge } from "@/components/badge/Badge";
import { PracticeSummary } from "@/components/practice/PracticeSummary";
import { DifficultyFilter } from "@/components/practice/DifficultyFilter";

const difficultyLabel: Record<string, string> = {
  easy: "初級",
  medium: "中級",
  hard: "上級",
};

type Difficulty = 'all' | keyof typeof difficultyLabel;

export default function PracticePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all');

  const filteredQuestions = useMemo(() => {
    if (selectedDifficulty === 'all') return practiceQuestions;
    return practiceQuestions.filter(q => q.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 md:px-10">
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
        <p className="u-text-muted text-sm">
          各問題は <Link href="/overview" className="text-blue-500 hover:underline">概要ページ</Link> の内容に基づいています。初めての方はまず概要を確認することをお勧めします。
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

      <PracticeSummary />

      <section className="grid gap-6">
        <DifficultyFilter 
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={handleDifficultyChange}
        />
        
        <div className="grid gap-6">
          {filteredQuestions.map((question) => (
          <article
            key={question.id}
            id={question.slug}
            className="c-practice-card"
            aria-labelledby={`${question.slug}-title`}
          >
            <div className="flex items-center justify-between gap-4">
              <span
                id={`${question.slug}-title`}
                className="text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                Q{question.id}
              </span>
              <Badge
                tone={question.difficulty === "easy" ? "success" : question.difficulty === "medium" ? "warning" : "danger"}
                className="text-xs font-semibold"
                aria-label={`難易度: ${difficultyLabel[question.difficulty]}`}
              >
                {difficultyLabel[question.difficulty]}
              </Badge>
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
              <span className="text-slate-400">
                対象ファイル: {question.files.length} 件
              </span>
            </div>
          </article>
        ))}
        </div>
      </section>
    </main>
  );
}
