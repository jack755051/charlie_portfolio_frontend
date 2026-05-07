---
title: "Nuxt 3 核心架構與部署配置筆記"
hackmd_url: "https://hackmd.io/@jack755051/SyWdBhh3-l"
summary: "整理 Nuxt 3 的核心架構、渲染模式、部署配置與實戰經驗。"
tags: ["Nuxt 3", "SSR", "Deployment"]
published_at: "2026-05-07"
featured: true
toc:
  - { level: 2, text: "1. 伺服器端渲染 (SSR) 架構優勢", id: "1-伺服器端渲染-ssr-架構優勢" }
  - { level: 2, text: "2. 環境配置策略 (Environment Configuration)", id: "2-環境配置策略-environment-configuration" }
  - { level: 2, text: "3. 核心變數管理與容器化注入：runtimeConfig", id: "3-核心變數管理與容器化注入runtimeconfig" }
  - { level: 3, text: "3.1 安全邊界 (Security Scope)", id: "31-安全邊界-security-scope" }
  - { level: 3, text: "3.2 執行期動態覆寫 (Runtime Overriding)", id: "32-執行期動態覆寫-runtime-overriding" }
  - { level: 3, text: "3.3 變數提取 (Composable)", id: "33-變數提取-composable" }
  - { level: 2, text: "4. Nitro 伺服器引擎與 BFF 架構 (Nitro & BFF)", id: "4-nitro-伺服器引擎與-bff-架構-nitro-bff" }
  - { level: 3, text: "4.1 為什麼需要 BFF 代理層？", id: "41-為什麼需要-bff-代理層" }
  - { level: 3, text: "4.2 動態路由與 API 實作", id: "42-動態路由與-api-實作" }
  - { level: 2, text: "5. 混合渲染模式與路由規則 (Hybrid Rendering)", id: "5-混合渲染模式與路由規則-hybrid-rendering" }
  - { level: 3, text: "5.1 常用渲染策略對照表", id: "51-常用渲染策略對照表" }
  - { level: 3, text: "5.2 實戰配置範例 (`nuxt.config.ts`)", id: "52-實戰配置範例-nuxtconfigts" }
  - { level: 2, text: "6. 資料獲取機制：`useFetch` 與 `useAsyncData`", id: "6-資料獲取機制usefetch-與-useasyncdata" }
  - { level: 3, text: "6.1 `watch` 參數的自動重整魔法", id: "61-watch-參數的自動重整魔法" }
  - { level: 2, text: "7. 必學核心組合式函式 (Essential Composables)", id: "7-必學核心組合式函式-essential-composables" }
  - { level: 3, text: "🥇 Tier 1：天天都會用到的「絕對核心」", id: "-tier-1天天都會用到的絕對核心" }
  - { level: 3, text: "🥈 Tier 2：專案必備的「進階工具」", id: "-tier-2專案必備的進階工具" }
---

## Nuxt 3 核心架構與部署配置筆記

### 1. 伺服器端渲染 (SSR) 架構優勢
Nuxt 預設採用的 SSR 模式，在底層依賴 Node.js (Nitro 引擎) 進行初始渲染，相較於純前端 SPA 具備以下核心優勢：

* **極致的首屏載入速度 (FCP)**：伺服器直接回傳已包含完整資料與 DOM 結構的 HTML 文件。瀏覽器不需等待下載、解析並執行龐大的 JavaScript 就能立即顯示畫面，大幅優化 UX。
* **完美的搜尋引擎優化 (SEO)**：由於初始內容已由伺服器組裝完畢，爬蟲引擎不需要執行 JavaScript 就能輕易讀取頁面結構並建立索引。
* **降低用戶端運算負擔**：將繁重的運算與資料請求轉移至伺服器端，減少了瀏覽器必須下載及執行的 JS 體積，對於處理器效能較弱的行動裝置或低階設備尤為友善。
* **提升無障礙體驗 (Accessibility)**：初始載入即具備完整的語意化標籤與內容，輔助技術（如螢幕閱讀器）能在第一時間精準解析頁面。
* **支援多層級快取機制**：伺服器端可利用記憶體或 CDN 快取已渲染好的 HTML 頁面，有效降低資料庫壓力並加速後續使用者的存取時間。

---

### 2. 環境配置策略 (Environment Configuration)
Nuxt 的 `nuxt.config.ts` 支援使用 `$` 前綴的保留鍵值，能在單一檔案中實現跨環境的設定覆寫，取代過去繁瑣的 `if/else` 判斷。

**六大保留鍵值解析表**：

