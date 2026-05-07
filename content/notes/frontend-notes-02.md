---
title: "前端知識補充_02"
hackmd_url: "https://hackmd.io/@jack755051/Hys-NpSTWx"
summary: "建構工具、非同步狀態管理、渲染模式與容器化部署架構。"
tags: ["Frontend", "Webpack", "Vite", "Docker"]
published_at: "2026-05-07"
featured: false
toc:
  - { level: 2, text: "壹、基礎工具：編譯器與打包器", id: "壹基礎工具編譯器與打包器" }
  - { level: 3, text: "1. 角色釐清", id: "1-角色釐清" }
  - { level: 3, text: "2. 開發 (Dev) vs 建構 (Build)", id: "2-開發-dev-vs-建構-build" }
  - { level: 2, text: "貳、狀態管理：TanStack Vue Query", id: "貳狀態管理tanstack-vue-query" }
  - { level: 3, text: "1. 解決的痛點", id: "1-解決的痛點" }
  - { level: 3, text: "2. 核心魔法：快取 (Caching)", id: "2-核心魔法快取-caching" }
  - { level: 2, text: "參、渲染架構：SPA, SSG 與 SSR", id: "參渲染架構spa-ssg-與-ssr" }
  - { level: 3, text: "1. 三大模式總覽", id: "1-三大模式總覽" }
  - { level: 3, text: "2. 瀏覽器接手後的關鍵動作：「掛載」 vs 「水合」", id: "2-瀏覽器接手後的關鍵動作掛載-vs-水合" }
  - { level: 2, text: "肆、容器化與部署：Docker 與 Nginx", id: "肆容器化與部署docker-與-nginx" }
  - { level: 3, text: "1. Docker 的角色 (貨櫃)", id: "1-docker-的角色-貨櫃" }
  - { level: 3, text: "2. 雙層 Nginx 架構解析", id: "2-雙層-nginx-架構解析" }
  - { level: 3, text: "3. Docker Compose 與環境變數的陷阱", id: "3-docker-compose-與環境變數的陷阱" }
  - { level: 3, text: "4. 誰是容器的「主程式 (PID 1)」？", id: "4-誰是容器的主程式-pid-1" }
---

## 前端知識補充_02

本筆記涵蓋了現代前端開發的四大核心領域：**建構工具**、**非同步狀態管理**、**渲染模式**，以及**容器化部署架構**。

---

### 壹、基礎工具：編譯器與打包器
在寫完 TypeScript 或 Vue/Angular 程式碼後，我們無法直接交給瀏覽器執行，必須透過工具處理。

#### 1. 角色釐清

* **編譯器 (Compiler / Transpiler)**
  * **任務**：語言轉換。例如把 TypeScript 轉成 JavaScript，或把新語法轉成舊瀏覽器支援的語法。
  * **主流工具**：Babel, tsc, Esbuild, SWC。
* **打包器 (Bundler)**
  * **任務**：檔案運輸與最佳化。把數百個分散的小檔案（JS, CSS, 圖片）「黏」在一起，並進行壓縮（Minification）與剔除無用代碼（Tree Shaking）。
  * **主流工具**：Webpack, Vite, Rollup。
  * *註：Vite 或 Webpack 本身通常會內建或呼叫編譯器（如 Vite 呼叫 Esbuild）來完成工作。*

#### 2. 開發 (Dev) vs 建構 (Build)

* **Build-time (建構時)**：在開發者電腦或 CI 伺服器上執行。打包器會把原始碼處理成優化過的靜態成品（Bundle），通常放在 `dist` 或 `.output` 資料夾中。
* **Runtime (運行時)**：使用者打開網頁，瀏覽器下載並執行這些 Bundle 的階段。

> 💡 **Angular 的特例：**
> 在 Angular 專案中，開發者不需要手動配置 Webpack 或 Vite。Angular CLI (`ng build`) 作為代理人，已經在底層將這些複雜的打包邏輯封裝好了（新版 Angular 預設使用 Esbuild + Vite）。

---

### 貳、狀態管理：TanStack Vue Query
專注於處理「非同步資料（Server State）」的狀態管理工具。

#### 1. 解決的痛點
傳統上使用 `axios` 抓取資料，需要手動管理變數存放、Loading 狀態、Error 狀態。Vue Query 自動包辦了這些繁瑣的工作。

#### 2. 核心魔法：快取 (Caching)
* 它像是一台「智能冰箱」，會把打過 API 的資料暫存在記憶體中。
* 當使用者切換頁面時，立刻顯示舊資料（無縫體驗），並在背景偷偷更新最新資料。
* **強大功能**：自動過期偵測（Stale Time）、視窗聚焦重新抓取（Window Focus Refetching）。

---

### 參、渲染架構：SPA, SSG 與 SSR

> 💡 **核心觀念：SPA、SSG 與 SSR 本質上都只是「渲染手段」！**
> 不論選擇哪種模式，開發者寫的程式碼（元件、邏輯）是一樣的。這三者只是用不同的策略，來決定網頁的 HTML 到底要在「什麼時候（Build-time 還是 Runtime）」以及由「誰（伺服器還是瀏覽器）」來畫出來。

#### 1. 三大模式總覽
這三者決定了網頁 HTML 的生成時機與交付方式：

