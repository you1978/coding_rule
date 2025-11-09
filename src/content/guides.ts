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
    lead: "BEM モジュールと SMACSS レイヤーを軸に、Tailwind の俊敏さを補完する運用哲学です。",
    overview:
      "Block / Element / Modifier の責務分解と Base / Layout / Module / State / Theme のレイヤー順をセットで共有し、設計時の迷いを解消します。Tailwind は瞬発力、SCSS は持続力を担うと全員が理解した状態をゴールとします。",
    sections: [
      {
        heading: "役割分担の考え方",
        description:
          "Tailwind は画面単位の細かなレイアウト調整、SCSS は BEM + SMACSS で構造と状態を管理します。Base は要素リセット、Layout はページ骨格、Module は `.c-`、State は `.is-` / `.has-`、Theme は配色差分を担当します。",
        steps: [
          "ワイヤーフレーム時に Base/Layout (Tailwind + `.l-`) と Module/State (BEM) の境界を図示する",
          "SCSS では mixin/function よりもトークン利用とクラス命名で再利用性を担保する",
          "複数画面で再利用するなら `.c-` と `.is-` の組み合わせでモジュール化し、サンプルを Guide に追記する",
        ],
        checklist: [
          "Tailwind のクラスが 10 個以上並んだら `.l-` または `.u-` へ昇格を検討",
          "SCSS 側で Tailwind と責務が重複していないか (特に gap / flex / color)",
          "State クラスで `!important` を使用していないか",
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
          "BEM 準拠と SMACSS レイヤー順を守り、誰が見ても責務が分かるコードを徹底します。TypeScript の props でも命名規則を踏襲し、Block 単位で完結する構造を維持します。",
        steps: [
          "props は Block の構造に直結する最小限のものに絞り、State はクラスで表現する",
          "SCSS のネストは 3 階層以内、Element と Modifier の混在を避ける",
          "同じパターンが 3 箇所で現れたら `.u-` or `.l-` へ切り出し、ドキュメントへ追記する",
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
    lead: "SMACSS レイヤーと BEM の配置を揃え、変更範囲を予測しやすい構造を採用します。",
    overview:
      "styles ディレクトリでは Base / Layout / Module (Utilities) / State / Theme の順に SCSS を構成し、app ディレクトリでは Next.js のルーティング規約に沿って BEM モジュールを読み込みます。",
    sections: [
      {
        heading: "SCSS ディレクトリ",
        description:
          "`src/styles` に `_tokens.scss` `_base.scss` `_layout.scss` `_utilities.scss` `_states.scss` `_themes.scss` を用意し、`main.scss` で SMACSS の読み込み順を固定します。",
        steps: [
          "トークンは `_tokens.scss` に集約し、他のファイルは `@use` で参照する",
          "Base → Layout → Utilities(Module) → States → Themes の順を `main.scss` で維持する",
          "新しいユーティリティやレイアウトを追加したら該当ファイルにコメント付きで追記する",
        ],
        checklist: [
          "SCSS ファイル名には `_` を付けて単体ビルドを防止",
          "レイヤー順を乱す `@use` が無いか確認",
          "styles 以外の場所へトークンやレイヤーファイルを配置していないか",
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
          {
            label: "src/styles/_layout.scss",
            path: "src/styles/_layout.scss",
            language: "scss",
            startLine: 1,
            endLine: 40,
          },
        ],
      },
      {
        heading: "コンポーネント階層",
        description:
          "Layout (l-) / Utility (u-) / Component (c-) クラスの置き場を分離し、再利用できる UI は `src/components` に集約します。",
        steps: [
          "BEM 準拠の SCSS をコンポーネントディレクトリに同梱し、Module レイヤーとして扱う",
          "Storybook 等の UI カタログも `src/components` を出発点に構成する",
          "Layout 固有のラッパーは `src/styles/_layout.scss` または `src/components/layout` へまとめる",
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
    lead: "Tailwind で瞬発力を担保しつつ、BEM + SMACSS で持続力を確保する判断軸をまとめます。",
    overview:
      "Tailwind は一過性のレイアウト調整・レスポンシブ対応を担い、SCSS はモジュール化された UI・状態・テーマ管理を担当します。両者の切り替え基準を明文化して属人化を防ぎます。",
    sections: [
      {
        heading: "Tailwind を使う場面",
        description:
          "余白・flex/grid・レスポンシブ・一時的なテキスト色など、マークアップ付近で完結する調整は Tailwind を優先します。必要に応じて `.l-` や `.u-` に昇格させます。",
        checklist: [
          "margin/padding/gap/justify/align 系は Tailwind で指定",
          "レスポンシブは sm:/md:/lg: のプリフィックスを必須化",
          "テーマ切り替えはまず Tailwind Variant で検討し、複数ページに跨るなら Theme レイヤーへ移管",
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
          "複数ページで共有する UI・状態・テーマ差分は BEM + SMACSS の Module/State/Theme レイヤーへ切り出します。",
        steps: [
          "まずユーティリティ (u-) やレイアウト (l-) で解決できるか検討し、複合的なら `.c-` で Block を定義",
          "トークンを参照し、Modifier / State も含めて 1 ファイルで自己完結させる",
          "アニメーション・擬似要素・テーマ差分は Theme レイヤーと連携させる",
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
    lead: "BEM の構造と SMACSS のレイヤー接頭辞を組み合わせ、責務を一目で判別できる命名を徹底します。",
    overview:
      "Utility / Component / Layout / State / Theme の接頭辞と BEM の Block / Element / Modifier をセットで適用し、読みやすさと再利用性を確保します。",
    sections: [
      {
        heading: "接頭辞ルール",
        description:
          "`u-` `c-` `l-` `is-` `has-` `t-` を軸に役割を明確化します。ファイル名やディレクトリも SMACSS のレイヤーに追従させます。",
        steps: [
          "Utility: `.u-flex-center` のように 1 つのプロパティセットへ責務を限定",
          "Component/Module: `.c-card`, `.c-card__header` のように BEM を適用",
          "Layout: `.l-shell`, `.l-stack` でページ骨格を共有、Theme: `.t-surface-inverse` で配色差分を表現",
        ],
        samples: [
          {
            label: "src/styles/_utilities.scss",
            path: "src/styles/_utilities.scss",
            language: "scss",
            startLine: 1,
            endLine: 60,
          },
          {
            label: "src/styles/_layout.scss",
            path: "src/styles/_layout.scss",
            language: "scss",
            startLine: 1,
            endLine: 40,
          },
        ],
      },
      {
        heading: "BEM の適用",
        description:
          "Block は独立性を持ち、Element は Block 内のみで使用、Modifier は状態差分を担います。State レイヤーとの併用順もルール化します。",
        checklist: [
          "`__` は 1 階層のみ (例: `.c-card__header`)",
          "Modifier には `--` を使用し `.c-button--secondary` のように値を明示する",
          "状態は `is-/has-` レイヤーを優先し、`class=\"c-button c-button--sm is-disabled\"` の順で併用する",
        ],
        samples: [
          {
            label: "src/components/button/button.scss",
            path: "src/components/button/button.scss",
            language: "scss",
            startLine: 1,
            endLine: 79,
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
