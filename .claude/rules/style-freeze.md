---
paths:
  - mkdocs.yml
  - docs/stylesheets/**
  - overrides/**
---

# 見た目凍結ルール

## 変更禁止ファイル一覧

以下のファイルは原則変更しない。

| ファイル | 役割 |
|----------|------|
| `mkdocs.yml` | サイト設定、テーマ、nav |
| `docs/stylesheets/extra.css` | カスタムCSS（Tealテーマ） |
| `overrides/main.html` | Issue報告ボックス |

## 現在のテーマ設定

```yaml
theme:
  name: material
  palette:
    primary: teal
    accent: teal
```

## 変更が必要な場合の手順

1. **理由を明確にする**: なぜ変更が必要か
2. **影響範囲を特定**: どのページに影響するか
3. **変更前後を比較**: 見た目の変化を確認
4. **ロールバック手順を用意**: 元に戻せる状態にする
5. **文章変更と分ける**: スタイル変更は別PRにする

## 禁止事項

- 色（primary/accent）を変える
- フォントを変える
- Issue報告ボックスのレイアウトを変える
- CSSを追加して既存スタイルを上書きする

## よくある間違い

- nav を追加するときに theme 設定を触る → 触らない
- CSS を「ちょっとだけ」変える → 禁止、別PRで相談
- 「見やすくするため」に色を変える → 禁止
