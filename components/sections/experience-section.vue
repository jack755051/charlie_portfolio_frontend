<template>
  <AboutSection
    ref="experienceSection"
    id="section2"
    title-main="Professional"
    title-highlight="Experience"
    subtitle="從實戰中累積經驗，將技術轉化為價值"
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
