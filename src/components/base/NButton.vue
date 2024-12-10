<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  type: 'button'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const classes = computed(() => ({
  'n-button': true,
  [`n-button--${props.variant}`]: true,
  [`n-button--${props.size}`]: true,
  'n-button--disabled': props.disabled,
  'n-button--loading': props.loading
}))
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
    :type="type"
    :aria-label="ariaLabel"
    :aria-disabled="disabled"
    :aria-busy="loading"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="n-button__loader" aria-hidden="true">
      <!-- Loader SVG här -->
      <svg class="animate-spin" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
    </span>
    <slot v-else />
  </button>
</template>

<style lang="scss">
.n-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  
  // Tillgänglighet: Fokusring
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  // Variant styles
  &--primary {
    background-color: var(--primary-color, #FF7F50);
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background-color: var(--primary-color-dark, #FF6B3D);
    }
  }

  &--secondary {
    background-color: transparent;
    border: 2px solid var(--primary-color, #FF7F50);
    color: var(--primary-color, #FF7F50);

    &:hover:not(:disabled) {
      background-color: var(--primary-color, #FF7F50);
      color: white;
    }
  }

  &--text {
    background-color: transparent;
    border: none;
    color: var(--primary-color, #FF7F50);
    padding: 0.25rem 0.5rem;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  }

  // Size variants
  &--small {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  }

  &--medium {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  &--large {
    font-size: 1.125rem;
    padding: 0.75rem 1.5rem;
  }

  // States
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--loading {
    cursor: wait;

    .n-button__loader {
      width: 1.25em;
      height: 1.25em;
      margin-right: 0.5rem;
    }
  }
}
</style>
