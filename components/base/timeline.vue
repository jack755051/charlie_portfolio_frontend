<template>
  <div class="relative pl-8 md:pl-0">
    <div
      class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent -translate-x-1/2 md:translate-x-0 hidden md:block"
    />
    <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-border md:hidden" />

    <div
      v-for="(item, index) in timelineData"
      :key="index"
      class="relative mb-12 md:mb-16 last:mb-0 group"
    >
      <div
        class="absolute left-2 md:left-1/2 w-3 h-3 rounded-full border-2 border-background shadow-md transform -translate-x-1/2 mt-6 z-10 transition-colors duration-300"
        :class="
          item.isActive
            ? 'bg-primary scale-125'
            : 'bg-muted-foreground/50 group-hover:bg-primary/60'
        "
      />

      <div class="flex flex-col md:flex-row items-start md:items-top justify-between w-full">
        <div class="hidden md:block w-[42%] text-right pr-8 pt-4">
          <div class="text-xl font-bold text-foreground">{{ $rt(item.company) }}</div>
          <div class="text-primary font-mono text-sm mt-1">{{ $rt(item.period) }}</div>
        </div>

        <div class="w-full pl-8 md:pl-8 md:w-[48%]">
          <div class="md:hidden mb-2 ml-2">
            <h3 class="text-lg font-bold text-foreground">{{ $rt(item.company) }}</h3>
            <span class="text-xs text-primary font-mono">{{ $rt(item.period) }}</span>
          </div>

          <div
            class="relative bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group-card"
          >
            <h4 class="text-base font-bold text-foreground mb-2 flex items-center gap-2">
              <span
                class="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 group-hover:bg-primary transition-colors"
              />
              {{ $rt(item.role) }}
            </h4>

            <p class="text-sm text-muted-foreground leading-relaxed mb-3 text-justify">
              {{ $rt(item.description) }}
            </p>

            <div v-if="item.projects && item.projects.length" class="mb-3">
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="(proj, pIndex) in item.projects"
                  :key="pIndex"
                  class="px-2 py-0.5 bg-muted text-muted-foreground text-[11px] rounded border border-border"
                >
                  {{ $rt(proj) }}
                </span>
              </div>
            </div>

            <div class="pt-3 border-t border-border flex flex-wrap gap-1.5">
              <span
                v-for="(tech, tIndex) in item.stack"
                :key="tIndex"
                class="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
              >
                #{{ $rt(tech) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 我們稍微放寬 Props 的型別檢查，因為 $tm 回傳的型別比較複雜
// 或者你可以保留 IExperience[]，但要確保使用時都透過 $rt 解析字串屬性
defineProps<{
  timelineData: any[]
}>()
</script>

<style scoped>
.group-card {
  will-change: transform, box-shadow;
}
</style>
