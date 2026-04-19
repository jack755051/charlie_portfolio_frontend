<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
        @click="handleMaskClick"
      >
        <Transition
          enter-active-class="transition-all duration-300"
          leave-active-class="transition-all duration-300"
          enter-from-class="scale-90"
          leave-to-class="scale-90"
        >
          <div
            v-if="modelValue"
            class="bg-card text-card-foreground rounded-lg shadow-xl max-h-[90vh] flex flex-col relative border border-border"
            :class="[
              typeof width === 'number' ? '' : width,
              typeof maxWidth === 'number' ? '' : maxWidth,
            ]"
            :style="{
              width: typeof width === 'number' ? `${width}px` : undefined,
              maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : undefined,
            }"
            @click.stop
          >
            <!-- Header -->
            <div
              v-if="!hideHeader"
              class="px-5 py-5 border-b border-border flex items-center justify-between"
            >
              <slot name="header">
                <h3 class="m-0 text-lg font-medium text-foreground">{{ title }}</h3>
              </slot>
              <button
                v-if="showCloseButton"
                class="bg-transparent border-0 text-2xl cursor-pointer text-muted-foreground w-8 h-8 flex items-center justify-center rounded hover:bg-muted hover:text-foreground transition-all duration-300"
                @click="close"
              >
                ×
              </button>
            </div>

            <!-- Body -->
            <div class="px-5 py-5 overflow-y-auto flex-1">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div
              v-if="!hideFooter"
              class="px-5 py-4 border-t border-border flex justify-end gap-2.5"
            >
              <slot name="footer">
                <button
                  v-if="showCancelButton"
                  class="px-4 py-2 rounded border border-border text-sm cursor-pointer transition-all duration-300 outline-none bg-card text-foreground hover:border-primary hover:text-primary"
                  @click="cancel"
                >
                  {{ cancelText }}
                </button>
                <button
                  v-if="showConfirmButton"
                  class="px-4 py-2 rounded border border-transparent text-sm cursor-pointer transition-all duration-300 outline-none bg-primary text-primary-foreground hover:opacity-90"
                  @click="confirm"
                >
                  {{ confirmText }}
                </button>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
const props = defineProps({
  // 控制顯示/隱藏
  modelValue: {
    type: Boolean,
    default: false,
  },
  // 標題
  title: {
    type: String,
    default: '',
  },
  // 寬度
  width: {
    type: [String, Number],
    default: 500,
  },
  // 最大寬度
  maxWidth: {
    type: [String, Number],
    default: '90%',
  },
  // 是否顯示關閉按鈕
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  // 是否顯示取消按鈕
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  // 是否顯示確認按鈕
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  // 取消按鈕文字
  cancelText: {
    type: String,
    default: '取消',
  },
  // 確認按鈕文字
  confirmText: {
    type: String,
    default: '確認',
  },
  // 點擊遮罩是否關閉
  closeOnClickMask: {
    type: Boolean,
    default: true,
  },
  // 按 ESC 是否關閉
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  // 是否隱藏 header
  hideHeader: {
    type: Boolean,
    default: false,
  },
  // 是否隱藏 footer
  hideFooter: {
    type: Boolean,
    default: false,
  },
  // 關閉前的回調
  beforeClose: {
    type: Function,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close'])

// 處理遮罩點擊
const handleMaskClick = () => {
  if (props.closeOnClickMask) {
    close()
  }
}

// 關閉 modal
const close = async () => {
  if (props.beforeClose) {
    const result = await props.beforeClose()
    if (result === false) return
  }
  emit('update:modelValue', false)
  emit('close')
}

// 確認
const confirm = () => {
  emit('confirm')
}

// 取消
const cancel = () => {
  emit('cancel')
  close()
}

// ESC 鍵處理
const handleEsc = (e: KeyboardEvent) => {
  if (props.modelValue && props.closeOnEsc && e.key === 'Escape') {
    close()
  }
}

// 監聽 ESC 鍵
watch(
  () => props.modelValue,
  newVal => {
    if (newVal) {
      document.addEventListener('keydown', handleEsc)
      // 防止背景滾動
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }
)

// 清理
onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = ''
})
</script>
