import { ref } from 'vue'

const storageKey = 'resume-theme'

// 僅接受網站支援的主題值，避免無效的本機資料影響畫面。
function getInitialTheme() {
  const savedTheme = localStorage.getItem(storageKey)
  return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light'
}

export function useTheme() {
  const theme = ref(getInitialTheme())

  // 將主題同步到根元素與本機儲存，供 CSS 與下次造訪使用。
  function applyTheme(nextTheme) {
    theme.value = nextTheme
    document.documentElement.dataset.theme = nextTheme
    localStorage.setItem(storageKey, nextTheme)
  }

  function toggleTheme() {
    applyTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  applyTheme(theme.value)

  return { theme, toggleTheme }
}