| 鍵名 (Key) | 觸發時機與機制 | 實戰應用情境 |
| :--- | :--- | :--- |
| **`$development`** | 執行 `nuxi dev` 時觸發 | 開啟 Vue DevTools、設定本地端 Mock API 網址、關閉嚴格快取。 |
| **`$production`** | 執行 `nuxi build` 或啟動正式伺服器時觸發 | 開啟全站 ISR 快取、設定正式環境 API 位址、啟用效能壓縮。 |
| **`$env`** | 透過作業系統變數 `NUXT_ENV` 觸發 | 為 Staging (測試站) 或 UAT (驗收站) 配置專屬的資料庫連線或環境設定。 |
| **`$test`** | 執行測試框架 (如 Vitest / Jest) 時觸發 | 替換為測試用資料庫、關閉視覺動畫以縮短測試運行時間。 |
| **`$meta`** | 元資料宣告 (Metadata) | 供模組開發者標註設定檔版本、開發者資訊等。 |
| **`$schema`** | 結構型別宣告 (Schema) | 定義自訂設定的資料型別，能與 Nuxt Studio 等視覺化介面連動。 |

---

### 3. 核心變數管理與容器化注入：runtimeConfig
`runtimeConfig` 是 Nuxt 3 專門設計的環境變數中央控管機制，完美解決了「機密金鑰不外洩」以及「Docker 容器化動態變數注入」的兩大痛點。

#### 3.1 安全邊界 (Security Scope)
* **私有變數 (Server-Only)**：
  * 定義於 `runtimeConfig` 根層級（如 `apiSecret: ''`）。
  * **絕對安全**：僅限後端 Node.js (如 `server/api/`) 讀取。若前端強制呼叫，只會得到 `undefined`。
* **公開變數 (Client & Server)**：
  * 定義於 `runtimeConfig.public` 內（如 `public.apiBase: ''`）。
  * **雙棲讀取**：變數會隨 JavaScript 打包派發至客戶端，前後端皆可讀取，**嚴禁存放機密金鑰**。

#### 3.2 執行期動態覆寫 (Runtime Overriding)
寫在 `nuxt.config.ts` 內的設定僅為**佔位符 (Placeholder)**。當專案透過 Docker 啟動時，系統環境變數會以「最高優先級」無縫覆寫這些預設值。

> **命名轉換規則**：大寫、底線分隔，並嚴格遵循前綴。
> * 私有變數：`apiSecret` -> Docker 環境變數設為 `NUXT_API_SECRET`
> * 公開變數：`public.apiBase` -> Docker 環境變數設為 `NUXT_PUBLIC_API_BASE`

#### 3.3 變數提取 (Composable)
在 Vue 元件中，**全面禁用** `process.env`，必須統一使用 Nuxt 提供的組合式函式。

```vue
<template>
  <div class="api-dashboard">
    <p>目前連線網址：{{ apiUrl }}</p>
  </div>
</template>

<script setup lang="ts">
// 統一透過 useRuntimeConfig 提取變數
const config = useRuntimeConfig();

// 取得公開變數 (安全曝露於前端)
const apiUrl = config.public.apiBase;

// ❌ 錯誤示範：前端環境讀取私有變數會返回 undefined
// const secret = config.apiSecret; 
</script>

<style scoped>
.api-dashboard {
  padding: 1rem;
  border-radius: 8px;
}
</style>
```
### 4. Nitro 伺服器引擎與 BFF 架構 (Nitro & BFF)
Nuxt 3 不僅是一個前端框架，其底層搭載的 Nitro 引擎讓它具備了完整的後端能力。在實務開發中，我們常利用 Nitro 實作 BFF (Backend For Frontend) 模式，作為前端與外部 API 之間的安全橋樑。

#### 4.1 為什麼需要 BFF 代理層？
* **安全隔離 (Security)**：將機密金鑰（如 `exchangeApiKey`）保留在伺服器端。前端僅呼叫自家 API，由 Nitro 補上金鑰後代為請求，徹底杜絕金鑰外洩。
* **解決跨域 (CORS)**：瀏覽器有同源政策限制，但伺服器端對伺服器端的請求 (Server-to-Server) 則不受限制。
* **資料整形 (Data Aggregation)**：外部 API 回傳的資料往往過於龐大。BFF 可以在後端先進行過濾、重組，只回傳前端需要的欄位，優化傳輸效能。

#### 4.2 動態路由與 API 實作
實務上，外部 API 經常將變數（如日期、ID）放在網址路徑中（例如 `https://api.example.com/{date}`）。在 Nitro 中，我們可以透過中括號 `[]` 命名檔案來建立動態路由，並使用模板字串拼接。
* **前端 (Vue)**：使用 `useFetch` 發起請求，並帶入動態網址。
* **後端 (Nitro)**：使用 `defineEventHandler` 建立 API 端點，並透過 `getRouterParam` 攔截變數。

