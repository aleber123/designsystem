import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import NInput from '../NInput.vue'

describe('NInput', () => {
  it('renders input with label correctly', () => {
    const { getByLabelText } = render(NInput, {
      props: {
        label: 'Email',
        modelValue: ''
      }
    })
    
    const input = getByLabelText('Email')
    expect(input).toBeTruthy()
    expect(input.tagName).toBe('INPUT')
  })

  it('shows required indicator when required prop is true', () => {
    const { container } = render(NInput, {
      props: {
        label: 'Email',
        required: true,
        modelValue: ''
      }
    })
    
    const requiredIndicator = container.querySelector('.n-input__required')
    expect(requiredIndicator).toBeTruthy()
    expect(requiredIndicator?.textContent).toBe('*')
  })

  it('emits update:modelValue event on input', async () => {
    const { getByRole, emitted } = render(NInput, {
      props: {
        label: 'Email',
        modelValue: ''
      }
    })
    
    const input = getByRole('textbox')
    await fireEvent.update(input, 'test@example.com')
    
    expect(emitted()['update:modelValue']).toBeTruthy()
    expect(emitted()['update:modelValue'][0]).toEqual(['test@example.com'])
  })

  it('shows error message when error prop is provided', () => {
    const { getByText, getByRole } = render(NInput, {
      props: {
        label: 'Email',
        error: 'Invalid email address',
        modelValue: ''
      }
    })
    
    const errorMessage = getByText('Invalid email address')
    expect(errorMessage).toBeTruthy()
    
    const input = getByRole('textbox')
    expect(input.getAttribute('aria-invalid')).toBe('true')
  })

  it('disables input when disabled prop is true', () => {
    const { getByRole } = render(NInput, {
      props: {
        label: 'Email',
        disabled: true,
        modelValue: ''
      }
    })
    
    const input = getByRole('textbox')
    expect(input.hasAttribute('disabled')).toBe(true)
  })
})
