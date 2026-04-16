# Database SSOT README

## 1. 目的
本目錄為前台作品集重構階段的資料庫單一事實來源（SSOT）。
所有 API DTO、後端實作、稽核比對，均以本目錄文件為準。

## 2. 本階段建模決策
- Supervisor 判斷後，本階段正式採用 JSON File SSOT。
- 靜態內容以人工維護 JSON 保存：導航、anchors、技術分類、icon registry、作品 metadata。
- 動態內容以排程產生 JSON 保存：LeetCode profile 每日同步一次並覆蓋 normalized snapshot。
- 既有 MongoDB-like v1 文件保留為歷史推論，不作為本輪實作依據。
- 本輪實作依據改以 `json_file_ssot_schema_v1.md` 與 `/schemas/*.schema.json` 為準。

## 3. 版本與異動規則
- 禁止直接覆寫既有 schema 文件內容後不升版。
- 任何破壞性欄位異動，必須建立新版本檔案，例如 `_schema_v2.md`。
- NoSQL 文件必須保留 `schema_version` 欄位，以支援 Lazy Migration。
- 如存在歷史命名錯誤且已被正式依賴，後續文件不得私自修正，必須沿用舊名並在新版本說明。

## 4. 共用欄位規範
- 所有文件主體都應至少具備 `id`, `schema_version`, `createdAt`, `updatedAt`, `deletedAt`, `version`。
- `deletedAt` 為軟刪除欄位；無刪除時為 `null`。
- `version` 為文件內容版次，供內容平台、稽核或未來 CMS 編輯衝突檢查使用。

## 5. 索引
- `json_file_ssot_schema_v1.md`
- `site_reference_data_schema_v1.md`
- `portfolio_showcase_schema_v1.md`
- `leetcode_profile_schema_v1.md`
