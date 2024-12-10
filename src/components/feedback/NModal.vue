<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick, Transition } from 'vue'
import NButton from '../base/NButton.vue'

interface Props {
  modelValue: boolean
  title: string
  hideClose?: boolean
  size?: 'small' | 'medium' | 'large'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  hideClose: false,
  size: 'medium'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const modalRef = ref<HTMLDialogElement | null>(null)
const previousActiveElement = ref<HTMLElement | null>(null)
const firstFocusableElement = ref<HTMLElement | null>(null)
const lastFocusableElement = ref<HTMLElement | null>(null)

// Track focusable elements
const getFocusableElements = () => {
  if (!modalRef.value) return []
  
  return Array.from(
    modalRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => !el.hasAttribute('disabled'))
}

// Handle keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  if (!props.modelValue) return

  switch (event.key) {
    case 'Escape':
      closeModal()
      break
    case 'Tab':
      if (!firstFocusableElement.value || !lastFocusableElement.value) return
      
      // Shift + Tab
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement.value) {
          event.preventDefault()
          lastFocusableElement.value.focus()
        }
      } 
      // Tab
      else {
        if (document.activeElement === lastFocusableElement.value) {
          event.preventDefault()
          firstFocusableElement.value.focus()
        }
      }
      break
  }
}

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (modalRef.value && !modalRef.value.contains(target) && target.classList.contains('n-modal-backdrop')) {
    closeModal()
  }
}

const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}

// Update focusable elements when content changes
const updateFocusableElements = () => {
  const focusableElements = getFocusableElements()
  firstFocusableElement.value = focusableElements[0] || null
  lastFocusableElement.value = focusableElements[focusableElements.length - 1] || null
}

// Manage focus and scroll lock
watch(() => props.modelValue, async (isOpen) => {
  if (isOpen) {
    previousActiveElement.value = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    await nextTick()
    updateFocusableElements()
    firstFocusableElement.value?.focus()
  } else {
    document.body.style.overflow = ''
    previousActiveElement.value?.focus()
  }
}, { immediate: true })

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="#modal-root">
    <Transition name="n-modal">
      <div
        v-if="modelValue"
        class="n-modal-backdrop"
        @click="handleClickOutside"
        role="presentation"
      >
        <dialog
          ref="modalRef"
          :class="['n-modal', `n-modal--${size}`]"
          :aria-label="ariaLabel || title"
          :aria-modal="true"
          role="dialog"
          open
        >
          <header class="n-modal__header">
            <h2 class="n-modal__title" id="modal-title">
              {{ title }}
            </h2>
            <NButton
              v-if="!hideClose"
              variant="text"
              aria-label="Stäng modal"
              class="n-modal__close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </NButton>
          </header>

          <div 
            class="n-modal__content"
            role="document"
            aria-labelledby="modal-title"
          >
            <slot />
          </div>

          <footer class="n-modal__footer">
            <slot name="footer">
              <NButton
                variant="secondary"
                @click="closeModal"
              >
                Stäng
              </NButton>
            </slot>
          </footer>
        </dialog>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.n-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.n-modal {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 0;
  margin: 1rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  z-index: 1001;

  // Sizes
  &--small {
    width: 100%;
    max-width: 400px;
  }

  &--medium {
    width: 100%;
    max-width: 600px;
  }

  &--large {
    width: 100%;
    max-width: 800px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }

  &__title {
    margin: 0;
    font-size: 1.25rem;
    color: var(--text-color);
    font-weight: 600;
  }

  &__close {
    font-size: 1.5rem;
    padding: 0.5rem;
    margin: -0.5rem;
    
    &:hover {
      background-color: var(--background-color);
      border-radius: 4px;
    }
  }

  &__content {
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--border-color);
  }
}

// Animation
.n-modal-enter-active,
.n-modal-leave-active {
  transition: all 0.3s ease;
}

.n-modal-enter-from,
.n-modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

// Accessibility: Hide scrollbar but keep functionality
.n-modal__content {
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--border-color);
    border-radius: 3px;
  }
}

// Focus styles
.n-modal:focus {
  outline: none;
}

.n-modal:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
</style>
