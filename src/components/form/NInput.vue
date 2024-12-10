<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'

interface Props {
  modelValue?: string
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  success?: string
  hint?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'focus'): void
}>()

const inputValue = useVModel(props, 'modelValue', emit)
const isFocused = ref(false)
const inputId = computed(() => props.id || `n-input-${Math.random().toString(36).slice(2, 11)}`)

const classes = computed(() => ({
  'n-input': true,
  'n-input--focused': isFocused.value,
  'n-input--disabled': props.disabled,
  'n-input--error': !!props.error,
  'n-input--success': !!props.success
}))

const handleFocus = () => {
  isFocused.value = true
  emit('focus')
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}
</script>

<template>
  <div :class="classes">
    <label :for="inputId" class="n-input__label">
      {{ label }}
      <span v-if="required" class="n-input__required" aria-hidden="true">*</span>
    </label>
    
    <div class="n-input__wrapper">
      <input
        :id="inputId"
        :type="type"
        v-model="inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :aria-required="required"
        :aria-invalid="!!error"
        :aria-describedby="[error && `${inputId}-error`, hint && `${inputId}-hint`, success && `${inputId}-success`].filter(Boolean).join(' ')"
        class="n-input__field"
        @focus="handleFocus"
        @blur="handleBlur"
      >
    </div>

    <div class="n-input__messages" role="alert">
      <p v-if="error" :id="`${inputId}-error`" class="n-input__error">
        {{ error }}
      </p>
      <p v-if="success" :id="`${inputId}-success`" class="n-input__success">
        {{ success }}
      </p>
      <p v-if="hint" :id="`${inputId}-hint`" class="n-input__hint">
        {{ hint }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.n-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;

  &__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
  }

  &__required {
    color: var(--error-color, #dc3545);
    margin-left: 0.25rem;
  }

  &__wrapper {
    position: relative;
    width: 100%;
  }

  &__field {
    width: 100%;
    padding: 0.625rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--text-color);
    background-color: var(--input-bg, white);
    border: 2px solid var(--border-color, #e2e8f0);
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &::placeholder {
      color: var(--text-secondary);
      opacity: 0.7;
    }

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(255, 127, 80, 0.15);
    }

    &:disabled {
      background-color: var(--disabled-bg, #f8f9fa);
      cursor: not-allowed;
    }
  }

  &--error &__field {
    border-color: var(--error-color, #dc3545);

    &:focus {
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
    }
  }

  &--success &__field {
    border-color: var(--success-color, #198754);

    &:focus {
      box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.15);
    }
  }

  &__messages {
    min-height: 1.5rem;
    font-size: 0.875rem;
  }

  &__error {
    color: var(--error-color, #dc3545);
    margin: 0;
  }

  &__success {
    color: var(--success-color, #198754);
    margin: 0;
  }

  &__hint {
    color: var(--text-secondary);
    margin: 0;
  }
}
</style>
