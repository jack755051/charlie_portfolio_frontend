---
title: "現代前端框架機制：虛擬 DOM、聲明式 UI 與響應式原理"
hackmd_url: "https://hackmd.io/@jack755051/S16HBd4n-x"
summary: "虛擬 DOM 核心機制、Diff 算法、聲明式 UI 與 Vue/Angular/React 響應式原理比較。"
tags: ["Virtual DOM", "Reactive", "Vue", "Angular", "React"]
published_at: "2026-05-07"
featured: true
toc:
  - { level: 2, text: "一、虛擬 DOM (Virtual DOM)", id: "一虛擬-dom-virtual-dom" }
  - { level: 3, text: "1. 核心特性", id: "1-核心特性" }
  - { level: 3, text: "2. 使用場景比較", id: "2-使用場景比較" }
  - { level: 3, text: "3. Diff 算法的三大假設 ($O(n)$ 核心)", id: "3-diff-算法的三大假設-on-核心" }
  - { level: 3, text: "4. 比對演算過程 (Reconciliation)", id: "4-比對演算過程-reconciliation" }
  - { level: 2, text: "二、增量 DOM (Incremental DOM) 與 Angular 策略", id: "二增量-dom-incremental-dom-與-angular-策略" }
  - { level: 2, text: "三、聲明式 UI (Declarative UI)", id: "三聲明式-ui-declarative-ui" }
  - { level: 3, text: "1. 現代三大框架的聲明方式", id: "1-現代三大框架的聲明方式" }
  - { level: 3, text: "2. 常見誤區", id: "2-常見誤區" }
  - { level: 2, text: "四、響應式原理 (Reactivity) 與推拉模型", id: "四響應式原理-reactivity-與推拉模型" }
  - { level: 3, text: "1. 依賴追蹤 (Dependency Tracking)", id: "1-依賴追蹤-dependency-tracking" }
  - { level: 3, text: "2. 推與拉 (Push vs Pull) 模型解析", id: "2-推與拉-push-vs-pull-模型解析" }
  - { level: 3, text: "3. 副作用管理 (Side Effects)", id: "3-副作用管理-side-effects" }
  - { level: 2, text: "五、總結：框架演進的殊途同歸", id: "五總結框架演進的殊途同歸" }
---

## 現代前端框架機制：虛擬 DOM、聲明式 UI 與響應式原理

### 一、虛擬 DOM (Virtual DOM)
虛擬 DOM 的重點並非在於速度最快，而是在於「聰明」地處理更新。

#### 1. 核心特性
* **聲明式 UI (Declarative UI)**：開發者只需描述 $UI = f(state)$，底層由 VDOM 引擎來處理實際的更新細節。
* **批量更新 (Batching)**：VDOM 能夠將多次的狀態變更先緩存在記憶體中，最後再一次性計算出差異並套用到真實 DOM 上，藉此避免多次觸發瀏覽器的重排。
* **跨平台 (Universal)**：VDOM 可作為中間層，將結構映射到 Web DOM、iOS/Android 原生組件，甚至是 Canvas 上。

#### 2. 使用場景比較
* **簡單場景**：Vanilla JS 直接修改節點是最快的，效能大於 VDOM。
* **困難場景**：VDOM 的效能大於使用 `innerHTML`，因為 `innerHTML` 每次更新都會將節點徹底銷毀並重建。

#### 3. Diff 算法的三大假設 ($O(n)$ 核心)
* **同層比對 (Level-by-level)**：比對時不會跨層級比較節點。
* **類型決定結構 (Component type matters)**：如果節點的標籤或類型不同，會直接判定該子樹需要重建。
* **Key 的優化 (Keyed diff)**：利用唯一識別碼（Key）來識別變動的節點，將原本的「銷毀/創建」操作轉化為效能更好的「位置移動」。

#### 4. 比對演算過程 (Reconciliation)
* **渲染快照 (Snapshot)**：當狀態發生變更時，記憶體中會同時保留舊快照 (Old Tree) 與新結構 (New Tree)，這是進行 Diff 的物理前提。
* **深度優先遍歷 (DFS)**：演算法會以 DFS 的方式逐層比對這兩棵樹。
* **補丁收集 (Patching)**：比對過程中不會馬上操作 DOM，而是將差異記錄到補丁包中。
* **批量更新 (Batch Update)**：遍歷結束後，將補丁包一次性套用至真實 DOM，這是減少重排 (Reflow) 的核心關鍵。
* **內存壓力**：由於必須同時維護兩棵樹的對象結構，當數據量極大時會佔用較多的 JS Heap。
* **Key 的必要性**：Key 是 Diff 過程中的「通行證」，它讓 DFS 在遍歷列表時，能將操作從「銷毀重建」降級為「位置移動」。

