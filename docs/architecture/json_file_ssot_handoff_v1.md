# JSON File SSOT Handoff Tickets v1

## 1. Supervisor 決策

本階段採用 JSON File SSOT。
SA Agent 02 已完成規格方向，後續進入實作發包前，需依下列交接單執行。
Supervisor Agent 01 必須搭配 Watcher Agent 90 協助監控工作；Watcher 的責任是比對交接單、SA、JSON Schema、TypeScript types、GitHub Actions workflow 與前端消費欄位，不負責直接修復或執行排程。

## 2. Backend Agent 05 交接單

```text
【任務交接單】
👉 目標 Agent：Backend Agent 05
👉 應載入規則：
   - docs/agent-skills/05-backend-agent.md
   - docs/architecture/json_file_ssot_SA_v1.md
   - docs/architecture/database/json_file_ssot_schema_v1.md
👉 任務目標：
   實作 LeetCode profile 同步腳本，將外部 provider response 轉成 assets/data/leetcode-profile.json。
👉 技術約束與遺留守護：
   - 不得讓前端直接依賴 provider raw response。
   - 輸出 JSON 必須通過 schemas/leetcode-profile.schema.json。
   - provider 失敗時保留最後成功快照並標記 isStale=true。
   - 不得 commit provider raw payload 或任何 token。
👉 Watcher 監控 Payload：
   - 監控 Agent：Watcher Agent 90
   - 監控範圍：scripts/sync-leetcode.mjs、assets/data/leetcode-profile.json、schemas/leetcode-profile.schema.json、types/leetcode.interface.ts
   - 門禁時點：同步腳本完成後、workflow 執行 validate 前、交付 QA 前
   - 必須比對：normalized 欄位、isStale fallback、raw provider payload 不落地
👉 交接 Context：
   - 核心規格路徑：docs/architecture/json_file_ssot_SA_v1.md
   - 資料事實路徑：docs/architecture/database/json_file_ssot_schema_v1.md
   - JSON Schema：schemas/leetcode-profile.schema.json
```

## 3. Frontend Agent 04 交接單

```text
【任務交接單】
👉 目標 Agent：Frontend Agent 04
👉 應載入規則：
   - docs/agent-skills/04-frontend-agent.md
   - strategies/frontend-nuxtjs.md
   - docs/architecture/json_file_ssot_SA_v1.md
👉 任務目標：
   將前端資料來源改為 JSON File SSOT，移除 mock store 對靜態內容的承載責任。
👉 技術約束與遺留守護：
   - 必須保留 portfolio project id 與 i18nNamespace 契約。
   - 不得以 id.includes('systalk') 推導分類，必須使用 projectType。
   - LeetCode UI 只讀 normalized leetcode-profile.json。
   - UI 重構不得改動 JSON contract。
👉 Watcher 監控 Payload：
   - 監控 Agent：Watcher Agent 90
   - 監控範圍：assets/data/site-reference.json、assets/data/portfolio-projects.json、assets/data/leetcode-profile.json、stores、composables、portfolio pages
   - 門禁時點：前端資料來源改造完成後、build 前
   - 必須比對：前端不得讀 schema 外欄位，作品分類以 projectType 為準
👉 交接 Context：
   - 核心規格路徑：docs/architecture/json_file_ssot_SA_v1.md
   - 資料事實路徑：docs/architecture/database/json_file_ssot_schema_v1.md
   - JSON Schema：
     schemas/site-reference.schema.json
     schemas/portfolio-projects.schema.json
     schemas/leetcode-profile.schema.json
```

## 4. DevOps Agent 06 交接單

```text
【任務交接單】
👉 目標 Agent：DevOps Agent 06
👉 應載入規則：
   - docs/agent-skills/06-devops-agent.md
   - docs/architecture/json_file_ssot_SA_v1.md
👉 任務目標：
   建立每日排程，觸發 LeetCode 同步腳本並接續 build/deploy。
👉 技術約束與遺留守護：
   - 最後排程由 GitHub Actions `schedule` 執行，不由 Agent 長駐執行。
   - 新增 `.github/workflows/sync-leetcode.yml` 承載每日同步、JSON 驗證、generate 與 deploy。
   - 排程時間建議每日一次，避免 provider rate limit。
   - secrets 僅可由 GitHub Actions secrets 注入。
   - workflow 必須在 JSON schema 驗證通過後才能 deploy。
   - 既有 `.github/workflows/deploy.yml` 保留 push deploy，但必須先執行 JSON SSOT 驗證。
👉 Watcher 監控 Payload：
   - 監控 Agent：Watcher Agent 90
   - 監控範圍：.github/workflows/sync-leetcode.yml、.github/workflows/deploy.yml、package scripts、scripts/validate-json-ssot.mjs
   - 門禁時點：workflow 新增後、第一次手動觸發前、deploy 前
   - 必須比對：cron 每日一次、schema 驗證在 deploy 前、secrets 無明文、publish_dir 指向 Nuxt generate 輸出
👉 交接 Context：
   - 核心規格路徑：docs/architecture/json_file_ssot_SA_v1.md
   - 資料事實路徑：docs/architecture/database/json_file_ssot_schema_v1.md
```

## 5. Watcher / Security / QA 門禁

- Backend、Frontend、DevOps 任一完成後，必須啟動 Watcher Agent 90；涉及 provider、secrets、workflow 或 deploy 時同步啟動 Security Agent 08。
- Watcher 檢查：JSON、Schema、TypeScript types、前端消費欄位、GitHub Actions workflow 與 deploy 順序是否一致。
- Security 檢查：外部連結、provider request、secrets、raw payload 是否安全。
- 兩者通過後，才交給 QA Agent 07 驗證畫面與排程 fallback 行為。

## 6. 排程執行結論

- 最後的排程由 GitHub Actions `schedule` 事件執行。
- 需要新增 workflow YAML；本次落地為 `.github/workflows/sync-leetcode.yml`。
- Supervisor Agent 01 負責調度與驗收。
- DevOps Agent 06 負責 workflow YAML 與部署流程。
- Watcher Agent 90 負責協助 Supervisor 監控 workflow、JSON SSOT 與前端消費契約是否一致。
