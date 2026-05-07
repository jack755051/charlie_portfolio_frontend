---
title: "完整解析：從輸入 URL 到頁面顯示的奇幻旅程"
hackmd_url: "https://hackmd.io/@jack755051/By27lgL3Wl"
summary: "從網路底層出發，延伸至後端架構與瀏覽器引擎機制，建構全端系統架構思維。"
tags: ["Network", "Browser", "DNS", "HTTP", "Rendering"]
published_at: "2026-05-07"
featured: true
toc:
  - { level: 2, text: "Phase 1: 瀏覽器處理與輸入解析 (Browser & OS Level)", id: "phase-1-瀏覽器處理與輸入解析-browser-os-level" }
  - { level: 2, text: "Phase 2: DNS 解析與底層網路定址 (DNS & Network Routing)", id: "phase-2-dns-解析與底層網路定址-dns-network-routing" }
  - { level: 2, text: "Phase 3: 傳輸層連線與加密通道 (TCP & TLS)", id: "phase-3-傳輸層連線與加密通道-tcp-tls" }
  - { level: 2, text: "Phase 4: 現代後端架構與 HTTP 傳輸 (Server Architecture & HTTP)", id: "phase-4-現代後端架構與-http-傳輸-server-architecture-http" }
  - { level: 2, text: "Phase 5: 瀏覽器渲染深度剖析 (Critical Rendering Path)", id: "phase-5-瀏覽器渲染深度剖析-critical-rendering-path" }
  - { level: 2, text: "筆記總結與檢驗要點", id: "筆記總結與檢驗要點" }
---

## 完整解析：從輸入 URL 到頁面顯示的奇幻旅程

這份筆記從網路底層（作業系統與協定）出發，一路延伸至現代後端架構與瀏覽器引擎機制，建構完整的全端與系統架構思維。

---

### Phase 1: 瀏覽器處理與輸入解析 (Browser & OS Level)
當你在網址列輸入字元並按下 Enter 時，最先發動的是瀏覽器與作業系統的互動。

1. **輸入判斷 (URL Parsing)**：
   * 瀏覽器主行程 (Browser Process) 會判斷輸入的是「搜尋關鍵字」還是「合法的 URL」。
   * 若為 URL，瀏覽器會補全通訊協定（預設為 `http://` 或 `https://`）。
   * 檢查 HSTS (HTTP Strict Transport Security) 列表，若該網域在列表中，瀏覽器會強制使用 HTTPS 發起請求。
2. **行程間通訊 (IPC)**：
   * 瀏覽器的 UI 執行緒將 URL 透過 IPC 傳遞給**網路執行緒 (Network Thread)**，準備發起真正的網路請求。

---

### Phase 2: DNS 解析與底層網路定址 (DNS & Network Routing)
要將封包送達目的地，必須同時知道對方的 IP 位址與實體 MAC 位址。

1. **DNS 深度解析**：
   * **快取鏈**：瀏覽器快取 -> OS 快取 (Hosts) -> 路由器快取 -> ISP DNS。
   * **解析模式**：客戶端到本地 DNS 伺服器通常是**遞迴查詢 (Recursive)**；本地 DNS 伺服器向 Root、TLD、Authoritative 查詢的過程則是**迭代查詢 (Iterative)**。
   * **現代安全性**：現代瀏覽器可能採用 DoH (DNS over HTTPS) 將 DNS 查詢加密，防止 ISP 挾持或監聽。
2. **ARP 協定尋找 MAC 位址**：
   * 拿到伺服器 IP 後，作業系統的網路層需要將封包丟給下一個節點（通常是預設閘道器/路由器）。
   * 主機會發送 ARP 廣播 (Address Resolution Protocol)：「請問這個 IP 的 MAC 位址是多少？」，藉此在區域網路內封裝實體層的資料框 (Frame)。

---

### Phase 3: 傳輸層連線與加密通道 (TCP & TLS)
網路層確立後，開始建立可靠的傳輸通道。

1. **TCP 三次握手 (3-Way Handshake)**：
   * **SYN**：客戶端隨機生成 Sequence Number (Seq=x)。
   * **SYN-ACK**：伺服器確認收到 (Ack=x+1)，並附上自己的 Seq=y。
   * **ACK**：客戶端確認收到 (Ack=y+1)。此時作業系統層面會分配 Socket 資源。
