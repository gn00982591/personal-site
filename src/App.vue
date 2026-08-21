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
const appRoot = ref(null)

// 淡入效果採漸進增強；不支援觀察器時直接顯示全部內容。
onMounted(() => {
  const sections = [...appRoot.value.querySelectorAll('[data-reveal]')]
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    sections.forEach((section) => section.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  sections.forEach((section) => revealObserver.observe(section))
})

onBeforeUnmount(() => revealObserver?.disconnect())
</script>

<template>
  <div id="top" ref="appRoot">
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
