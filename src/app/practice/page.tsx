"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { practiceQuestions } from "@/content/practice";
import "@/components/practice/practice.scss";
import { Badge } from "@/components/badge/Badge";
import { PracticeSummary } from "@/components/practice/PracticeSummary";
import { DifficultyFilter } from "@/components/practice/DifficultyFilter";
import { CopyButton } from "@/components/ui/CopyButton";

const difficultyLabel: Record<string, string> = {
  easy: "初級",
  medium: "中級",
  hard: "上級",
};

type Difficulty = 'all' | keyof typeof difficultyLabel;

export default function PracticePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>(
    () => JSON.parse(localStorage.getItem('completedPracticeQuestions') || '{}')
  );

  useEffect(() => {
    localStorage.setItem('completedPracticeQuestions', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestionCompletion = (questionId: string) => {
    setCompletedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const filteredQuestions = useMemo(() => {
    let result = [...practiceQuestions];

    // Apply difficulty filter
    if (selectedDifficulty !== 'all') {
      result = result.filter(q => q.difficulty === selectedDifficulty);
    }

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(q => 
        q.prompt.toLowerCase().includes(query) ||
        q.files.some(file => file.toLowerCase().includes(query))
      );
    }

    return result;
  }, [selectedDifficulty, searchQuery]);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

      <PracticeSummary completedQuestions={completedQuestions} />

      <section className="grid gap-6">
        {/* Table of Contents */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">問題一覧</h2>
          <div className="grid gap-2">
            {filteredQuestions.map((question) => (
              <a
                key={question.id}
                href={`#${question.slug}`}
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-1 flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(question.slug);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `#${question.slug}`);
                  }
                }}
              >
                <span className="w-6 text-slate-500 font-mono">{question.id}.</span>
                {question.prompt.substring(0, 50)}{question.prompt.length > 50 ? '...' : ''}
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">問題一覧</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {practiceQuestions.map((question) => (
              <a
                key={question.id}
                href={`#${question.slug}`}
                className="group flex items-center justify-center rounded-md border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(question.slug);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Update URL without page reload
                    window.history.pushState(null, '', `#${question.slug}`);
                  }
                }}
              >
                <span className="group-hover:font-semibold">
                  Q{question.id}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="問題文やファイル名で検索..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2 pl-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="問題を検索"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <DifficultyFilter 
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={handleDifficultyChange}
          />
        </div>
        
        {filteredQuestions.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">条件に一致する問題が見つかりませんでした。</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('all');
              }}
              className="mt-4 text-sm font-medium text-blue-600 hover:underline"
            >
              フィルターをリセット
            </button>
          </div>
        )}
        
        <div className="grid gap-6">
          {filteredQuestions.map((question) => (
          <article
            key={question.id}
            id={question.slug}
            className={`c-practice-card c-practice-card--${question.difficulty} scroll-mt-24`}
            aria-labelledby={`${question.slug}-title`}
            tabIndex={-1}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!completedQuestions[question.id]}
                    onChange={() => toggleQuestionCompletion(question.id)}
                    className="sr-only peer"
                    aria-label={`問題${question.id}を完了済みとしてマーク`}
                  />
                  <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-focus:ring-2 peer-focus:ring-blue-200 transition-colors flex items-center justify-center">
                    {completedQuestions[question.id] && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </label>
                <span
                  id={`${question.slug}-title`}
                  className={`text-xs font-semibold uppercase tracking-wide ${completedQuestions[question.id] ? 'line-through text-slate-400' : 'text-slate-700'}`}
                >
                  Q{question.id}
                </span>
              </div>
              <Badge
                tone={question.difficulty === "easy" ? "success" : question.difficulty === "medium" ? "warning" : "danger"}
                className="text-xs font-semibold"
                aria-label={`難易度: ${difficultyLabel[question.difficulty]}`}
              >
                {difficultyLabel[question.difficulty]}
              </Badge>
            </div>
            <p className={`mt-4 text-base leading-relaxed ${completedQuestions[question.id] ? 'text-slate-400' : 'text-slate-700'}`}>
              {question.prompt}
              {completedQuestions[question.id] && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  完了
                </span>
              )}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex flex-wrap items-center gap-3 text-slate-500">
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
              <CopyButton 
                text={question.prompt} 
                label="質問をコピー"
                successMessage="コピーしました！"
                className="shrink-0"
              />
            </div>
            {question.recommendedGuides && question.recommendedGuides.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-500">関連ガイド: </span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {question.recommendedGuides.map((guide) => (
                    <Link
                      key={guide}
                      href={`/guides/${guide}`}
                      className="text-xs font-medium text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {guide.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
        </div>
      </section>
    </main>
  );
}
