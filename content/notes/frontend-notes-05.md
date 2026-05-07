---
title: "前端補充知識_05"
hackmd_url: "https://hackmd.io/@jack755051/HywaTRphWg"
summary: "前端進階知識補充，持續累積實務經驗。"
tags: ["Frontend", "JavaScript"]
published_at: "2026-05-07"
featured: false
toc:
  - { level: 2, text: "水合 (Hydration)", id: "水合-hydration" }
  - { level: 3, text: "🍜 秒懂比喻：泡麵理論", id: "-秒懂比喻泡麵理論" }
  - { level: 3, text: "⏱️ 水合運作的 4 個階段", id: "-水合運作的-4-個階段" }
  - { level: 3, text: "⚠️ 前端必踩坑：水合錯誤 (Hydration Mismatch)", id: "-前端必踩坑水合錯誤-hydration-mismatch" }
---

## 前端補充知識_05

### 水合 (Hydration)

> 水合 (Hydration)，就是讓伺服器產生的「靜態死網頁」，注入 JavaScript 靈魂，讓它「活過來」具備互動能力的過程。

#### 🍜 秒懂比喻：泡麵理論
* **伺服器 SSR 產出的 HTML** = 脫水蔬菜包（看得到形狀，但乾硬咬不下去 / 按鈕無法點擊）。
* **JavaScript 檔案** = 熱水。
* **水合 (Hydration)** = 沖泡的過程。將 JS 的事件監聽與狀態，完美滲透並綁定到靜態的 HTML 標籤上。

#### ⏱️ 水合運作的 4 個階段
1. **伺服器出餐**：Node.js 快速組裝出純 HTML 丟給瀏覽器。
2. **看得到吃不到 (FCP)**：瀏覽器瞬間畫出畫面，使用者看到完整的排版，但此時點擊按鈕**完全沒反應**（因為 JS 還在下載）。
3. **💧 進行水合 (Hydration)**：JS 下載完畢，Vue 開始拿自己的虛擬 DOM 與畫面上的真實 DOM「對答案」，並把互動事件 (如 `@click`) 悄悄掛載上去。
4. **完全活化 (Interactive)**：水合成功！網頁正式接管為 SPA (單頁應用程式)，後續操作不再需要重新整理網頁。

#### ⚠️ 前端必踩坑：水合錯誤 (Hydration Mismatch)
在 Nuxt 開發中，最常見的終端機報錯就是 `Hydration node mismatch`。
**發生原因**：伺服器產出的 HTML，跟瀏覽器端 Vue 預期會產出的 HTML **長得不一樣**，導致 Vue 對答案失敗。

**三大常見地雷**：
1. **時間差錯誤**：在畫面上直接印出 `new Date()`（伺服器當下的時間，跟使用者瀏覽器載入的時間一定不同）。
2. **誤用瀏覽器專屬 API**：在伺服器渲染階段 (SSR) 呼叫了 `window` 或 `document`（Node.js 沒有這些東西，會得到 `undefined`，但到了瀏覽器端卻有值）。
3. **HTML 標籤不合法嵌套**：例如把區塊元素 `<div>` 塞進了行內元素 `<p>` 裡面，瀏覽器收到 HTML 會自動亂切斷修復，導致 DOM 結構對不上。
