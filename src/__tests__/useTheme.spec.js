import { beforeEach, describe, expect, it } from 'vitest'
import { useTheme } from '../composables/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('預設使用淺色主題並可切換與保存', () => {
    const { theme, toggleTheme } = useTheme()

    expect(theme.value).toBe('light')
    toggleTheme()
    expect(theme.value).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('resume-theme')).toBe('dark')
  })
})
