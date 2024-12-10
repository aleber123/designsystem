import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import NButton from '../NButton.vue'

describe('NButton', () => {
  it('renders default button correctly', () => {
    const { getByRole } = render(NButton, {
      slots: {
        default: 'Click me'
      }
    })
    
    const button = getByRole('button')
    expect(button).toBeTruthy()
    expect(button.textContent).toBe('Click me')
    expect(button.classList.contains('n-button--primary')).toBe(true)
  })

  it('emits click event when clicked', async () => {
    const { getByRole, emitted } = render(NButton)
    const button = getByRole('button')
    
    await fireEvent.click(button)
    expect(emitted().click).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const { getByRole, emitted } = render(NButton, {
      props: {
        disabled: true
      }
    })
    const button = getByRole('button')
    
    await fireEvent.click(button)
    expect(emitted().click).toBeFalsy()
  })

  it('shows loader when loading', () => {
    const { container } = render(NButton, {
      props: {
        loading: true
      }
    })
    
    expect(container.querySelector('.n-button__loader')).toBeTruthy()
  })

  it('applies correct variant class', () => {
    const { getByRole } = render(NButton, {
      props: {
        variant: 'secondary'
      }
    })
    
    const button = getByRole('button')
    expect(button.classList.contains('n-button--secondary')).toBe(true)
  })
})
