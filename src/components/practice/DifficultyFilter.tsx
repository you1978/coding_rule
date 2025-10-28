"use client";

type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

type DifficultyFilterProps = {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
};

const difficultyOptions = [
  { value: 'all', label: 'すべて' },
  { value: 'easy', label: '初級' },
  { value: 'medium', label: '中級' },
  { value: 'hard', label: '上級' },
] as const;

export const DifficultyFilter = ({
  selectedDifficulty,
  onDifficultyChange,
}: DifficultyFilterProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-slate-900">問題一覧</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">難易度で絞り込み：</span>
        <div className="relative">
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
            className="appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 pr-8 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label="問題の難易度で絞り込み"
          >
            {difficultyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500">
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
