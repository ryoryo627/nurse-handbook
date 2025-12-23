# 看護管理職ハンドブック

看護主任・師長のための実践ガイド。MkDocs Material で GitHub Pages に公開。

## 絶対に守ること

1. **見た目を変えない**: mkdocs.yml のテーマ設定（teal配色）を変更しない
2. **文章トーンを維持**: 中学2年生でも読める言葉で書く
3. **ハンドブック優先**: やり方を変えるときは先にドキュメントを直す

## 作業の流れ

1. [ページテンプレート](docs/99_templates/page.md)をコピー
2. frontmatter を記入（title, who, owner, last_checked）
3. 中2語彙で内容を書く
4. 専門語は[用語集](docs/00_start/glossary.md)にリンク（初出のみ）
5. `mkdocs build` で確認
6. nav に追加が必要なら mkdocs.yml を更新

## よく使うコマンド

```bash
mkdocs serve    # ローカルプレビュー
mkdocs build    # ビルド確認
```

## 完了の定義

- [ ] `mkdocs build` が成功する
- [ ] 壊れたリンクがない
- [ ] 見た目（CSS/テーマ）を変えていない
- [ ] 中2語彙で書けている
- [ ] frontmatter がある

## ルール詳細

`.claude/rules/` を参照:

- `general.md` - 共通ルール
- `docs-writing.md` - 文章スタイル
- `docs-structure.md` - ページ構造
- `style-freeze.md` - 見た目凍結
- `repo-workflow.md` - 変更フロー
