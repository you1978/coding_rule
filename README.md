# Next.js + Tailwind + SCSS コーディング規約サンプル

このリポジトリは、Next.js 16 + Tailwind CSS + Sass を組み合わせたプロジェクトで、
以下のコーディング規約を実際に確認・学習できるサンプルサイトです。

- Tailwind と SCSS の棲み分け
- デザイントークン (_tokens.scss)
- ユーティリティコンポーネント (_utilities.scss)
- BEM + 接頭辞規則 (c- / u- / l- / is- / has-)
- 練習問題 30 問（初級〜上級）

## 主な URL

| パス | 内容 |
| ---- | ---- |
| `/guides` | 詳細ガイド一覧。各規約項目の解説ページに遷移できます |
| `/overview` | コーディング規約全体の概要。文章のみで簡潔に要点を整理 |
| `/practice` | 実装課題 30 問の一覧。各問題ページへ遷移可能 |
| `/practice/[slug]` | 各練習問題の詳細ページ。対象ファイルリストとヒントを記載 |

## セットアップ手順

リポジトリをクローン後、依存関係をインストールします。

```bash
npm install
```

開発サーバーはポート 3002 で起動します。

```bash
npm run dev
# http://localhost:3002 をブラウザで開いてください
```

ビルドと静的出力の確認は以下です。

```bash
npm run lint
npm run build
```

## ディレクトリ構成

```
src/
  app/
    guides/         … 規約ガイド一覧・詳細
    overview/       … 規約概要ページ
    practice/       … 練習問題一覧と個別ページ
  components/
    badge/          … c-badge コンポーネント（課題用雛形）
    callout/        … c-callout コンポーネント（課題用雛形）
    guide/          … ガイド表示用レイアウト
    practice/       … 練習ページ共通スタイル
    layout/         … サイト全体のヘッダー・フッター
  styles/
    _tokens.scss    … デザイントークン
    _utilities.scss … ユーティリティクラス
    _base.scss      … ベーススタイル
    main.scss       … SCSS エントリーポイント
  content/
    guides.ts       … ガイドコンテンツ定義
    practice.ts     … 練習問題定義
```

## 練習問題について

- `/practice` から各問題ページへ移動し、指定されたファイルを編集して解答します。
- 難易度は初級 (easy) / 中級 (medium) / 上級 (hard) の 3 種類です。
- 問題ごとに対象ファイルと実装ヒントを記載しています。
- 実装後は `npm run lint` やブラウザでの動作確認を行ってください。

## ライセンス

このリポジトリは学習用サンプルです。商用利用や再配布の際は、各ライブラリのライセンスをご確認ください。
