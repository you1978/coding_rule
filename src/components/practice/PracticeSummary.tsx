"use client";

import { practiceQuestions } from "@/content/practice";
import "./practice.scss";

type SummaryCounts = {
  easy: number;
  medium: number;
  hard: number;
};

const initialCounts: SummaryCounts = { easy: 0, medium: 0, hard: 0 };

/**
 * Practice Question 16 starter component.
 * Replace placeholder UI with the required summary cards.
 */
export const PracticeSummary = () => {
  const counts = practiceQuestions.reduce<SummaryCounts>((acc, question) => {
    acc[question.difficulty] += 1;
    return acc;
  }, { ...initialCounts });

  return (
    <section className="c-practice-summary" aria-label="練習問題の件数サマリ">
      <div className="c-practice-summary__placeholder">
        <p className="c-practice-summary__intro">
          PracticeSummary コンポーネントの実装を行ってください（練習問題16）。
        </p>
        <ul className="c-practice-summary__counts">
          <li>初級: {counts.easy} 問</li>
          <li>中級: {counts.medium} 問</li>
          <li>上級: {counts.hard} 問</li>
        </ul>
      </div>
    </section>
  );
};

export default PracticeSummary;