2. **TLS 握手 (TLS Handshake)**：
   * **TLS 1.2 (需要 2-RTT)**：Client Hello -> Server Hello (傳送憑證與公鑰) -> 客戶端驗證憑證，生成 Pre-Master Secret 並用公鑰加密傳回 -> 雙方計算出對稱加密的 Session Key。
   * **TLS 1.3 (只需 1-RTT)**：將演算法協商與金鑰交換合併，甚至支援 0-RTT（針對曾經連線過的伺服器恢復連線），大幅降低延遲。

---

### Phase 4: 現代後端架構與 HTTP 傳輸 (Server Architecture & HTTP)
資料抵達目標 IP 後，通常不會直接碰到應用程式伺服器，而是經過多層架構。

1. **網路邊緣與負載均衡**：
   * 請求首先可能抵達 CDN (如 Cloudflare) 命中邊緣快取。
   * 若無快取，請求抵達伺服器機房的**負載均衡器 (Load Balancer / Reverse Proxy，如 Nginx)**，它會終止 TLS 連線，並將請求轉發給內部的應用伺服器。
2. **HTTP 協定演進**：
   * **HTTP/1.1**：Keep-Alive 維持連線，但有隊頭阻塞 (Head-of-Line Blocking) 問題。
   * **HTTP/2**：引入二進制分幀與**多路復用 (Multiplexing)**，在單一 TCP 連線上並行傳輸多個請求/回應。
   * **HTTP/3**：底層改用 UDP 的 QUIC 協定，徹底解決 TCP 層面的隊頭阻塞，並內建 TLS 加密。
3. **伺服器回應**：
   * 後端處理業務邏輯、查詢資料庫 (SQL/NoSQL)、讀取記憶體快取 (Redis)，最終組裝出 HTML、JSON 等格式並附加相應的 Header (如 `Cache-Control`, `Set-Cookie`) 回傳。

---

### Phase 5: 瀏覽器渲染深度剖析 (Critical Rendering Path)
網路執行緒收到 HTML 第一個位元組 (TTFB) 後，渲染引擎 (如 Blink/WebKit) 接手。

1. **預載掃描器 (Preload Scanner)**：
   * 在主解析器建構 DOM 的同時，瀏覽器會啟動一個背景掃描器，提前尋找 HTML 中的 `<link>`, `<script>`, `<img>` 標籤並並行下載資源，避免阻塞。
2. **DOM 與 CSSOM 構建**：
   * **DOM**：HTML 字串 -> Tokens -> Nodes -> DOM Tree。
   * **CSSOM**：計算所有樣式，這是一個**阻塞渲染 (Render-Blocking)** 的過程，必須等 CSS 處理完才能畫畫面。
3. **JavaScript 解析與執行 (V8 Engine)**：
   * 若遇到 `<script>`（無 async/defer），DOM 解析會暫停。
   * JS 引擎進行**詞法分析 -> 語法分析生成 AST -> JIT 編譯器生成機器碼**並推入 Call Stack 執行。
4. **渲染樹 (Render Tree) 與佈局 (Layout)**：
   * 結合 DOM 與 CSSOM。此階段會計算盒模型 (Box Model)。
   * *註：當 JS 透過 DOM API 改變元素尺寸時會觸發**重排 (Reflow)**，這是效能瓶頸常見來源，也是框架引入 **VDOM (Virtual DOM)** 來批次更新的核心原因。*
5. **繪製 (Paint) 與合成 (Composite)**：
   * **Paint**：將節點轉換為實際的像素繪製指令。若僅改變顏色，只會觸發**重繪 (Repaint)**，成本低於重排。
   * **Composite**：瀏覽器的合成器執行緒將不同的圖層傳送到 GPU 進行光柵化與合成。利用 `transform: translate3d` 或 `opacity` 可以直接在 GPU 層合成，跳過 Layout 和 Paint，實現極致流暢的動畫。

---

### 筆記總結與檢驗要點

這整個過程可以拆解為三個核心維度來思考：
* **網路維度**：如何安全、快速、無誤地把資料搬運過去？ (DNS, TCP, TLS, HTTP/2)
* **伺服器維度**：如何承載高併發並快速吐出資料？ (Load Balancing, Cache, DB)
* **前端維度**：如何以最少的主執行緒阻塞，將資料轉化為 60fps 順暢的視覺畫面？ (DOM, Reflow/Repaint, GPU Composite)
