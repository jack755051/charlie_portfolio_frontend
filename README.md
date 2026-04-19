<div align="center">

# Charlie Portfolio Frontend

個人作品集網站 ｜ Nuxt 3 · Tailwind · TypeScript · 自動化同步 LeetCode 與 GitHub 專案

[![Live Site](https://img.shields.io/badge/Live-jack755051.github.io-FF6B35?style=flat-square&logo=github)](https://jack755051.github.io/charlie_portfolio_frontend/)
[![Tag](https://img.shields.io/github/v/tag/jack755051/charlie_portfolio_frontend?style=flat-square&label=latest)](https://github.com/jack755051/charlie_portfolio_frontend/tags)
[![Sync LeetCode](https://github.com/jack755051/charlie_portfolio_frontend/actions/workflows/sync-leetcode.yml/badge.svg)](https://github.com/jack755051/charlie_portfolio_frontend/actions/workflows/sync-leetcode.yml)
[![Sync GitHub Projects](https://github.com/jack755051/charlie_portfolio_frontend/actions/workflows/sync-github.yml/badge.svg)](https://github.com/jack755051/charlie_portfolio_frontend/actions/workflows/sync-github.yml)

**Demo ➜ [jack755051.github.io/charlie_portfolio_frontend](https://jack755051.github.io/charlie_portfolio_frontend/)**

</div>

---

## ✨ 特色

- 🎨 **現代化視覺**：Sora + JetBrains Mono 字體、漸層標題、blob 背景、dark mode 自動跟隨系統
- 📱 **全 RWD**：sm/md/lg/xl 四斷點，手機隱藏側邊錨點、平板收為圓點、桌機展開完整選單
- 🧩 **Semantic Color Tokens**：shadcn 風格（`background/foreground/card/primary/muted/...`），切換暗色不留死角
- 🤖 **LeetCode 每日自動同步**：GraphQL 抓取 → JSON SSOT → 自動提交 → 觸發部署
- 🤖 **GitHub 專案每週兩次自動同步**：透過 `portfolio` topic 白名單 + `status-*` 狀態 topic + 本地 overrides 三層過濾
- 🌐 **i18n 中英雙語**：vue-i18n + runtime tm/rt，語系切換不 reload
- 🔐 **無 Secret 依賴**：LeetCode 與 GitHub 均使用公開 API；部署僅需 `GITHUB_TOKEN`

---

## 🛠 技術棧

| 層級 | 選用 |
| --- | --- |
| 框架 | **Nuxt 3** (Vue 3, TypeScript) |
| CSS | **Tailwind CSS 3** + CSS Variables（shadcn 語意 token）|
| UI 庫 | **Ant Design Vue**（icons, Overlay）|
| 圖表 | **ECharts**（LeetCode 難度比例）|
| i18n | **@nuxtjs/i18n** (zh-TW / en) |
| 部署 | **GitHub Pages** via `peaceiris/actions-gh-pages` |
| CI/CD | **GitHub Actions**（3 個 workflow）|

---

## 🏗 專案結構

```
.
├── .github/workflows/           # CI/CD
│   ├── sync-leetcode.yml        # LeetCode 每日同步 + 部署
│   └── sync-github.yml          # GitHub 專案每週二次同步
├── assets/
│   ├── css/                     # Tailwind base + CSS vars
│   ├── data/                    # JSON SSOT 資料檔
│   │   ├── site-reference.json
│   │   ├── portfolio-projects.json     # 手動維護（如公司專案）
│   │   ├── github-projects.json        # 自動同步 (bot commit)
│   │   ├── github-projects.overrides.json  # 手動翻譯 / 置頂
│   │   └── leetcode-profile.json       # 自動同步 (bot commit)
│   └── images/
├── components/
│   ├── base/                    # Header/Footer/Button/Modal 等基礎
│   ├── about/                   # About 頁 4 個 section
│   └── features/                # Home Hero (home-terminal)
├── composables/                 # 資料層封裝
├── docs/
│   ├── architecture/            # TechPlan / BA / DBA schema 文件
│   └── design/                  # UI Spec
├── i18n/locales/                # zh.json / en.json
├── pages/                       # 路由
├── public/                      # 靜態資產（favicon, resume PDF）
├── schemas/                     # JSON Schema 驗證檔
├── scripts/                     # 同步 & 驗證腳本
│   ├── sync-leetcode.mjs
│   ├── sync-github.mjs
│   └── validate-json-ssot.mjs
├── types/                       # TypeScript Interfaces
└── workspace/history/           # devlog + trace
```

---

## 🚀 快速開始

### 安裝依賴

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` 用於處理 ESLint v8/v9 peer 衝突

### 本地開發

```bash
npm run dev
# 開啟 http://localhost:3000/charlie_portfolio_frontend/
```

### 可用指令

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 啟動 dev server |
| `npm run build` | 建置（SSR 模式）|
| `npm run generate` | 產生靜態站（部署到 GitHub Pages 用）|
| `npm run preview` | 預覽 production build |
| `npm run lint` | ESLint 檢查 |
| `npm run lint:fix` | 自動修復 |
| `npm run format` | Prettier 格式化 |
| `npm run sync:leetcode` | 手動執行 LeetCode 同步 |
| `npm run sync:github` | 手動執行 GitHub 專案同步 |
| `npm run validate:ssot` | 驗證所有 JSON SSOT 檔案 schema |

---

## 🏷 **如何讓其他 GitHub repo 自動顯示在作品集**（重點）

本專案透過 **GitHub Topics** 做三層過濾機制，**你不需要動本專案任何程式碼**，只要到個別 repo 打上 topic 即可：

### 步驟 1️⃣：打上「納入」topic

去你要展示的任一個 repo（例如 `lionel_exchange`）：

1. 打開 GitHub repo 頁面
2. 右上方 **About** 區塊旁的 ⚙️ 齒輪
3. 在 **Topics** 輸入框填入：**`portfolio`**
4. 按 Enter → Save changes

```
┌───────────────────────────────────────────┐
│  About                               ⚙️   │
│  Personal crypto trading analysis tool   │
│                                           │
│  Topics:                                  │
│  [ portfolio ] [ status-done ] ...        │
└───────────────────────────────────────────┘
```

只要有 `portfolio` topic 的公開 repo，下次 cron 同步就會自動出現於作品集。

### 步驟 2️⃣：打上「開發狀態」topic（擇一）

| Topic | 對應顯示 | 適用場景 |
| --- | --- | --- |
| `status-done` | 🟢 DONE badge | 已完成、可展示、有 demo |
| `status-wip` | 🟡 WIP badge | 開發中、實驗性 |
| `status-archived` | ⚪ ARCHIVED badge + 半透明 | 停止維護、歷史存檔 |

沒打 `status-*` topic 也會自動推斷（GitHub `isArchived` 或 90 天內的 release）。

### 步驟 3️⃣（可選）：中文化或置頂

編輯本專案的 `assets/data/github-projects.overrides.json`：

```json
{
  "schema_version": 1,
  "entries": {
    "你的 repo 名稱（例如 lionel_exchange）": {
      "title_zh": "中文標題",
      "description_zh": "中文描述...",
      "role": "擔任角色（Frontend / Full-stack / ...）",
      "pinned": true,       // 是否置頂
      "hide": false,        // 是否隱藏
      "force_status": "done" // 強制覆蓋自動推斷
    }
  }
}
```

> 📝 **本檔案可以手改** — 下次 cron 不會覆蓋
> ⚠️ **`github-projects.json` 千萬別手改** — 會被 bot 覆寫；想改的都走 overrides

### 步驟 4️⃣：觸發同步

- **自動**：每週一、週四 **台北時間 03:00** 排程自動執行
- **手動**：到 [Actions → Sync GitHub Projects](https://github.com/jack755051/charlie_portfolio_frontend/actions/workflows/sync-github.yml) → **Run workflow**

### 🔍 運作細節（三層過濾）

```
     ┌─────────────────────────────────────┐
     │  GitHub GraphQL API                 │
     │  抓取 jack755051 的公開 repo           │
     └─────────────┬───────────────────────┘
                   │
        ┌──────────▼──────────┐
        │ L1 納入：repo 有      │
        │    topic:portfolio   │  ← 沒打就不收
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │ L2 狀態：           │
        │ status-done → done  │
        │ status-wip  → wip   │
        │ isArchived  → archived │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │ L3 覆寫：           │
        │ overrides.json 補    │
        │ 中文 / role / pinned │
        └──────────┬──────────┘
                   │
                   ▼
      assets/data/github-projects.json
                   │
                   ▼
            /portfolio 頁卡片
```

---

## 📊 LeetCode 自動同步

每日 **台北時間 02:17** 自動抓取 `jack755051` 的 LeetCode 公開 Profile：

- 總解題數 / 難度分布（Easy / Medium / Hard）
- 近 5 筆提交紀錄
- 提交日曆（submissionCalendar）
- 技能標籤 Top 6

資料寫入 `assets/data/leetcode-profile.json` → `About` 頁 LeetCode 區塊渲染。

API 失敗時自動 fallback 上次 snapshot 並標 `isStale: true`，網站不會因此破圖。

---

## 🔄 GitHub Actions Workflow

| Workflow | 觸發 | 功能 |
| --- | --- | --- |
| `Sync LeetCode & Deploy` | 每日 02:17 台北 / 手動 / push to main | 同步 LeetCode → commit → `nuxt generate` → 部署 gh-pages |
| `Sync GitHub Projects` | 每週一、四 03:00 台北 / 手動 | 同步 GitHub repo → commit；deploy 由上一個 workflow 觸發 |
| `pages-build-deployment` | GitHub Pages 內建 | gh-pages 分支 push 時自動發布 |

---

## 🎨 設計系統

### 色彩 Token（shadcn 風格）

位於 `assets/css/tailwind.css`，以 CSS Variables 掛於 `:root` + `@media (prefers-color-scheme: dark)`：

| Token | Light | Dark |
| --- | --- | --- |
| `background` | `#FCF7F1` | `#020617` (slate-950) |
| `foreground` | `slate-900` | `slate-50` |
| `primary` | `#FF6B35` | `#FF8C42` |
| `card` | white | `slate-900` |
| `muted` | `slate-100` | `slate-800` |
| `border` | `slate-200` | `slate-700` |

使用方式：`class="bg-card text-foreground border-border"` — 自動跟隨系統深淺切換，**不要**再寫 `dark:xxx` 變體。

### 字體

- **Display**：Sora（標題）
- **Body**：system sans-serif（Tailwind 預設）
- **Mono**：JetBrains Mono（程式碼區塊）

Google Fonts 載入並 `preconnect` 加速。

---

## 🗂 JSON SSOT（單一事實來源）

| 檔案 | 更新者 | 手動可編輯 |
| --- | --- | --- |
| `site-reference.json` | 人工 | ✅ |
| `portfolio-projects.json` | 人工 | ✅ |
| `leetcode-profile.json` | Bot（每日）| ❌ |
| `github-projects.json` | Bot（每週 2 次）| ❌ |
| `github-projects.overrides.json` | 人工 | ✅ |

所有檔案提交前由 `npm run validate:ssot` 驗證 schema 合法性（workflow 會自動執行）。

---

## 📝 版本

採 [Semantic Versioning](https://semver.org/) + Git annotated tag：

- [`v0.0.2`](https://github.com/jack755051/charlie_portfolio_frontend/releases/tag/v0.0.2) — 全站 UI 重構、semantic tokens、workflow 整併、scroll UX

檢視所有 tag：`git tag -l` 或 [Releases 頁](https://github.com/jack755051/charlie_portfolio_frontend/tags)。

---

## 🌿 分支策略

| Branch | 角色 |
| --- | --- |
| `main` | **Default**，stable，供訪客瀏覽與 README 顯示 |
| `dev` | 活躍開發，workflow cron 操作的目標 |
| `gh-pages` | 自動產生的靜態站（由 workflow 寫入，不直接編輯）|

Feature work 預計以 `feat/*`、`fix/*`、`chore/*` 為前綴於 `dev` 開分支 → PR → 合併 → push 觸發部署。

---

## 🤖 AI 協作

本專案遵循 [Charlie AI Protocols](https://github.com/jack755051/charlie-ai-protocols)：

- **多 Agent 分工**：01 PM → 02 Tech Lead → 02a BA → 02b DBA → 03 UI → 04 Frontend → 90 Watcher → 99 Logger
- **文件優先**：所有重大變更先產出 TechPlan / BA / Schema 文件（見 `docs/architecture/`）
- **紀錄軌跡**：`workspace/history/` 保留 trace + devlog，**試作失敗也保留**供回溯

---

## 📮 聯絡

- **作者**：Charlie Tai ([@jack755051](https://github.com/jack755051))
- **Email**：jack755051@gmail.com
- **LinkedIn**：[Charlie Tai](https://www.linkedin.com/in/charlie-tai)
- **作品集**：https://jack755051.github.io/charlie_portfolio_frontend/

---

<div align="center">

Built with ❤️ using Nuxt 3, Tailwind & a lot of AI-assisted engineering.

</div>
