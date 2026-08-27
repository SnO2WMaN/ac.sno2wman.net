# Repository Guidelines

## プロジェクト構成とモジュール

このリポジトリは、Bunで管理するAstro 5製のサイトです。ルートは`src/pages/`、共通レイアウトは`src/layouts/`、Tailwindのサイト共通テーマは`src/styles/global.css`に置きます。Markdownコンテンツは`src/publications/`、`src/talks/`、`src/formalizations/`、`src/notes/`のコレクション別に管理します。コレクションのスキーマや相互参照を変更するときは、`src/content.config.ts`も更新してください。`dist/`と`.astro/`は生成物なのでコミットしません。

## ビルド・テスト・開発コマンド

リポジトリのルートでBunを使用します。

- `bun install --frozen-lockfile`: `bun.lock`どおりに依存関係をインストールします。CIでも使用します。
- `bun run dev`: 開発サーバーを起動します（通常は`http://localhost:4321`）。
- `bun run build`: コンテンツスキーマを検証し、`dist/`に本番用サイトを生成します。
- `bun run preview`: 本番ビルドをローカルで確認します。
- `bun run astro check`: 対応するcheck連携が導入済みの場合、AstroとTypeScriptを診断します。

## コーディング規約と命名

`.editorconfig`に従い、UTF-8、LF、スペース2個のインデントを使用します。TypeScriptはAstroのstrict設定とES Modulesを前提とします。TypeScript/Astroでは既存コードに合わせてダブルクォートを使い、意味的なHTMLとTailwindユーティリティを優先してください。変数はcamelCase、レイアウトやコンポーネントのファイル名はPascalCase（例: `DefaultLayout.astro`）にします。コンテンツには`Logic101.md`や`TPP2025.md`のような主題・イベント名を使います。frontmatterはZodスキーマに適合させ、日付は`YYYY-MM-DD`、言語は`ja`または`en`、URLは絶対URLで記述します。

## テスト方針

現在、自動テストやカバレッジ基準はありません。Astro、レンダリング、コンテンツスキーマの不具合を検出するため、変更後は必ず`bun run build`を実行してください。見た目やナビゲーションを変更した場合は`bun run preview`も実行し、対象ルート、アンカーリンク、レスポンシブ表示、KaTeX出力を確認します。

## コミットとPull Request

最近の履歴にならい、`Add publications sections`や`Fix slug MLG60`のような短い命令形の件名を使います。コミットは目的ごとに分けてください。PRには変更目的、実施した検証、関連Issueを記載します。レイアウトやスタイルの変更には比較スクリーンショットを添付し、スキーマ、依存関係、デプロイ設定への変更は明記してください。
