<template>
  <div
    v-motion="motion.page"
    class="min-h-screen bg-background text-foreground transition-colors duration-500 pb-24"
  >
    <!-- Reading progress bar -->
    <div
      class="fixed top-0 left-0 h-0.5 bg-primary z-50 transition-all duration-100"
      :style="{ width: `${readProgress}%` }"
    />

    <BackgroundDecor variant="subpage" />

    <div class="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 md:pt-20">
      <NuxtLink
        to="/notes"
        class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {{ $t('notes.titleMain') }}{{ $t('notes.titleHighlight') }}
      </NuxtLink>

      <div v-if="note" class="flex gap-10">
        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <header v-motion="motion.heading" class="mb-10">
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span
                v-for="tag in (note.meta?.tags || [])"
                :key="tag"
                class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20"
              >
                #{{ tag }}
              </span>
              <span v-if="note.meta?.published_at" class="text-xs text-muted-foreground font-mono">
                {{ note.meta.published_at }}
              </span>
            </div>
            <h1 class="font-display text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
              {{ note.title }}
            </h1>
            <p v-if="note.meta?.summary" class="mt-3 text-muted-foreground text-base leading-relaxed">
              {{ note.meta.summary }}
            </p>
            <div class="flex items-center gap-4 mt-4">
              <a
                v-if="note.meta?.hackmd_url"
                :href="note.meta.hackmd_url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {{ $t('notes.readOnHackmd') }}
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </header>

          <article class="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-2 prose-h2:mt-12 prose-h3:mt-8 prose-pre:rounded-xl prose-pre:border prose-pre:border-border/50 prose-code:text-primary prose-a:text-primary">
            <ContentRenderer :value="note" />
          </article>
        </div>

        <!-- TOC sidebar (desktop) -->
        <aside
          v-if="toc.length > 0"
          class="hidden lg:block w-56 flex-shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto"
        >
          <div class="border-l-2 border-border pl-4">
            <h4 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              目錄
            </h4>
            <nav class="space-y-1.5">
              <a
                v-for="item in toc"
                :key="item.id"
                :href="`#${item.id}`"
                class="block text-xs leading-snug transition-colors duration-200 hover:text-primary"
                :class="[
                  item.level === 3 ? 'pl-3 text-muted-foreground/70' : 'text-muted-foreground font-medium',
                ]"
              >
                {{ item.text }}
              </a>
            </nav>
          </div>
        </aside>
      </div>

      <div v-else class="text-center text-muted-foreground py-20">
        <p>筆記不存在</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackgroundDecor from '~/components/base/background-decor.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const motion = useMotionPresets()
const slug = route.params.slug as string

const { data: note } = useAsyncData(`note-${slug}`, () =>
  queryCollection('content').path(`/notes/${slug}`).first()
)

const toc = computed(() => note.value?.meta?.toc || [])

// Reading progress
const readProgress = ref(0)
const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  readProgress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
}

onMounted(() => window.addEventListener('scroll', updateProgress, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', updateProgress))
</script>
