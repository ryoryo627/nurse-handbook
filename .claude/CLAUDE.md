# 看護管理職ハンドブック - Project Memory

## これは何か

看護主任・師長のための実践ガイド（MkDocs Material + GitHub Pages）。
**このハンドブックが「今のやり方」の唯一の正解（SSoT）**。

## 絶対に守ること

1. **見た目を変えない** → `.claude/rules/style-freeze.md`
2. **中学2年生語彙で書く** → `.claude/rules/docs-writing.md`
3. **ページの型を守る** → `.claude/rules/docs-structure.md`
4. **ハンドブック優先で変える** → `.claude/rules/repo-workflow.md`

## 作業手順

1. テンプレートをコピー: `docs/99_templates/page.md`
2. frontmatter を書く（title, who, owner, last_checked）
3. 専門語は用語集にリンク（初出のみ）
4. `mkdocs build` でエラーなし確認
5. nav に追加したら `mkdocs.yml` を確認

## よく使うコマンド

```bash
# プレビュー
mkdocs serve

# ビルド確認
mkdocs build --strict

# デプロイ（自動：masterマージで GitHub Actions）
```

## 完了の定義

- [ ] `mkdocs build` がエラーなし
- [ ] 見た目（CSS/テーマ）を変えていない
- [ ] ページの型に沿っている
- [ ] frontmatter がある
- [ ] **用語集リンクはページ内初出のみ**（2回目以降はリンクなし）
- [ ] **用語集の英単語に読み方を併記**（例：Issue（イシュー））
- [ ] **用語集の例は使用例**（定義文ではない）
