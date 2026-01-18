<template>
  <AboutSection
    ref="experienceSection"
    id="section2"
    :title-main="$t('about.section2.titleMain')"
    :title-highlight="$t('about.section2.titleHighlight')"
    :subtitle="$t('about.section2.subtitle')"
  >
    <CTimeline :timeline-data="$tm('about.section2.list')" />
  </AboutSection>
</template>

<script setup lang="ts">
import AboutSection from '~/components/layouts/AboutSection.vue'
import CTimeline from '~/components/base/timeline.vue'

// const experience = useExperience()
</script>
