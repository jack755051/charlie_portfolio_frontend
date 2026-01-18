// composables/useAbout.ts
// 這個 composable 不再負責 i18n，只提供結構
// 翻譯直接在組件中使用 $t() 處理

export const useAbout = () => {
  // 返回 i18n key 的結構，讓組件自己翻譯
  return {
    intro: {
      titleKey: 'about.section1.intro.title',
      contentKey: 'about.section1.intro.content',
    },
    techStack: {
      titleKey: 'about.section1.techStack.title',
      contentKey: 'about.section1.techStack.content',
    },
    experience: {
      titleKey: 'about.section1.experience.title',
      contentKey: 'about.section1.experience.content',
    },
    passion: {
      titleKey: 'about.section1.passion.title',
      contentKey: 'about.section1.passion.content',
    },
    tagsKey: 'about.section1.tags',
  }
}
