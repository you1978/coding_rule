import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { practiceQuestions } from "@/content/practice";
import "@/components/practice/practice.scss";

const findQuestion = (slug: string) =>
  practiceQuestions.find((question) => question.slug === slug);

type PracticeParams = {
  slug: string;
};

type PracticePageProps = {
  params: Promise<PracticeParams>;
};

export function generateStaticParams() {
  return practiceQuestions.map((question) => ({ slug: question.slug }));
}

export async function generateMetadata({ params }: PracticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const question = findQuestion(slug);
  if (!question) {
    return {
      title: "練習問題",
    };
  }

  return {
    title: `Q${question.id}: 練習問題 | Next.js + Tailwind + SCSS`,
    description: question.prompt,
  };
}

const difficultyLabel: Record<string, string> = {
  easy: "初級",
  medium: "中級",
  hard: "上級",
};

export default async function PracticeQuestionPage({ params }: PracticePageProps) {
  const { slug } = await params;
  const question = findQuestion(slug);

  if (!question) {
    notFound();
  }

  const target = question;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16 md:px-8">
      <nav aria-label="パンくず" className="text-sm text-slate-500">
        <Link href="/practice" className="hover:text-slate-900">
          練習問題一覧
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-slate-400">Q{target.id}</span>
      </nav>

      <header className="flex flex-col gap-4">
        <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          {difficultyLabel[target.difficulty]}
        </span>
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Q{target.id}. {target.prompt}
        </h1>
        <p className="text-sm text-slate-500">
          指定のファイルを編集し、規約に沿った実装を行ってください。
        </p>
      </header>

      <section className="c-practice-card">
        <h2 className="text-xl font-semibold text-slate-900">対象ファイル</h2>
        <ul className="mt-4 grid gap-2 text-sm text-slate-600">
          {target.files.map((file) => (
            <li key={file} className="flex items-center gap-2">
              <span aria-hidden>•</span>
              <code className="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                {file}
              </code>
            </li>
          ))}
        </ul>
      </section>

      <section className="c-practice-card">
        <h2 className="text-xl font-semibold text-slate-900">関連ガイド</h2>
        {target.recommendedGuides && target.recommendedGuides.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {target.recommendedGuides.map((guide) => (
              <Link
                key={guide}
                href={`/guides/${guide}`}
                className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
              >
                {guide.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-500">関連するガイドはありません</p>
        )}
      </section>

      <section className="c-practice-card">
        <h2 className="text-xl font-semibold text-slate-900">実装ヒント</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-slate-600">
          <li>
            ガイドラインの概要は <Link href="/overview" className="text-blue-600 hover:underline">概要ページ</Link> を参照してください。
            {target.recommendedGuides && target.recommendedGuides.length > 0 && (
              <> また、左記の関連ガイドも参考にしてください。</>
            )}
          </li>
          <li>
            ファイル保存後は <code className="rounded bg-slate-100 px-2 py-1 font-mono text-xs">npm run lint</code> などで検証することを推奨します。
          </li>
          <li>
            問題を解いたら一覧へ戻り、他の課題にも挑戦してください。
          </li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
        >
          ← 練習問題一覧へ戻る
        </Link>
        <Link
          href={`/#${target.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
        >
          トップページで確認
        </Link>
      </div>
    </main>
  );
}
