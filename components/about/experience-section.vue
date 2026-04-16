<template>
  <AboutSection
    id="section2"
    ref="experienceSection"
    :title-main="$t('about.section2.titleMain')"
    :title-highlight="$t('about.section2.titleHighlight')"
    :subtitle="$t('about.section2.subtitle')"
  >
    <CTimeline :timeline-data="timelineData" />
  </AboutSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AboutSection from '~/components/layouts/AboutSection.vue'
import CTimeline from '~/components/base/timeline.vue'
import zhLocale from '~/i18n/locales/zh.json'
import enLocale from '~/i18n/locales/en.json'

const { locale } = useI18n()

const timelineData = computed(() =>
  locale.value === 'en' ? enLocale.about.section2.list : zhLocale.about.section2.list
)
</script>
