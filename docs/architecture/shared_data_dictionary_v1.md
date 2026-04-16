# Shared Data Dictionary v1

## 1. 目的
本文件定義跨模組共用的資料字典，供 `site_reference_data`、`portfolio_showcase`、`leetcode_profile` 共用，避免重複宣告衝突結構。

## 2. Utility Type 風格定義
```ts
type BaseDocumentFields = {
  id: string
  schema_version: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  version: number
}

type IconToken = {
  iconKey: string
}

type TechnologyItem = {
  name: string
  icon: string
  category?: string | null
}

type MediaAsset = {
  url: string
  caption?: string | null
}

type AnchorItem = {
  key: string
  href: string
  title: string
}

type LeetCodeRecentItem = {
  title: string
  titleSlug: string
  time: string
  status: string
  lang: string
  isSuccess: boolean
}

type LeetCodeSkillItem = {
  name: string
  value: number
}

type LeetCodeCalendarPoint = [date: string, count: number]
```

## 3. 命名規則
- `id` 為應用層穩定主鍵，禁止在未升版前重命名。
- `icon` / `iconName` 皆視為 icon token，不直接綁定 UI framework component。
- `i18nNamespace` 用於描述翻譯命名空間，不承載實際翻譯內容。
- 若欄位已為前端既有穩定契約，優先保留既有 camelCase。

## 4. 本輪已凍結的核心契約
- 作品主鍵 `id`
- 作品翻譯命名空間 `i18nNamespace`
- 技術清單 `technologies[].name/icon/category`
- 螢幕截圖 `screenshots[].url/caption`
- LeetCode 正規化 ViewModel：`totalSolved`, `easyPct`, `recent`, `skills`, `calendar`
