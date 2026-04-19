<template>
  <div
    class="scrollable-content-wrapper h-screen overflow-hidden relative bg-background text-foreground transition-colors duration-500"
  >
    <BackgroundDecor variant="subpage" />

    <CAnchor
      :anchor-data="anchorData.anchorAboutPage.value"
      class="fixed left-2 xl:left-4 top-1/2 -translate-y-1/2 z-40"
    />

    <div
      class="snap-y snap-proximity h-full overflow-y-scroll scroll-smooth pt-14 md:pt-16 relative z-10"
    >
      <div class="w-full pb-20">
        <AboutSection />
        <ExperienceSection />
        <TechnologyStackSection />
        <AboutLeetcodeSection />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnchor } from '~/composables/useAnchor'
import CAnchor from '~/components/base/anchor.vue'
import BackgroundDecor from '~/components/base/background-decor.vue'
import AboutSection from '~/components/about/about-section.vue'
import ExperienceSection from '~/components/about/experience-section.vue'
import TechnologyStackSection from '~/components/about/technology-stack-section.vue'
import AboutLeetcodeSection from '~/components/about/leetcode-section.vue'

const anchorData = useAnchor()
</script>
