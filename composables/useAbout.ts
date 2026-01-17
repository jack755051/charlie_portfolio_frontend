// composable/useAbout.ts
import { ref } from 'vue'

export const useAbout = () => {
  // 拆分段落，方便 UI 做排版設計
  const intro = {
    title: '從興趣到專業的技術旅程',
    content:
      '開發不僅是工作，更是我探索問題解方的途徑。從自學起步到成為專職工程師，我享受將複雜邏輯轉化為流暢使用者體驗的過程。',
  }

  const techStack = {
    title: '技術轉型與全端視野',
    content:
      '曾以 Angular 為主力框架，因應策略調整成功轉型至 Vue 生態系，目前專注於 Vue 3 與 Nuxt 的深度應用。不滿足於前端領域，我進一步涉獵 Node.js (NestJS) 與 Docker 容器化技術，具備獨立構建前後端架構與部署環境的能力，這讓我在協作中能更精準地理解資料流與系統邊界。',
  }

  const experience = {
    title: '專案實戰與產品開發',
    content:
      '擁有豐富的 B2B 與 B2G 開發經驗。曾參與《原住民族住宅業務系統》、《原住民族知識體系》等政府標案開發。在產品端，參與了《Systalk Chat》對話系統開發，並負責內部關鍵系統《AdminHub 金鑰管理平台》與《ICR 智慧辨識系統》的前端架構設計與實作。',
  }

  const passion = {
    title: '開源精神與持續精進',
    content:
      '致力於寫出可維護、高重用性的程式碼。閒暇之餘開發 Side Project，並將通用元件封裝發布至 NPM，透過開源社群的標準來審視並精進自己的技術深度。',
  }

  // 關鍵字標籤 (用於視覺點綴)
  const tags = ['Vue 3 / Nuxt', 'TypeScript', 'Tailwind CSS', 'NestJS', 'Docker', 'NPM Package']

  return {
    intro,
    techStack,
    experience,
    passion,
    tags,
  }
}
