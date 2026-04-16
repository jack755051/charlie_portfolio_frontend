# JSON File SSOT PRD v1

## 1. 專案目標

將前台作品集資料改為 JSON File SSOT，讓內容資料、LeetCode 快照與前端渲染契約可被版本化、驗證與排程更新。

## 2. 核心價值與受眾

- 受眾：網站維護者、前端實作者、資料同步實作者、稽核 Agent。
- 痛點：現況資料散落在 store、i18n、mock JSON、mapper，重構時容易欄位漂移。
- 價值：用 JSON Schema 固定資料格式，讓 UI 可重構、資料可排程更新、Watcher 可檢查一致性。

## 3. 技術堆疊與架構定案

- 前端：既有 Nuxt 3 + Vue 3 + Pinia 可保留。
- 資料來源：JSON File SSOT。
- 靜態資料：人工維護 JSON，放置於 `assets/data/` 或重構後的 content data 目錄。
- 動態資料：LeetCode 每日同步，輸出 normalized JSON。
- 排程：由 GitHub Actions `schedule` 執行每日 cron，適合 GitHub Pages / static deployment；Agent 負責建立與稽核，不長駐執行排程。
- 驗證：使用 `/schemas/*.schema.json` 作為 machine-readable contract。
- 資料庫：本階段不導入 PostgreSQL / MongoDB；若未來需要後台 CMS，再升版改資料庫。

## 4. 預期功能清單

- JSON Schema 契約：定義 `site-reference`, `portfolio-projects`, `leetcode-profile` 三份資料格式。
- 靜態內容 JSON 化：把 navigation、anchors、technology catalogs、icon registry、portfolio metadata 從程式碼抽離。
- LeetCode 每日同步：每日抓取外部資料，清洗成 `leetcode-profile.json`。
- 前端資料讀取改造：前端只消費 JSON SSOT，不直接依賴 mock store shape。
- 稽核與驗證：Watcher 可比對 JSON、Schema、TypeScript types、畫面資料消費是否一致。
- 排程自動化：新增 `.github/workflows/sync-leetcode.yml`，每日同步 LeetCode snapshot、驗證 JSON SSOT、產生靜態站並部署。

## 5. 下一步調度建議

Supervisor 判斷第一順位為 SA Agent 02，先完成 JSON File SSOT 規格與 JSON Schema；後續所有交接與完工驗收必須搭配 Watcher Agent 90 監控契約漂移。
SA 完成後依序發包：

- Backend Agent 05：LeetCode 同步腳本與 normalized JSON 產出。
- Frontend Agent 04：前端資料來源改為 JSON SSOT。
- DevOps Agent 06：GitHub Actions 每日排程與部署流程。
- Watcher Agent 90 + Security Agent 08：完成後同步稽核。
- QA Agent 07：通過靜態稽核後做功能驗證。
