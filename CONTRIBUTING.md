# シート追加ガイド (CONTRIBUTING)

新しいチートシートを Note Deck に追加する手順と、Claude Code への開始プロンプトテンプレート。

---

## 開始プロンプト（Claude Code に貼る）

```
Note Deck（D:\web-development\cheatsheet-public\docs\）に新しいチートシートを追加したい。

## 追加するシート
- タイトル（日本語）: ○○の型
- タグ（英語、カード右上に表示）: XXXXXXXX
- ジャンル: framework / claude / claude-code / ai のいずれか
- 概要（index カードの説明文、60字以内）: ～

## 内容の素材
[ここに参考にしたい記事・メモ・箇条書きなどを貼る]

## 作業範囲
1. `docs/<ジャンル>/<スラッグ>_cheatsheet.html` を新規作成
2. `docs/index.html` にカード追加・シート数カウント更新
3. `_cheatsheet/<ジャンル>/<スラッグ>_cheatsheet.html` に社内版コピー（フッターのリンクを平文に変換）
4. `_cheatsheet/index.html` にカード追加・シート数カウント更新
5. `node scripts/check-links.mjs` でリンクチェック → パス
6. ローカル確認後、GitHub にプッシュ

## 制約
- 既存シートをテンプレとしてコピーし、CSS はゼロから書かない
- 社名・顧客名・案件名・社内URLを含めない
- チートシートは「使う資料」。理論解説・出典の詳細は含めない
- 外部サイトへのリンクは社内版（_cheatsheet）では平文に変換する
```

---

## デザイン原則

| 原則 | 内容 |
|------|------|
| **テンプレ流用** | 既存の `.html` を複製してから編集。CSS は書かない |
| **使う資料** | 理論解説・背景知識は入れない。「現場で名指しできる語彙」だけ |
| **RIGHT-SIZE** | カード数は増やさない。1シートに収まらない → シート分割より内容削減を先に検討 |
| **REUSE FIRST** | 既存シートと重複する内容はリンクで参照する |

---

## ファイル命名規則

```
docs/<ジャンル>/<主題>_cheatsheet.html
```

| ジャンル | フォルダ | 例 |
|---------|---------|-----|
| 思考・設計フレームワーク | `framework/` | `design_judgment_cheatsheet.html` |
| Claude の使い方 | `claude/` | `prompting_cheatsheet.html` |
| Claude Code 操作 | `claude-code/` | `slash_commands_cheatsheet.html` |
| AI 活用・ガバナンス | `ai/` | `ai_review_cheatsheet.html` |

---

## 追加手順

### 1. テンプレをコピーする

同じジャンルの既存シートをコピー元にする（CSS や構造が統一される）。

```bash
# 例: framework ジャンルに追加する場合
cp docs/framework/retrospective_cheatsheet.html docs/framework/new_cheatsheet.html
```

### 2. HTML を編集する

変更が必要な箇所：

| 箇所 | 変更内容 |
|------|---------|
| `<title>` | 新シートのタイトル |
| `.topbar-left span:first-child` | 英語タグ（例: `DESIGN JUDGMENT`） |
| `.topbar-left span:last-child` | サブタイトル（例: `FRAMEWORK`） |
| `.hero h1` | 日本語タイトル |
| `.hero p.thesis` | 1〜2行のヒーロー文（この型の核心） |
| `.lead` | リード文（attribution や用途説明） |
| `.mode` カード群 | 索引カード（5枚前後。多い場合は削減） |
| `.section` + `.shead` | 各セクション（パターンのグループ） |
| `footer` | 作成日・改訂日・参照元 |

### 3. index.html を更新する（公開版・社内版の両方）

- シート数カウント: `N SHEETS / M GENRES`
- 新カード追加（同ジャンルの末尾）
- `foot-note` の `<pre>` にファイル名を追加

### 4. リンクチェック

```bash
node scripts/check-links.mjs
```

`All OK` になってから次へ進む。

### 5. 社内版コピー

`cheatsheet-public/docs/` → `_cheatsheet/` に同期。  
違いは **フッターの外部リンクを平文テキストに変換すること**（社内プロキシが外部 URL をブロックするため）。

```
# 公開版フッター例
Ref: <a href="https://..." target="_blank" rel="noopener">kawasima「○○」</a>

# 社内版フッター例（リンクなし）
Ref: kawasima「○○」
```

### 6. コミット・プッシュ

```bash
git add docs/framework/new_cheatsheet.html docs/index.html
git commit -m "Add new_cheatsheet: ○○の型"
git push origin main
```

---

## チェックリスト（公開前）

- [ ] 社名・顧客名・案件名が含まれていない
- [ ] 個人名・メールアドレス・電話番号が含まれていない
- [ ] 社内URL・内部ドメイン・ローカルパスが含まれていない
- [ ] APIキー・トークン・パスワードが含まれていない
- [ ] 公式資料と誤認される表現がない
- [ ] `check-links.mjs` が `All OK`
- [ ] ローカルでページを開いて表示確認
- [ ] ダークモード切り替えが動作する
- [ ] `docs/index.html` のシート数が更新されている
- [ ] `_cheatsheet/index.html` にも同じカードが追加されている

---

## よくある失敗パターン

| 症状 | 原因 | 対処 |
|------|------|------|
| CSS が崩れる | ゼロから CSS を書いた | 既存シートを複製してから編集 |
| リンク切れ | ファイル名・パスのタイプミス | `check-links.mjs` を必ず実行 |
| ダークモードが効かない | `theme.js` の `<script>` タグが抜けている | テンプレのヘッダー部分をそのまま使う |
| 社内版でリンクエラー | 外部 URL をそのままコピーした | フッターのリンクを平文に変換する |
| シート数がずれる | `index.html` の更新を片方だけした | 公開版・社内版の両方を更新する |