```typescript
// 檔案路徑：server/api/exchange/[date].ts
export default defineEventHandler(async (event) => {
  // 1. 提取私有變數 (僅伺服器端可見)
  const { exchangeApiKey, baseUrl } = useRuntimeConfig();

  // 2. 解析前端傳入的 Payload
  // 假設前端打 /api/exchange/2013-12-24，date 就會是 '2013-12-24'
  const date = getRouterParam(event, 'date'); 
  const query = getQuery(event);

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid date format' });
  }

  // 3. 代客跑腿：將 date 變數拼接到外部 API 網址，並帶入隱藏金鑰
  const response = await $fetch(`${baseUrl}/${date}`, {
    params: { access_key: exchangeApiKey, ...query }
  });

  return response;
});
```

---

### 5. 混合渲染模式與路由規則 (Hybrid Rendering)
Nuxt 3 允許開發者針對不同的網址路徑，指定不同的渲染策略。這打破了過去「全站只能有一種模式」的限制。

#### 5.1 常用渲染策略對照表

| 模式名稱 | 配置語法 | 運作邏輯 | 適用情境 |
| :--- | :--- | :--- | :--- |
| **SSR** (預設) | 無需配置 | 每次請求都由伺服器即時渲染。 | 使用者儀表板、即時匯率換算。 |
| **SPA** | `ssr: false` | 僅下載空殼 HTML，由瀏覽器執行 JS 渲染。 | 管理後台、不需要 SEO 的互動介面。 |
| **SWR** | `swr: 60` | 快取內容，過期後「先給舊資料、背景同步更新」。 | 產品列表、新聞首頁。 |
| **ISR** | `isr: true` | 與 SWR 類似，但快取持久化直到內容更新。 | 靜態文章、歷史統計數據。 |
| **Static** | `static: true` | 在 Build time 預先產生 HTML 檔案。 | 官方網頁、活動頁面。 |

#### 5.2 實戰配置範例 (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  routeRules: {
    '/admin/**': { ssr: false },      // 管理後台用 SPA
    '/': { swr: 3600 },               // 首頁快取一小時
    '/history/**': { isr: true },     // 歷史走勢用 ISR
    '/api/v1/**': { proxy: 'https://api.external.com/v1/**' } // API 代理
  }
})
```

---

### 6. 資料獲取機制：`useFetch` 與 `useAsyncData`
在 SSR 架構下，Nuxt 提供了專屬的 Composables 來獲取資料，確保伺服器端與客戶端的水合 (Hydration) 過程不會重複發送請求。

#### 6.1 `watch` 參數的自動重整魔法
`watch` 是一個選擇性但非常強大的配置。它能監聽響應式變數（如 `ref`），一旦變數改變，Nuxt 就會**自動在背景重新發送 API 請求**，省去手動綁定事件的麻煩。

* **手動觸發 (不使用 watch)**：適用於純點擊按鈕才更新的情境。
* **自動觸發 (使用 watch)**：適用於分頁、過濾器、日期選擇器等只要值改變就要立即更新畫面的情境。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref('2013-12-24')

// 只要 selectedDate 改變，Nuxt 會自動用新的日期去戳 /api/exchange/...
const { data, pending } = await useAsyncData(
  'exchangeRate',
  () => $fetch(`/api/exchange/${selectedDate.value}`),
  {
    watch: [selectedDate] // 👈 核心關鍵
  }
)
</script>

<template>
  <input type="date" v-model="selectedDate" />
  <div v-if="pending">載入中...</div>
</template>
```

---

### 7. 必學核心組合式函式 (Essential Composables)
Nuxt 3 提供了大量的 Composables，但在實務開發中符合 80/20 法則，最常使用的核心函式可分為以下兩個層級：

#### 🥇 Tier 1：天天都會用到的「絕對核心」
* **`useFetch` / `useAsyncData`**：SSR 資料獲取神器。`useFetch` 適合單純的網址請求；`useAsyncData` 適合搭配 `$fetch` 處理需要運算或組合資料的複雜請求。
* **`useRoute`**：取得「當下網頁的網址狀態」。常用於抓取動態路徑 `route.params.id` 或網址參數 `route.query.page`。
* **`useRouter`**：負責「網頁導覽動作」。如跳轉頁面 `router.push('/home')` 或回上一頁 `router.back()`。
* **`useRuntimeConfig`**：用來安全地提取 `.env` 內的環境變數或全域設定。
* **`useState`**：Nuxt 內建的輕量跨元件狀態管理。適合在 Header、Sidebar 等不同元件間共用簡單的變數，可部分取代 Pinia。

#### 🥈 Tier 2：專案必備的「進階工具」
* **`useCookie`**：支援 SSR 的 Cookie 操作工具。常用於存取登入 Token 或儲存使用者的 UI 偏好設定（如深色模式）。
* **`useSeoMeta` / `useHead`**：動態修改網頁的 `<head>` 資訊。對於 SEO 優化至關重要，可逐頁設定獨立的 Title、Description 與 OpenGraph 圖片。
* **`useError`**：抓取全域的錯誤狀態。常用於自訂的 `error.vue` 頁面中，以判斷並顯示 404 或 500 錯誤訊息給使用者。
