<template>
  <footer
    class="relative z-10 mt-auto pt-8 pb-6 md:pt-10 md:pb-8 text-slate-500 dark:text-slate-400"
  >
    <div
      class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div class="flex flex-col gap-1">
        <span class="font-display font-semibold text-slate-700 dark:text-slate-200">
          Charlie Tai
        </span>
        <span class="text-xs text-slate-400 dark:text-slate-500">
          {{ $t('footer.tagline') }}
        </span>
      </div>

      <div class="flex items-center gap-4">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
          :aria-label="link.label"
        >
          <component :is="link.icon" style="font-size: 16px" />
        </a>
      </div>
    </div>

    <div
      class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-4 md:mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
    >
      <span>© {{ currentYear }} Charlie Tai. All rights reserved.</span>
      <span>Built with Nuxt + Tailwind</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons-vue'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/jack755051', icon: GithubOutlined },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/charlie-tai',
    icon: LinkedinOutlined,
  },
  { label: 'Email', url: 'mailto:jack755051@gmail.com', icon: MailOutlined },
]
</script>
