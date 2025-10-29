"use client";

import { practiceQuestions } from "@/content/practice";
import "./practice.scss";

type SummaryCounts = {
  easy: number;
  medium: number;
  hard: number;
  completed: number;
  total: number;
};

type PracticeSummaryProps = {
  completedQuestions: Record<string, boolean>;
};

type ProgressBarProps = {
  completed: number;
  total: number;
};

const ProgressBar = ({ completed, total }: ProgressBarProps) => {
  const percentage = Math.round((completed / total) * 100) || 0;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-slate-900">進捗状況</h3>
        <span className="text-sm font-medium text-slate-600">
          {completed} / {total} 問完了 ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        ></div>
      </div>
    </div>
  );
};

type DifficultyCardProps = {
  level: 'easy' | 'medium' | 'hard';
  count: number;
};

const difficultyLabels = {
  easy: '初級',
  medium: '中級',
  hard: '上級'
};

const difficultyColors = {
  easy: 'bg-emerald-50 text-emerald-800',
  medium: 'bg-amber-50 text-amber-800',
  hard: 'bg-rose-50 text-rose-800'
};

const DifficultyCard = ({ level, count }: DifficultyCardProps) => (
  <div className="flex flex-1 flex-col rounded-lg border border-slate-200 p-6">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-slate-900">{difficultyLabels[level]}問題</h3>
      <span className={`rounded-full px-3 py-1 text-sm font-medium ${difficultyColors[level]}`}>
        {count}問
      </span>
    </div>
    <p className="mt-2 text-sm text-slate-500">
      {level === 'easy' && '基本の構文やスタイリングの基本を学びます'}
      {level === 'medium' && '実践的なコンポーネントの実装に挑戦します'}
      {level === 'hard' && '複合的な機能や最適化を考慮した実装を行います'}
    </p>
  </div>
);

export const PracticeSummary = ({ completedQuestions }: PracticeSummaryProps) => {
  const counts = practiceQuestions.reduce<Omit<SummaryCounts, 'completed' | 'total'>>(
    (acc, { difficulty }) => ({
      ...acc,
      [difficulty]: acc[difficulty] + 1,
    }),
    { easy: 0, medium: 0, hard: 0 }
  );

  // Calculate completed count from props
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = practiceQuestions.length;

  return (
    <section className="c-practice-summary mb-12" aria-label="練習問題の進捗と難易度別サマリ">
      <div className="grid gap-6">
        <ProgressBar 
          completed={completedCount} 
          total={totalQuestions} 
        />
        <div>
          <h2 className="sr-only">難易度別問題一覧</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <DifficultyCard level="easy" count={counts.easy} />
            <DifficultyCard level="medium" count={counts.medium} />
            <DifficultyCard level="hard" count={counts.hard} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeSummary;
