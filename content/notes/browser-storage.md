---
title: "瀏覽器的儲存機制"
hackmd_url: "https://hackmd.io/@jack755051/HJfgSgUnbl"
summary: "Cookie、LocalStorage、SessionStorage 三大儲存機制的差異與使用場景。"
tags: ["Browser", "Storage", "Cookie"]
published_at: "2026-05-07"
featured: false
toc:
  - { level: 2, text: "瀏覽器的儲存", id: "瀏覽器的儲存" }
  - { level: 3, text: "三大傳統巨頭：Cookie、LocalStorage、SessionStorage", id: "三大傳統巨頭cookielocalstoragesessionstorage" }
  - { level: 2, text: "資安危害", id: "資安危害" }
  - { level: 3, text: "點擊劫持 (Clickjacking / UI Redressing)", id: "點擊劫持-clickjacking-ui-redressing" }
  - { level: 3, text: "軟體供應鏈攻擊 (Supply Chain Attacks / 第三方套件污染)", id: "軟體供應鏈攻擊-supply-chain-attacks-第三方套件污染" }
  - { level: 3, text: "DOM 破壞 (DOM Clobbering)", id: "dom-破壞-dom-clobbering" }
  - { level: 3, text: "CORS 設定不當與 API 越權 (IDOR)", id: "cors-設定不當與-api-越權-idor" }
  - { level: 3, text: "XSS (Cross-Site Scripting) 跨站腳本攻擊", id: "xss-cross-site-scripting-跨站腳本攻擊" }
  - { level: 3, text: "CSRF (Cross-Site Request Forgery) 跨站請求偽造", id: "csrf-cross-site-request-forgery-跨站請求偽造" }
  - { level: 2, text: "處理手段", id: "處理手段" }
  - { level: 3, text: "CSP (Content Security Policy，內容安全策略)", id: "csp-content-security-policy內容安全策略" }
---

### 瀏覽器的儲存

#### 三大傳統巨頭：Cookie、LocalStorage、SessionStorage

- 1. Cookie (餅乾)

> Cookie 最早的設計初衷是為了讓「無狀態的 HTTP 協定」能夠記住使用者的狀態（例如：這個人登入過了嗎？）。

機制與特色：每次瀏覽器發送 HTTP 請求到該網域時，都會「自動」把 Cookie 夾帶在 Request Header 中送給伺服器。

容量限制：非常小，大約只有 4KB。

生命週期：由伺服器或前端設定 Expires 或 Max-Age。如果不設定，預設為 Session Cookie（關閉瀏覽器即銷毀）。

作用範圍：同網域 (Domain) 共享。

資安考量 (重要)：

容易受到 CSRF (跨站請求偽造) 攻擊（可透過 SameSite 屬性防禦）。

若儲存敏感資料 (如 Token)，務必由後端設定 HttpOnly（禁止前端 JS 讀取，防禦 XSS）與 Secure（僅限 HTTPS 傳輸）。

----

- 2. LocalStorage (本地儲存)

> HTML5 引入的 Web Storage API，專門用來在前端長期儲存非敏感資料，解決了 Cookie 容量太小且浪費頻寬的問題。

機制與特色：純前端儲存，不會自動隨著 HTTP 請求發送給伺服器。

容量限制：較大，通常為 5MB (依瀏覽器而定)。

生命週期：永久有效。除非使用者手動清除瀏覽器快取，或是透過 JS 代碼 (localStorage.clear()) 刪除。

作用範圍：同源策略 (Same-Origin)。在同一個網域下，多個分頁 (Tabs) 或視窗之間可以互相共享與監聽變化 (window.addEventListener('storage', ...)）。

適用場景：使用者的 UI 偏好設定（如深色模式）、不太頻繁變動的字典檔快取。絕對不建議儲存敏感資料 (如 JWT)，因為極易遭受 XSS 攻擊。

- 3. SessionStorage (會話儲存)

> 與 LocalStorage 是雙胞胎，用法完全一樣，唯一的差別在於生命週期與作用範圍。

機制與特色：同上，不會隨請求發送。

容量限制：通常為 5MB。

生命週期：跟著「分頁 (Tab)」共存亡。重新整理頁面資料「會」保留；但關閉該分頁後，資料就會立刻銷毀。

作用範圍：極度封閉。僅限於「當前分頁」。即使你在同一個瀏覽器開了兩個分頁，進入完全一樣的網址，這兩個分頁的 SessionStorage 也是完全獨立、互不相通的。

適用場景：多步驟表單 (Multi-step form) 的暫存狀態、防止表單重新整理後資料遺失。


----

### 資安危害

#### 點擊劫持 (Clickjacking / UI Redressing)
#### 軟體供應鏈攻擊 (Supply Chain Attacks / 第三方套件污染)
#### DOM 破壞 (DOM Clobbering)
#### CORS 設定不當與 API 越權 (IDOR)
#### XSS (Cross-Site Scripting) 跨站腳本攻擊
#### CSRF (Cross-Site Request Forgery) 跨站請求偽造

### 處理手段

#### CSP (Content Security Policy，內容安全策略)