| 模式 | 概念比喻 | 打包產出物 | 網頁生成時機 | 適用場景 |
| :--- | :--- | :--- | :--- | :--- |
| **SPA (單頁應用)** | **生鮮食材包**：瀏覽器自己煮 | 1 個空的 HTML + 巨大的 JS Bundle | **Runtime** (用戶瀏覽器) | 後台管理系統（需高互動、SEO 不重要） |
| **SSG (靜態生成)** | **冷凍微波熟食**：工廠先全部煮好 | 多個預先填滿內容的 HTML 檔案 | **Build-time** (執行打包時) | 形象官網、說明文件（需極速載入、高 SEO） |
| **SSR (伺服器渲染)** | **現點現做**：廚師接到訂單馬上煮 | 一個 Node.js 伺服器程式 + 前端 JS | **Runtime** (使用者發送請求時) | 電商、新聞網（需極佳 SEO、資料秒秒更新） |

#### 2. 瀏覽器接手後的關鍵動作：「掛載」 vs 「水合」
雖然 SSR 和 SSG 生成 HTML 的「時間點」不同，但它們在瀏覽器端的處理機制是一樣的，且與 SPA 完全不同：

* **SPA 的真相：「掛載 (Mounting)」或「客戶端渲染 (CSR)」**
  * **核心機制：** 先有 JS，才畫出 HTML。
  * **運作過程：** 伺服器只給一個「空的 HTML 碗」。瀏覽器必須等 JS 下載完後，由 JS「無中生有」在空碗裡一磚一瓦蓋出所有的 DOM 節點。

* **SSG / SSR 的真相：「水合 (Hydration)」**
  * **核心機制：** 先給 HTML 讓你看，然後 JS 再偷偷跑出來讓它可以互動。
  * **運作過程：** 伺服器直接給已經畫好內容的「死 HTML」（就像看得到形狀但不能吃的乾麵塊）。使用者瞬間就能看到畫面，但此時網頁是沒有互動能力的。接著瀏覽器在背景下載 JS（熱水），將 onClick 事件與狀態綁定到死 HTML 上，為其注入靈魂，網頁才真正「活過來」。

##### 🎯 動作機制對比總結

| 模式 | Build-time (工廠) 產出什麼？ | Runtime (瀏覽器) 發生什麼事？ | 正確術語 |
| :--- | :--- | :--- | :--- |
| **SPA** | 空的 HTML 碗 + 裝滿建材的 JS 檔案 | JS 在空碗裡「無中生有」蓋出畫面 | **掛載 (Mounting) / CSR** |
| **SSG / SSR** | 畫好內容但沒有互動能力的「死 HTML」 | JS 把事件綁定到死 HTML 上，讓它活過來 | **水合 (Hydration)** |

---

### 肆、容器化與部署：Docker 與 Nginx
為什麼我們不直接把 `dist` 檔案丟給後端？因為我們需要**確保環境的一致性**。

#### 1. Docker 的角色 (貨櫃)
* 透過 `docker build`，我們把「靜態檔案 (Bundle)」和「Nginx 伺服器」鎖進同一個 Image（映像檔）中。
* 後端只需執行 `docker pull` 和 `docker run`，就能確保環境跟你開發時 100% 一致，避免了 Nginx 版本不同或漏寫設定檔的災難。

#### 2. 雙層 Nginx 架構解析
在現代部署中，通常會存在兩個 Nginx，它們各司其職：

* **前端 Nginx (在你的 Docker 內)：扮演「接待員」**
  * 它是網頁伺服器（Web Server）。
  * 負責把你的靜態檔案（HTML/JS）派發給瀏覽器。
  * 在 SPA/SSG 中，負責處理 `try_files` 路由導向；在 SSR 中，負責把請求轉給內部的 Node.js。
* **外部入口 Nginx (後端或維運管理)：扮演「總機」**
  * 它是反向代理伺服器（Reverse Proxy）。
  * 負責接收外部所有網址請求，並進行分流：把 `/api` 的請求交給後端伺服器，把 `/` 的請求交給你的前端 Docker 容器。

#### 3. Docker Compose 與環境變數的陷阱
許多人在使用 `docker-compose.yml` 啟動服務時，會誤以為設定 `environment` 就能動態切換 API 網址，但這取決於你的渲染模式：

* **SSG 模式（死變數）：** 環境變數早在 `Build-time` (打包時) 就被當成字串「寫死」進 JS 檔案裡了。Docker Compose 啟動時傳入的變數，靜態 JS 檔案根本吃不到。
  * 👉 **解法：** 必須為不同環境（測試站 / 正式站）在打包時傳入不同的 `.env`，**分別 Build 出專屬的 Image**。
* **SSR 模式（活變數）：** 容器內部是由 Node.js 執行。它可以在 `Runtime` (容器啟動時) 讀取到 Docker Compose 傳入的環境變數，動態渲染出正確的網頁。

#### 4. 誰是容器的「主程式 (PID 1)」？
Docker 有一個鐵律：**容器內必須有一個持續運作的主程式，否則容器會立刻死亡。** 不同的渲染模式，決定了誰來當這個老大：

* **在 SSG 架構中（Nginx 當店長）：** 因為產出物全是無法執行的靜態檔（沒有 Node.js），我們必須讓 Nginx 戴上**「靜態網頁伺服器」**的帽子，親自擔任 Docker 的主程式來維持容器存活，負責把檔案丟給使用者。
* **在 SSR 架構中（Nginx 退居總機）：** 因為負責畫畫面的是 Node.js，Node.js 成為了主程式。這時 Nginx 就會戴上**「反向代理伺服器」**的帽子，擋在最前面接單，再把請求轉交給背後的 Node.js 處理。

---

> 📝 **結語總結：**
> 「編譯器」處理語言轉換，「打包器」把檔案整理成 Bundle。「SPA/SSG/SSR」決定了這份 Bundle 的渲染策略與水合時機。最後，我們用「Docker」將 Bundle 封裝成 Image，並依據渲染模式選擇 Nginx 與環境變數的注入策略，實現完美無痛的上線交付。