---

### 二、增量 DOM (Incremental DOM) 與 Angular 策略
Angular 主要採用了增量 DOM 的策略，其特點如下：
* **編譯時分析**：在編譯階段，Angular 就已經能區分哪些節點是動態的，哪些是靜態的。
* **指令化更新**：產出的代碼類似於指令，例如「如果變數 A 變了，請更新這個特定的 Text Node」。
* **內存優化**：增量 DOM 不需要耗費額外的內存來存儲整棵樹的拷貝。更新時直接對照真實 DOM，大大減少了垃圾回收 (GC) 的壓力。

---

### 三、聲明式 UI (Declarative UI)
UI 設計模式主要分為命令式 (Imperative) 與聲明式 (Declarative) 兩種。
* **命令式**：如 jQuery 或原生 JS，開發者需要明確指示瀏覽器每一步動作（例如：第一步抓取 DOM，第二步修改 Class，第三步插入文字）。
* **聲明式**：如 Vue，開發者只需在模板寫下 `<div>{{ message }}</div>`，聲明這裡要顯示變數，具體更新機制由框架負責。

#### 1. 現代三大框架的聲明方式
在 jQuery 時代開發主要是「過程導向」，而現代框架的共同目標是讓開發者「結果導向」。採用聲明式是為了更好的複雜度控制、一致性與解耦：
* **React**：函數式聲明 (Functional)。
* **Vue**：模板式聲明 (Template-based)。
* **Angular**：指令式聲明 (Directive-driven)。

#### 2. 常見誤區
* **聲明式 UI ≠ 虛擬 DOM**：虛擬 DOM 只是實現聲明式 UI 的「其中一種手段」，並非唯一路徑。
* **聲明式 UI 的核心定義**：是「由狀態驅動視圖 (State-Driven UI)」。
* **以 Angular 為例**：它就是透過「髒檢查 (Change Detection)」與「增量 DOM (Incremental DOM)」來達成這個目標，而非依賴虛擬 DOM。

---

### 四、響應式原理 (Reactivity) 與推拉模型
如果說 VDOM 解決了「怎麼改」，那麼響應式就是解決了「什麼時候改」。

#### 1. 依賴追蹤 (Dependency Tracking)
框架會自動監聽數據變動。例如 Vue 使用 Proxy 進行攔截，React 則是透過 `setState/Hooks` 的方式顯式觸發。

#### 2. 推與拉 (Push vs Pull) 模型解析
* **Pull (拉取)**：
  * **React**：手動觸發 (`setState`) 後，從組件節點向下重新計算。
  * **Angular (傳統 Zone.js)**：屬於「極致的 Pull」。不需要手動呼叫 setState，它透過 Zone.js 自動監聽所有異步事件（如按鈕點擊或 API 回傳），從根節點向下掃描整棵組件樹進行「髒檢查」。
* **Push (推送)**：
  * **Vue**：透過 Proxy 追蹤依賴，變動時直接且精確地通知對應組件。
  * **Angular (Signals)**：現代 Angular 17+ 引入的「標準 Push」機制。修改信號值時，會精確推送通知給訂閱該信號的 DOM 節點，達成與 Vue 幾乎一模一樣的細粒度局部更新。
  * **Angular (RxJS)**：屬於「流式 Push」。數據像水流一樣經過各種管線 (Pipe) 推送到 UI，這是最純粹的 Push，資料變動會如連鎖反應般觸發後續邏輯。

#### 3. 副作用管理 (Side Effects)
當數據變動時，除了觸發 UI 更新，還可能涉及 API 請求、Local Storage 存儲等操作，這些處理就是 `watch` 或 `useEffect` 發揮作用的戰場。

---

### 五、總結：框架演進的殊途同歸
雖然各大框架實作細節不同，但本質上都是「聲明式 UI」加上「響應式原理」。

以 Angular 的歷史發展為例，可以清晰看出響應式機制的演進：
1. 早期選擇了不需要 VDOM 的髒檢查 **(Pull)**。
2. 中期引入了處理複雜異步的 RxJS **(Stream Push)**。
3. 現在全面擁抱類 Vue 的細粒度響應 **(Signal Push)**。
```
