<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HeroSection from './components/HeroSection.vue'
import ProfileSection from './components/ProfileSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import WorkMethodSection from './components/WorkMethodSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import { profile } from './data/profile'

let revealObserver
let scrollFrameId
let scrollFramePending = false
let lastScrollY = 0
let scrollDirection = 'down'
const appRoot = ref(null)
const scrollProgress = ref(0)

// 同步捲動方向與閱讀進度；使用動畫影格避免高頻 scroll 事件重複計算。
const updateScrollState = () => {
  const currentScrollY = Math.max(window.scrollY || 0, 0)

  if (currentScrollY !== lastScrollY) {
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up'
  }
  lastScrollY = currentScrollY

  const pageHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  scrollProgress.value = Math.min(currentScrollY / pageHeight, 1)
}

const handleScroll = () => {
  if (scrollFramePending) return

  scrollFramePending = true
  scrollFrameId = window.requestAnimationFrame(() => {
    scrollFramePending = false
    scrollFrameId = undefined
    updateScrollState()
  })
}

// 雙向淡入採漸進增強；不支援觀察器時仍直接顯示全部內容。
onMounted(() => {
  const sections = [...appRoot.value.querySelectorAll('[data-reveal]')]
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  lastScrollY = Math.max(window.scrollY || 0, 0)
  scrollDirection = 'down'
  scrollFramePending = false
  updateScrollState()
  window.addEventListener('scroll', handleScroll, { passive: true })

  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    sections.forEach((section) => section.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.dataset.revealDirection = scrollDirection
        entry.target.classList.add('is-visible')
      } else {
        // 區塊完全離開畫面後重置，使反向捲動再次進入時能重播效果。
        entry.target.classList.remove('is-visible')
      }
    })
  }, { threshold: 0.12 })

  sections.forEach((section) => revealObserver.observe(section))
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  window.removeEventListener('scroll', handleScroll)
  if (scrollFrameId != null) window.cancelAnimationFrame(scrollFrameId)
})
</script>

<template>
  <div id="top" ref="appRoot" :style="{ '--scroll-progress': scrollProgress }">
    <!-- 固定於頁首的細線呈現目前閱讀進度，不影響頁面操作。 -->
    <div class="scroll-progress" aria-hidden="true"></div>
    <SiteHeader />
  <main>
    <HeroSection :title="profile.title" :direction="profile.direction" :summary="profile.summary" />
    <ProfileSection :about="profile.about" :highlights="profile.highlights" :skills="profile.skills" />
    <ProjectsSection :projects="profile.projects" />
    <WorkMethodSection :methods="profile.workMethods" :tools="profile.tools" :ai-practice="profile.aiPractice" />
    <ContactSection :contact="profile.contact" />
  </main>
    <footer class="site-footer">
      <div class="container">以清楚的邏輯，打造穩定可維護的企業系統。</div>
    </footer>
  </div>
</template>
