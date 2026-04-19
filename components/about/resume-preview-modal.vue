<template>
  <Teleport to="body">
    <Transition name="resume-backdrop">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('resume.preview_title')"
        @click.self="close"
      >
        <Transition name="resume-panel">
          <div
            v-if="modelValue"
            class="relative bg-card text-foreground rounded-2xl shadow-2xl border border-border w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-5 py-4 border-b border-border shrink-0"
            >
              <h3 class="font-display text-lg md:text-xl font-bold">
                {{ $t('resume.preview_title') }}
              </h3>
              <button
                type="button"
                class="inline-flex items-center justify-center h-9 w-9 rounded-full text-foreground/80 hover:bg-foreground/10 transition-colors"
                :aria-label="$t('resume.close')"
                @click="close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Body: Google Docs iframe preview -->
            <div class="flex-1 relative bg-muted">
              <iframe
                v-if="loaded"
                :src="previewUrl"
                class="absolute inset-0 w-full h-full border-0"
                :title="$t('resume.preview_title')"
                loading="lazy"
              />
              <div
                v-else
                class="absolute inset-0 flex items-center justify-center text-muted-foreground"
              >
                <div class="flex flex-col items-center gap-3">
                  <div
                    class="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin"
                  />
                  <span class="text-sm">{{ $t('resume.loading') }}</span>
                </div>
              </div>
            </div>

            <!-- Footer: dual CTA -->
            <div
              class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 px-5 py-4 border-t border-border shrink-0 bg-background/60"
            >
              <a
                :href="pdfUrl"
                download
                class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground hover:bg-card hover:border-primary/40 hover:text-primary transition-all font-semibold text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {{ $t('resume.download') }}
              </a>
              <a
                :href="googleDocsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-rose-500 text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:-translate-y-0.5 transition-all text-sm"
              >
                {{ $t('resume.openInGoogleDocs') }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

interface Props {
  modelValue: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Google Docs：編輯 URL 不可 iframe，必須改為 /preview
const googleDocsUrl =
  'https://docs.google.com/document/d/1WwuShYKpSMAs5GyFUshwfojPVXgrdEBsPNHL13hAIB4/edit?usp=sharing'
const previewUrl =
  'https://docs.google.com/document/d/1WwuShYKpSMAs5GyFUshwfojPVXgrdEBsPNHL13hAIB4/preview'
const pdfUrl = '/charlie_portfolio_frontend/charlie-resume-2026.pdf'

const loaded = ref(false)

const close = () => emit('update:modelValue', false)

const handleEsc = (e: KeyboardEvent) => {
  if (props.modelValue && e.key === 'Escape') close()
}

// body scroll lock + 延遲載入 iframe 避免開啟動畫卡頓
watch(
  () => props.modelValue,
  open => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      document.addEventListener('keydown', handleEsc)
      setTimeout(() => {
        loaded.value = true
      }, 250)
    } else {
      document.removeEventListener('keydown', handleEsc)
      loaded.value = false
    }
  }
)

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleEsc)
  }
})
</script>

<style scoped>
.resume-backdrop-enter-active,
.resume-backdrop-leave-active {
  transition: opacity 0.25s ease;
}
.resume-backdrop-enter-from,
.resume-backdrop-leave-to {
  opacity: 0;
}

.resume-panel-enter-active,
.resume-panel-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.resume-panel-enter-from,
.resume-panel-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
