<script setup>
// 使用 Vite 基底路徑，讓人物照片在本機與 GitHub Pages 子目錄都能正確載入。
const profilePortrait = `${import.meta.env.BASE_URL}profile-portrait.webp`

defineProps({
  about: { type: String, required: true },
  highlights: { type: Array, required: true },
  skills: { type: Array, required: true }
})
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title" data-reveal>
    <div class="container profile-layout">
      <!-- 人物照片與低調的技術軌道，建立清楚的個人辨識。 -->
      <figure class="profile-portrait">
        <div class="profile-portrait__orbit" aria-hidden="true">
          <span>Vue</span><span>API</span><span>SQL</span>
        </div>
        <img :src="profilePortrait" alt="企業系統開發工程師個人形象照" width="720" height="1082" loading="lazy">
        <figcaption>
          <span class="profile-portrait__status" aria-hidden="true"></span>
          專注企業系統開發與維運
        </figcaption>
      </figure>

      <div class="profile-story">
        <p class="section-kicker">About</p>
        <h2 id="about-title">從需求到資料庫，完整理解系統</h2>
        <p class="lead">{{ about }}</p>
        <!-- 不使用虛構年資，以三項可驗證的工作定位介紹本人。 -->
        <ul class="profile-highlights" aria-label="專業定位">
          <li v-for="(highlight, index) in highlights" :key="highlight.title" :style="`--item-index: ${index}`">
            <span>0{{ index + 1 }}</span>
            <strong>{{ highlight.title }}</strong>
            <small>{{ highlight.description }}</small>
          </li>
        </ul>
      </div>
      <div id="skills" class="skill-panel profile-skills" aria-labelledby="skills-title">
        <h3 id="skills-title">核心能力</h3>
        <ul class="tag-list">
          <li v-for="(skill, index) in skills" :key="skill" :style="`--item-index: ${index}`">{{ skill }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
