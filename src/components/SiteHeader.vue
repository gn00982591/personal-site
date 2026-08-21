<script setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'

const isMenuOpen = ref(false)
const { theme, toggleTheme } = useTheme()

const navigationItems = [
  { label: '關於我', href: '#about' },
  { label: '核心能力', href: '#skills' },
  { label: '代表案例', href: '#projects' },
  { label: '技術與方法', href: '#methods' },
  { label: '聯絡方式', href: '#contact' }
]

// 手機版選取導覽項目後收合選單，避免遮住後續內容。
function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="site-brand" href="#top" aria-label="回到頁面頂端">企業系統開發</a>
      <button
        class="menu-toggle"
        type="button"
        aria-controls="site-navigation"
        :aria-expanded="String(isMenuOpen)"
        aria-label="切換導覽選單"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span></span><span></span><span></span>
      </button>
      <nav id="site-navigation" class="site-navigation" :class="{ 'is-open': isMenuOpen }" aria-label="主要導覽">
        <a v-for="item in navigationItems" :key="item.href" :href="item.href" @click="closeMenu">
          {{ item.label }}
        </a>
        <button
          class="theme-toggle"
          type="button"
          :aria-label="theme === 'light' ? '切換為深色模式' : '切換為淺色模式'"
          @click="toggleTheme"
        >
          <span aria-hidden="true">{{ theme === 'light' ? '◐' : '○' }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>
