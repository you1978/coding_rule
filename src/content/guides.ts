export type GuideSample = {
  label: string;
  path: string;
  language?: string;
  startLine?: number;
  endLine?: number;
};

export type GuideSection = {
  heading: string;
  description: string;
  steps?: string[];
  checklist?: string[];
  note?: string;
  samples?: GuideSample[];
};

export type GuideTopic = {
  slug: string;
  title: string;
  lead: string;
  overview: string;
  sections: GuideSection[];
  related?: string[];
};

export const guideTopics: GuideTopic[] = [
  {
    slug: "basic-policy",
    title: "基本方針",
    lead: "Tailwind のスピード感と SCSS の構造化を両立させるための運用哲学です。",
    overview:
      "プロジェクトの初期段階でチーム全員が共有すべき価値観と判断基準をまとめています。設計時の迷いを解消し、読みやすさと再利用性を最優先にしたフロントエンド開発を実現します。",
    sections: [
      {
        heading: "役割分担の考え方",
        description:
          "Tailwind はレイアウトや余白など瞬発力が求められるピクセル調整に使用し、SCSS は再利用される UI パターン・トークンの管理に集中させます。",
        steps: [
          "ワイヤーフレーム段階で Tailwind で実装する領域と SCSS に切り出す領域を決める",
          "SCSS 側では mixin や function を極力避け、値はトークンに集約する",
          "マルチユースを想定したら SCSS コンポーネント化を検討する",
        ],
        checklist: [
          "Tailwind のクラスが 10 個以上並んだらユーティリティ or SCSS 化を検討",
          "SCSS 内で Tailwind と同一責務の記述がないか確認",
        ],
        samples: [
          {
            label: "src/app/page.tsx (ガイドカードセクション)",
            path: "src/app/page.tsx",
            language: "tsx",
            startLine: 33,
            endLine: 124,
          },
        ],
      },
      {
        heading: "読みやすさと再利用性",
        description:
          "BEM 準拠の命名と接頭辞ルールを守り、誰が見ても責務が分かるようにします。型定義や props の設計でも同じ姿勢を徹底し、コンポーネント単位で完結する構造を維持します。",
        steps: [
          "props は UI 構造に直結する最小限のものに絞る",
          "SCSS では BEM を活用し、入れ子は 3 階層以内にする",
          "ユーティリティ化した方が早いケースを常に検討する",
        ],
        samples: [
          {
            label: "src/components/card/Card.tsx",
            path: "src/components/card/Card.tsx",
            language: "tsx",
            startLine: 1,
            endLine: 80,
          },
        ],
      },
    ],
    related: ["file-structure", "naming"],
  },
  {
    slug: "file-structure",
    title: "ファイル構成",
    lead: "スタイルの責務を明確にし、変更範囲を予測しやすい構造を採用します。",
    overview:
      "styles ディレクトリでデザインレイヤーを整理し、app ディレクトリでは Next.js のルーティング規約に沿ってページを配置します。Tailwind の設定は globals と main.scss を分けて管理します。",
    sections: [
      {
        heading: "SCSS ディレクトリ",
        description:
          "`src/styles` 以下に `_tokens.scss` `_utilities.scss` `_base.scss` `main.scss` を配置し、`main.scss` をレイアウトコンポーネントで読み込みます。",
        steps: [
          "トークン・ユーティリティ・ベースの 3 レイヤーを必ず分離",
          "新しいユーティリティを作成する際は `u-` 接頭辞を付ける",
          "main.scss には @use のみを記述し順序を崩さない",
        ],
        checklist: [
          "SCSS ファイル名の先頭に `_` を付けてファイル単位のビルドを抑止",
          "src/styles 配下以外にデザイントークンを置かない",
        ],
        samples: [
          {
            label: "src/styles/main.scss",
            path: "src/styles/main.scss",
            language: "scss",
            startLine: 1,
            endLine: 20,
          },
          {
            label: "src/app/layout.tsx",
            path: "src/app/layout.tsx",
            language: "tsx",
            startLine: 1,
            endLine: 40,
          },
        ],
      },
      {
        heading: "コンポーネント階層",
        description:
          "再利用できる UI は `src/components` に置き、ページ固有の UI は `src/app/(feature)/page.tsx` 付近に限定します。",
        steps: [
          "BEM 準拠の SCSS をコンポーネントディレクトリに同梱",
          "Storybook 等を使う場合は components 配下を出発点にする",
        ],
        samples: [
          {
            label: "src/components/card/card.scss",
            path: "src/components/card/card.scss",
            language: "scss",
            startLine: 1,
            endLine: 80,
          },
        ],
      },
    ],
    related: ["tokens", "utilities"],
  },
  {
    slug: "tailwind-vs-scss",
    title: "Tailwind と SCSS の棲み分け",
    lead: "リアルタイムなレイアウト調整は Tailwind、構造化されたパターンは SCSS に委ねます。",
    overview:
      "Tailwind で瞬発力を、SCSS で持続力を担保する運用ルールを紹介します。",
    sections: [
      {
        heading: "Tailwind を使う場面",
        description:
          "余白・flex/grid・レスポンシブ・簡易な色指定など、ビルドレスな調整が求められる箇所は Tailwind を優先します。",
        checklist: [
          "margin/padding/gap/justify/align 系は Tailwind で指定",
          "レスポンシブは sm:/md:/lg: のプリフィックスを必須化",
          "ダークモードのテーマ切り替えも Tailwind の variant で管理",
        ],
        samples: [
          {
            label: "src/app/page.tsx (レスポンシブセクション)",
            path: "src/app/page.tsx",
            language: "tsx",
            startLine: 75,
            endLine: 179,
          },
        ],
      },
      {
        heading: "SCSS を使う場面",
        description:
          "複数箇所で共有する UI パターンや、Tailwind クラスが冗長になる装飾は SCSS に切り出します。",
        steps: [
          "まずユーティリティ (u-) を検討し、複合的ならコンポーネント (c-) を作成",
          "トークンを参照し、値の直書きを避ける",
          "アニメーションや擬似要素を含む場合は SCSS 内で完結",
        ],
        samples: [
          {
            label: "src/components/card/card.scss",
            path: "src/components/card/card.scss",
            language: "scss",
            startLine: 1,
            endLine: 80,
          },
        ],
      },
    ],
    related: ["utilities", "components"],
  },
  {
    slug: "naming",
    title: "命名規則",
    lead: "接頭辞 + BEM で責務を明確化し、スタイルの読み解きを容易にします。",
    overview:
      "utility / component / layout / state のプレフィックスで責務を区別し、BEM の Block / Element / Modifier を徹底します。",
    sections: [
      {
        heading: "接頭辞ルール",
        description:
          "`u-` `c-` `l-` `is-` `has-` を軸に責務が一目で分かるようにします。ファイル名も `c-card.scss` のように合わせます。",
        steps: [
          "Utility: `.u-flex-center` など単一責務",
          "Component: `.c-card` のように自立した UI",
          "Layout: `.l-header` でページ構造を表現",
        ],
        samples: [
          {
            label: "src/styles/_utilities.scss",
            path: "src/styles/_utilities.scss",
            language: "scss",
            startLine: 1,
            endLine: 60,
          },
        ],
      },
      {
        heading: "BEM の適用",
        description:
          "Block は独立性を持たせ、Element は Block 内でのみ利用、Modifier は状態変更を担います。",
        checklist: [
          "`__` は 1 階層のみ (例: `.c-card__header`)",
          "Modifier には `--` を使用し値は明示する (例: `.c-card--secondary`)",
          "状態は `is-/has-` を優先し、Modifier と併用しない",
        ],
        samples: [
          {
            label: "src/components/card/card.scss",
            path: "src/components/card/card.scss",
            language: "scss",
            startLine: 1,
            endLine: 80,
          },
        ],
      },
    ],
    related: ["components", "tailwind-vs-scss"],
  },
  {
    slug: "tokens",
    title: "_tokens.scss",
    lead: "デザインに関する値を一元管理し、変更を即座に全体へ波及させます。",
    overview:
      "カラー・余白・角丸・シャドウなどをトークン化し、SCSS と Tailwind の両方から参照できるようにします。",
    sections: [
      {
        heading: "登録手順",
        description:
          "新しいデザイン値を追加する際は `_tokens.scss` に変数として定義し、命名は `$category-role` を基本にします。",
        steps: [
          "Figma 等のデザインシステムから値を同期",
          "`$color-primary` のように用途が想像できる名前を付ける",
          "Tailwind で必要なら config へも反映",
        ],
        samples: [
          {
            label: "src/styles/_tokens.scss",
            path: "src/styles/_tokens.scss",
            language: "scss",
            startLine: 1,
            endLine: 40,
          },
        ],
      },
      {
        heading: "運用のポイント",
        description:
          "トークンはハードコードを避けるための仕組みなので、SCSS 内で直接数値を書くのは禁止とします。",
        checklist: [
          "既存トークンで代替できないか確認",
          "バリアントが複数ある場合は map 化ではなくプレーン変数のまま命名で表現",
        ],
      },
    ],
    related: ["utilities", "file-structure"],
  },
  {
    slug: "utilities",
    title: "_utilities.scss",
    lead: "複数箇所で使う構成パターンをユーティリティクラスとして定義します。",
    overview:
      "Tailwind で毎回同じ組み合わせを書くよりも、SCSS でユーティリティ化することでメンテナンス性を高めます。",
    sections: [
      {
        heading: "作成ルール",
        description:
          "`.u-` 接頭辞で始まるクラスを作り、単一責務に絞ります。必要な場合だけネストを許可します。",
        steps: [
          "背景・ボックス・フレックスなど目的を明示した名前にする",
          "トークンを参照し、値の直書きを避ける",
          "Tailwind の複合指定が 3 つ以上ならユーティリティ化を検討",
        ],
        samples: [
          {
            label: "src/styles/_utilities.scss",
            path: "src/styles/_utilities.scss",
            language: "scss",
            startLine: 1,
            endLine: 80,
          },
        ],
      },
      {
        heading: "肥大化対策",
        description:
          "ユーティリティが増えたらドメインごとにファイル分割し、`main.scss` で読み込み順序を制御します。",
        checklist: [
          "カテゴリ別にコメントで区切る",
          "未使用ユーティリティは定期的に洗い出す",
        ],
      },
    ],
    related: ["components", "tailwind-vs-scss"],
  },
  {
    slug: "base-style",
    title: "_base.scss",
    lead: "リセットと共通スタイルはベースレイヤーで一元管理します。",
    overview:
      "box-sizing や body の初期設定、リンクの振る舞いなどサイト全体に影響するスタイルを定義します。",
    sections: [
      {
        heading: "導入手順",
        description:
          "`@use \"tokens\"` でトークンを参照しながら、デフォルトカラーやフォントを設定します。",
        steps: [
          "`html, body` のマージンリセット",
          "ベースフォントと背景色をトークンで指定",
          "リンクやフォーム要素の共通挙動を定義",
        ],
        samples: [
          {
            label: "src/styles/_base.scss",
            path: "src/styles/_base.scss",
            language: "scss",
            startLine: 1,
            endLine: 60,
          },
        ],
      },
      {
        heading: "注意点",
        description:
          "コンポーネント固有のスタイルは絶対にベースへ書かず、あくまで全体に影響する最低限に留めます。",
        checklist: [
          "ID セレクタや BEM クラスをベースで使わない",
          "変更時はデザインチームと連携し影響範囲を確認",
        ],
      },
    ],
    related: ["tokens"],
  },
  {
    slug: "main-scss",
    title: "main.scss",
    lead: "Tailwind と SCSS を繋ぐエントリーポイントとして `layout.tsx` から読み込みます。",
    overview:
      "`@use` 文のみを記述し、読み込み順でスタイルの優先度を明確にします。Tailwind は globals 側で import します。",
    sections: [
      {
        heading: "読み込み順序",
        description:
          "`tokens → base → utilities` の順に @use することで、依存関係を視覚化します。",
        steps: [
          "新しいレイヤーを増やす場合も順序ルールを守る",
          "main.scss に実装ロジックを書かない",
        ],
        samples: [
          {
            label: "src/styles/main.scss",
            path: "src/styles/main.scss",
            language: "scss",
            startLine: 1,
            endLine: 20,
          },
        ],
      },
      {
        heading: "Next.js への組み込み",
        description:
          "`src/app/layout.tsx` で `import \"@/styles/main.scss\";` を実行し、`globals.css` とは役割を分けます。",
        checklist: [
          "Sass の includePaths 設定を忘れない",
          "Tailwind の設定ファイルを併用する場合は整合性を取る",
        ],
        samples: [
          {
            label: "next.config.ts",
            path: "next.config.ts",
            language: "ts",
            startLine: 1,
            endLine: 40,
          },
        ],
      },
    ],
    related: ["file-structure"],
  },
  {
    slug: "components",
    title: "コンポーネント実装",
    lead: "SCSS と Tailwind を組み合わせて、自立した UI コンポーネントを設計します。",
    overview:
      "Card コンポーネントのように、構造は SCSS、レイアウトは Tailwind で補完しながら再利用性を高めます。",
    sections: [
      {
        heading: "実装手順",
        description:
          "`src/components` 配下に TypeScript + SCSS のペアを作成し、`@extend` でユーティリティを継承します。",
        steps: [
          "Props でデータを受け取り、BEM 規則でクラスを設定",
          "SCSS で `.c-component` を定義し、ネストで要素を表現",
          "Tailwind は外枠のレイアウト調整に留める",
        ],
        checklist: [
          "Props の型に Union を使いバリエーションを明示",
          "Modifier と状態クラスの両立に注意",
        ],
        samples: [
          {
            label: "src/components/card/Card.tsx",
            path: "src/components/card/Card.tsx",
            language: "tsx",
            startLine: 1,
            endLine: 80,
          },
          {
            label: "src/components/card/card.scss",
            path: "src/components/card/card.scss",
            language: "scss",
            startLine: 1,
            endLine: 80,
          },
        ],
      },
      {
        heading: "テストとドキュメント",
        description:
          "Storybook や Playwright で振る舞いを確認し、ガイドラインページに使用例を掲載します。",
        steps: [
          "Storybook の Controls でバリエーションを可視化",
          "ビジュアルリグレッションテストを導入",
        ],
      },
    ],
    related: ["utilities", "naming"],
  },
  {
    slug: "prohibited",
    title: "禁止事項・注意点",
    lead: "保守性を損なう記述を避け、チーム全体のスタイル統一を守ります。",
    overview:
      "mixin の多用や Tailwind と SCSS の重複、!important 乱用などのアンチパターンをまとめます。",
    sections: [
      {
        heading: "禁止リスト",
        description:
          "原則 NG とする項目を列挙し、例外が必要な場合はコードレビューで議論します。",
        checklist: [
          "mixin/@function の抽象化はガイドラインで許可された場合のみ",
          "Tailwind と同一責務の SCSS を書かない",
          "ID セレクタ・!important は基本禁止",
        ],
        samples: [
          {
            label: "src/styles/_utilities.scss (許容されるユーティリティ例)",
            path: "src/styles/_utilities.scss",
            language: "scss",
            startLine: 1,
            endLine: 80,
          },
        ],
      },
      {
        heading: "監視方法",
        description:
          "Stylelint や ESLint のルールで検知し、自動化された CI で逸脱を防ぎます。",
        steps: [
          "stylelint-config-standard-scss を導入",
          "lint-staged でコミット前にチェック",
        ],
      },
    ],
    related: ["tooling"],
  },
  {
    slug: "tooling",
    title: "推奨ツール設定",
    lead: "ESLint / Prettier / Stylelint を揃え、チーム開発のクオリティを維持します。",
    overview:
      "フォーマットと静的解析を自動化し、ルール違反を早期に発見できる体制を整えます。",
    sections: [
      {
        heading: "ESLint",
        description:
          "Next.js 推奨設定をベースに、Tailwind と SCSS の命名ルールを補強します。",
        steps: [
          "`eslint-config-next` をベースラインに採用",
          "`plugin:tailwindcss/recommended` を追加",
          "import 順序とアクセシビリティチェックを有効化",
        ],
        samples: [
          {
            label: "package.json (lint スクリプト)",
            path: "package.json",
            language: "json",
            startLine: 1,
            endLine: 40,
          },
        ],
      },
      {
        heading: "Stylelint + Prettier",
        description:
          "SCSS の構文チェックとコードフォーマットを自動化します。",
        steps: [
          "`stylelint-config-standard-scss` をインストール",
          "Prettier の `scss` プラグインを有効化",
          "CI で lint を必須化",
        ],
        checklist: [
          "Lint と Format の CLI は package.json の scripts に登録",
          "VSCode では保存時フォーマットを設定",
        ],
      },
    ],
    related: ["prohibited"],
  },
];
