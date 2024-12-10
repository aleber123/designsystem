<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  label?: string
  disabled?: boolean
  name?: string
  required?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  required: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggleId = computed(() => `toggle-${Math.random().toString(36).slice(2, 11)}`)

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle()
  }
}
</script>

<template>
  <div class="n-toggle-wrapper">
    <label :for="toggleId" class="n-toggle-label" v-if="label">
      {{ label }}
      <span v-if="required" class="required" aria-hidden="true">*</span>
    </label>
    
    <div
      :id="toggleId"
      class="n-toggle"
      :class="{
        'is-active': modelValue,
        'is-disabled': disabled
      }"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="ariaLabel || label"
      :aria-disabled="disabled"
      tabindex="0"
      @click="toggle"
      @keydown="handleKeyDown"
    >
      <div class="n-toggle-track">
        <div class="n-toggle-thumb"></div>
      </div>
      <span class="n-toggle-status" aria-hidden="true">
        {{ modelValue ? 'På' : 'Av' }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.n-toggle-wrapper {
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
}

.n-toggle-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color, #1a1a1a);
}

.required {
  color: var(--error-color, #dc2626);
  margin-left: 0.25rem;
}

.n-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.n-toggle:focus-visible {
  outline: 2px solid var(--primary-color, #FF7F50);
  outline-offset: 2px;
  border-radius: 9999px;
}

.n-toggle.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.n-toggle-track {
  position: relative;
  width: 3rem;
  height: 1.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  transition: background-color 0.2s ease;
}

.n-toggle.is-active .n-toggle-track {
  background-color: var(--primary-color, #FF7F50);
}

.n-toggle-thumb {
  position: absolute;
  left: 0.125rem;
  top: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.n-toggle.is-active .n-toggle-thumb {
  transform: translateX(1.5rem);
}

.n-toggle-status {
  font-size: 0.875rem;
  color: var(--text-color, #1a1a1a);
}
</style>
