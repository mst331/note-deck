# Note Deck

Web開発とAI活用のための実務メモ集

## 概要

**Note Deck** は、Web開発、AI活用、Claude Code、要件定義、プロジェクト運用などの実務チートシート（静的HTML）をカード型の目次で束ねた静的サイトです。

GitHub Pages で公開することを想定しています。

| ジャンル | 内容 |
|---|---|
| `docs/claude/` | Claude の使い方ベストプラクティス / 実務プロンプトの型 |
| `docs/claude-code/` | スラッシュコマンド / 設定（permissions・hooks・MCP）/ おすすめリポジトリ・Skills |
| `docs/ai/` | AIに任せる線引き / AI出力のレビュー・検収 / AIハーネスの落とし穴と最小構成 |
| `docs/framework/` | 思考の型 / 要件定義の型 / プロジェクト計画の型 / 振り返り・障害対応の型 |

## 公開構成

- 公開元: `main` ブランチ `/docs`
- トップページ: `docs/index.html`

GitHub Pages の設定:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/docs`

## 免責

本サイトは個人による非公式の実務メモです。
Anthropic、GitHub、Vercel、OWASP 等の公式資料ではなく、各団体・企業とは関係ありません。

内容は作成時点の情報をもとに整理しています（各ページの footer に確認日を記載）。
仕様・料金・機能・コマンド等は変更される可能性があるため、正確な最新情報は各公式ドキュメントを確認してください。

## 出典・参考

このチートシート群では、各製品・技術の公式ドキュメント、公開資料、一般的な実務知識をもとに内容を整理しています。

主な参照対象:

- Anthropic / Claude 関連ドキュメント（code.claude.com / platform.claude.com）
- GitHub / GitHub Pages 関連ドキュメント
- Next.js 関連ドキュメント（nextjs.org）
- OWASP 関連資料（genai.owasp.org — OWASP Top 10 for Agentic Applications ほか）
- その他、各チートシート内で明示した公開情報

## ローカル確認

```bash
cd docs
python -m http.server 8000
```

ブラウザで以下を開きます。

```text
http://localhost:8000/
```

## リンクチェック

```bash
node scripts/check-links.mjs
```

`docs/` 配下の HTML のローカル参照（`href` / `src`）を検査します。リンク切れがあれば一覧表示して失敗終了します（外部URLは対象外）。

## 公開前チェック

- 社名・顧客名・案件名が含まれていないこと
- 個人名・メールアドレス・電話番号が含まれていないこと
- 社内URL・内部ドメイン・ローカルパスが含まれていないこと
- IPアドレス、APIキー、トークン、パスワードなどが含まれていないこと
- 公式資料と誤認される表現がないこと
- 外部リンクが切れていないこと
- 各ページに古い情報が含まれる場合、確認日や注意書きを入れること

## ライセンス

- コード部分（HTML / CSS / JavaScript、`scripts/` 配下）: MIT License
- 文書・チートシート本文: CC BY 4.0

詳細は [LICENSE](LICENSE) を参照してください。
