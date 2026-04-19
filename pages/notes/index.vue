<template>
  <div
    class="scrollable-content-wrapper min-h-screen overflow-hidden relative bg-background text-foreground transition-colors duration-500 pb-24"
  >
    <BackgroundDecor variant="subpage" />

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 md:pt-20">
      <!-- Hero -->
      <header class="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h1
          class="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
        >
          <span class="text-foreground">{{ $t('notes.titleMain') }}</span>
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rose-500 to-fuchsia-500"
          >
            {{ $t('notes.titleHighlight') }}
          </span>
        </h1>
        <p class="mt-4 text-muted-foreground text-sm md:text-base font-medium">
          {{ $t('notes.subtitle') }}
        </p>
        <p class="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          {{ $t('notes.intro') }}
        </p>

        <a
          :href="hackmdProfileUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border border-border text-foreground hover:bg-card hover:border-primary/40 hover:text-primary transition-all font-semibold text-sm"
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
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          {{ $t('notes.visitHackmdProfile') }}
        </a>
      </header>

      <!-- Empty state -->
      <div v-if="visibleNotes.length === 0" class="text-center text-muted-foreground py-16">
        <div class="text-6xl mb-4">📝</div>
        <p>{{ $t('notes.empty') }}</p>
      </div>

      <!-- Featured -->
      <section v-if="featuredNotes.length" class="mb-12 md:mb-16">
        <h2 class="font-display text-2xl font-bold text-foreground mb-6">
          ★ {{ $t('notes.featured') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NoteCard v-for="note in featuredNotes" :key="note.id" v-bind="note" />
        </div>
      </section>

      <!-- Recent / All -->
      <section v-if="recentNotes.length">
        <h2 class="font-display text-2xl font-bold text-foreground mb-6">
          {{ $t('notes.titleMain') }}{{ $t('notes.titleHighlight') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NoteCard v-for="note in recentNotes" :key="note.id" v-bind="note" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackgroundDecor from '~/components/base/background-decor.vue'
import NoteCard from '~/components/notes/note-card.vue'
import { useNotes } from '~/composables/useNotes'

const { visibleNotes, featuredNotes, recentNotes, hackmdProfileUrl } = useNotes()
</script>
