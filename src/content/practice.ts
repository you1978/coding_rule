export type PracticeQuestion = {
  id: number;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  files: string[];
};

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    slug: "add-accent-token",
    difficulty: "easy",
    prompt:
      "src/styles/_tokens.scss に $color-accent: #f97316; を追加し、コメントで想定用途 (重要リンクや通知など) を明記してください。",
    files: ["src/styles/_tokens.scss"],
  },
  {
    id: 2,
    slug: "add-space-xl",
    difficulty: "easy",
    prompt:
      "src/styles/_tokens.scss の spacing セクションに $space-xl: 48px; を追加し、セクション間余白として利用できるようにしてください。",
    files: ["src/styles/_tokens.scss"],
  },
  {
    id: 3,
    slug: "add-radius-pill",
    difficulty: "easy",
    prompt:
      "src/styles/_tokens.scss の radius セクションに $radius-pill: 999px; を定義し、ピル型ボタン向けであることをコメントしてください。",
    files: ["src/styles/_tokens.scss"],
  },
  {
    id: 4,
    slug: "add-shadow-md",
    difficulty: "easy",
    prompt:
      "src/styles/_tokens.scss の shadow セクションへ $shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12); を追加し、用途をコメントに残してください。",
    files: ["src/styles/_tokens.scss"],
  },
  {
    id: 5,
    slug: "document-token-guidelines",
    difficulty: "easy",
    prompt:
      "_tokens.scss の冒頭コメントを更新し、Color / Spacing / Radius / Shadow の命名規則を1行ずつで説明してください。",
    files: ["src/styles/_tokens.scss"],
  },
  {
    id: 6,
    slug: "add-u-stack-sm",
    difficulty: "easy",
    prompt:
      "src/styles/_utilities.scss に .u-stack-sm を追加し、display:flex・flex-direction:column・gap:$space-sm で縦積み間隔ユーティリティを提供してください。",
    files: ["src/styles/_utilities.scss"],
  },
  {
    id: 7,
    slug: "add-u-inline-center",
    difficulty: "easy",
    prompt:
      "src/styles/_utilities.scss に .u-inline-center を追加し、display:inline-flex と中央揃えでテキストとアイコンを横並びに配置できるようにしてください。",
    files: ["src/styles/_utilities.scss"],
  },
  {
    id: 8,
    slug: "add-u-text-muted",
    difficulty: "easy",
    prompt:
      "src/styles/_utilities.scss に .u-text-muted を追加し、color: rgba($color-text, 0.65); を設定して補足説明用のテキストに使えるようにしてください。",
    files: ["src/styles/_utilities.scss"],
  },
  {
    id: 9,
    slug: "add-u-divider",
    difficulty: "easy",
    prompt:
      "src/styles/_utilities.scss に .u-divider を追加し、height:1px と background:rgba($color-text, 0.1); で区切り線を提供してください。",
    files: ["src/styles/_utilities.scss"],
  },
  {
    id: 10,
    slug: "add-u-btn-disabled-state",
    difficulty: "easy",
    prompt:
      "src/styles/_utilities.scss の .u-btn に .is-disabled 状態を追加し、opacity を 0.5、pointer-events を none に設定して無効状態を表現してください。",
    files: ["src/styles/_utilities.scss"],
  },
  {
    id: 11,
    slug: "create-badge-component",
    difficulty: "medium",
    prompt:
      "src/components/badge ディレクトリを整備し、Badge.tsx / badge.scss で .c-badge コンポーネントを BEM で実装してください。",
    files: ["src/components/badge/Badge.tsx", "src/components/badge/badge.scss"],
  },
  {
    id: 12,
    slug: "use-badge-in-practice-page",
    difficulty: "medium",
    prompt:
      "練習問題ページ (src/app/practice/page.tsx) の難易度ラベルを c-badge コンポーネントへ置き換え、トークンを用いてスタイリングしてください。",
    files: ["src/app/practice/page.tsx", "src/components/badge/Badge.tsx"],
  },
  {
    id: 13,
    slug: "badge-accessibility",
    difficulty: "medium",
    prompt:
      "Badge コンポーネントに aria-label を付与し、スクリーンリーダーで難易度が伝わるようアクセシビリティ対応を追加してください。",
    files: ["src/components/badge/Badge.tsx"],
  },
  {
    id: 14,
    slug: "practice-header-note",
    difficulty: "medium",
    prompt:
      "練習問題ページのヘッダー下に .u-text-muted を利用した補足説明を追記し、概要ページへの導線を自然に示してください。",
    files: ["src/app/practice/page.tsx", "src/styles/_utilities.scss"],
  },
  {
    id: 15,
    slug: "guides-add-practice-cta",
    difficulty: "medium",
    prompt:
      "ガイド一覧ページ (src/app/guides/page.tsx) の CTA に /practice へ遷移するボタンを追加し、.u-btn と $color-accent を組み合わせたデザインにしてください。",
    files: ["src/app/guides/page.tsx", "src/styles/_utilities.scss"],
  },
  {
    id: 16,
    slug: "add-practice-summary",
    difficulty: "medium",
    prompt:
      "PracticeSummary コンポーネントを src/components/practice に追加し、practiceQuestions から難易度別件数を算出してカード表示してください。",
    files: ["src/components/practice/PracticeSummary.tsx", "src/app/practice/page.tsx"],
  },
  {
    id: 17,
    slug: "practice-difficulty-filter",
    difficulty: "medium",
    prompt:
      "練習問題ページに難易度フィルター (all / easy / medium / hard) を実装し、選択した難易度のみ表示できるクライアントコンポーネントを作成してください。",
    files: ["src/app/practice/page.tsx"],
  },
  {
    id: 18,
    slug: "practice-recommended-guides",
    difficulty: "medium",
    prompt:
      "practiceQuestions の各要素に recommendedGuides プロパティ (スラッグ配列) を追加し、カード下部に関連ガイドへのリンクを表示してください。",
    files: ["src/content/practice.ts", "src/app/practice/page.tsx", "src/app/practice/[slug]/page.tsx"],
  },
  {
    id: 19,
    slug: "practice-question-toc",
    difficulty: "medium",
    prompt:
      "練習問題ページ上部に Q1〜Q30 の目次を配置し、クリックで該当カードへスクロールするアンカーリンクを実装してください。",
    files: ["src/app/practice/page.tsx"],
  },
  {
    id: 20,
    slug: "create-callout-component",
    difficulty: "medium",
    prompt:
      "Overview ページに Callout コンポーネントを使った注意書きを追加するため、src/components/callout/Callout.tsx と callout.scss を作成し、.c-callout を BEM で実装してください。",
    files: ["src/components/callout/Callout.tsx", "src/components/callout/callout.scss"],
  },
  {
    id: 21,
    slug: "use-callout-on-pages",
    difficulty: "hard",
    prompt:
      "Callout コンポーネントを Overview と Guides の両ページに導入し、重複する説明用ブロックを共通化してください。",
    files: ["src/app/overview/page.tsx", "src/app/guides/page.tsx", "src/components/callout/Callout.tsx"],
  },
  {
    id: 22,
    slug: "practice-copy-button",
    difficulty: "hard",
    prompt:
      "Practice ページの各カードに「質問をコピー」ボタンを追加し、クリップボード API で問題文をコピーできるようにしてください。",
    files: ["src/app/practice/page.tsx"],
  },
  {
    id: 23,
    slug: "practice-card-modifiers",
    difficulty: "hard",
    prompt:
      "Practice ページのカードに難易度別の背景色を適用する Modifier クラス (.c-practice-card--easy など) を SCSSで定義し、トークンを参照してください。",
    files: ["src/app/practice/page.tsx", "src/components/practice/practice.scss"],
  },
  {
    id: 24,
    slug: "guide-scroll-top-button",
    difficulty: "hard",
    prompt:
      "GuideLayout にページ末尾から戻れるスクロールトップボタンを追加し、.u-btn と Tailwind を組み合わせた固定表示にしてください。",
    files: ["src/components/guide/GuideLayout.tsx", "src/components/guide/guide-page.scss"],
  },
  {
    id: 25,
    slug: "create-site-header",
    difficulty: "hard",
    prompt:
      "サイト全体にヘッダーナビゲーションを追加し、src/components/layout/SiteHeader.tsx と site-header.scss で .c-header を実装して /guides /overview /practice へのリンクを提供してください。",
    files: ["src/components/layout/SiteHeader.tsx", "src/components/layout/site-header.scss", "src/app/layout.tsx"],
  },
  {
    id: 26,
    slug: "create-site-footer",
    difficulty: "hard",
    prompt:
      "サイトフッター (SiteFooter) を追加し、.u-inline-center を使ってコピーライトと GitHub リンク (ダミーで可) を配置してください。",
    files: ["src/components/layout/SiteFooter.tsx", "src/components/layout/site-footer.scss", "src/app/layout.tsx"],
  },
  {
    id: 27,
    slug: "practice-checkbox-tracking",
    difficulty: "hard",
    prompt:
      "Practice ページの各カードにチェックボックスを追加し、完了状態を useState で管理して回答済みタスクを視覚化してください。",
    files: ["src/app/practice/page.tsx"],
  },
  {
    id: 28,
    slug: "practice-search-filter",
    difficulty: "hard",
    prompt:
      "練習問題一覧に検索フィールドを追加し、入力文字列で問題文を部分一致フィルタリングできるようにしてください。",
    files: ["src/app/practice/page.tsx"],
  },
  {
    id: 29,
    slug: "practice-anchor-slugs",
    difficulty: "hard",
    prompt:
      "practiceQuestions の slug をカードの id 属性やアンカーリンクに活用し、同一ページ内リンクで該当問題へジャンプできるようにしてください。",
    files: ["src/app/practice/page.tsx", "src/content/practice.ts"],
  },
  {
    id: 30,
    slug: "practice-progress-bar",
    difficulty: "hard",
    prompt:
      "Practice ページに進捗バーを実装し、完了チェック数の割合に応じて幅が変化する Tailwind レイアウトを追加してください。",
    files: ["src/app/practice/page.tsx", "src/components/practice/practice.scss"],
  },
];
