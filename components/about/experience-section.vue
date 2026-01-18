<template>
  <AboutSection
    ref="experienceSection"
    id="section2"
    :title-main="$t('about.section2.titleMain')"
    :title-highlight="$t('about.section2.titleHighlight')"
    :subtitle="$t('about.section2.subtitle')"
  >
    <CTimeline :timeline-data="experience.experienceData.value" />
  </AboutSection>
</template>

<script setup lang="ts">
import AboutSection from '~/components/layouts/AboutSection.vue'
import { useExperience } from '~/composables/useExperience'
import CTimeline from '~/components/base/timeline.vue'

const experience = useExperience()
</script>
