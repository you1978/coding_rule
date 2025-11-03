"use client";

import { practiceQuestions } from "@/content/practice";
import "./practice.scss";
import Badge from "@/components/badge/Badge";

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
// 難易度ラベルのマッピング
const difficultyLabel: Record<string, string> = {
  easy: "初級",
  medium: "中級",
  hard: "上級",
};

// バッジのトーンマッピング
const difficultyToneMap: Record<string, "success" | "accent" | "danger"> = {
  easy: "success",
  medium: "accent",
  hard: "danger",
};
export const PracticeSummary = () => {
  const counts = practiceQuestions.reduce<SummaryCounts>((acc, question) => {
    acc[question.difficulty] += 1;
    return acc;
  }, { ...initialCounts });
  
  return (
    <section className="c-practice-summary" aria-label="練習問題の件数サマリ">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(["easy", "medium", "hard"] as (keyof SummaryCounts)[]).map((level) => (
          <div
            key={level}
            className="u-card u-flex-center flex-col gap-2"
            aria-label={`${difficultyLabel[level]}の問題数`}
          >
            <Badge
              tone={difficultyToneMap[level]}
              ariaLabel={`難易度: ${difficultyLabel[level]}`}
            >
              {difficultyLabel[level]}
            </Badge>
            <p>{counts[level]} 問</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PracticeSummary;
