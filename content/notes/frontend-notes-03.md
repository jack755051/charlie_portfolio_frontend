---
title: "前端知識補充_03"
hackmd_url: "https://hackmd.io/@jack755051/HJZyNe83Zg"
summary: "前端進階知識整理，涵蓋常見面試與實務重點。"
tags: ["Frontend", "JavaScript"]
published_at: "2026-05-07"
featured: false
toc:
  - { level: 2, text: "身分驗證", id: "身分驗證" }
  - { level: 3, text: "Session Token 的觸發時機", id: "session-token-的觸發時機" }
  - { level: 3, text: "1. 攜帶 Token (Client -> Server)", id: "1-攜帶-token-client---server" }
  - { level: 3, text: "2. 伺服器驗票 (Server Processing)", id: "2-伺服器驗票-server-processing" }
  - { level: 3, text: "3. 核發 Token (Server -> Client)", id: "3-核發-token-server---client" }
  - { level: 2, text: "套件管理工具：核心差異比較", id: "套件管理工具核心差異比較" }
---

## 前端知識補充_03

### 身分驗證

#### Session Token 的觸發時機

> 在[url觸發的五步流程](https://hackmd.io/cQD4Ile3QiSiKlzna_oxRQ)發生在`第四步`：發送 HTTP 請求與接收回應 (HTTP Request & Response)。

#### 1. 攜帶 Token (Client -> Server)
* **自動附帶 (Cookie 機制)**：瀏覽器底層會自動將含有 Token 的 Cookie 塞入 HTTP Request 的 `Cookie` Header，前端無需額外撰寫 JS。
* **手動夾帶 (Bearer 機制)**：若 Token 存在 localStorage 或記憶體，需透過前端 JS (如 Axios 攔截器) 手動將其加入 `Authorization: Bearer <token>` Header 中。

#### 2. 伺服器驗票 (Server Processing)
* **解碼與驗證**：伺服器收到請求後，在處理業務邏輯前會先透過 Middleware 檢查 Token 是否過期或偽造。
* **放行或拒絕**：驗證成功即綁定用戶資訊並放行；失敗則直接中斷並回傳 `401 Unauthorized` 狀態碼。

#### 3. 核發 Token (Server -> Client)
* **生成與傳遞**：登入成功後，伺服器會產出 Token 並透過 HTTP Response 交給瀏覽器。
* **儲存方式**：可透過 `Set-Cookie` (搭配 HttpOnly/Secure) 讓瀏覽器自動存儲，或是放在 JSON Body 中交由前端 JS 自行處理。

---

### 套件管理工具：核心差異比較

| 特性 | npm (官方預設) | Yarn (革新者) | pnpm (效能與空間大師) |
| :--- | :--- | :--- | :--- |
| **優勢** | 內建免安裝、生態系最大、穩定可靠。 | 速度快、早期推動 Lock 檔與 Monorepo 發展的先驅。 | **強烈推薦**。硬碟佔用極低、安裝極快、無幽靈依賴。 |
| **劣勢** | 消耗極大硬碟空間（多專案重複下載）、有幽靈依賴問題。 | v2+ (PnP) 捨棄 node_modules，導致相容性與學習成本較高。 | 少數不規範的舊套件可能需手動配置以解決相容性。 |
| **底層機制** | 扁平化結構 (`node_modules`) | 扁平化 (v1) / 無 `node_modules` (v2+ PnP) | 全局硬連結 (Hard-link) + 嚴格符號連結 (Symlink) |
