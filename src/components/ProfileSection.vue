<script setup>
defineProps({
  about: { type: String, required: true },
  skills: { type: Array, required: true }
})
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title" data-reveal>
    <div class="container section-grid">
      <div>
        <p class="section-kicker">About</p>
        <h2 id="about-title">從需求到資料庫，完整理解系統</h2>
        <p class="lead">{{ about }}</p>
      </div>
      <div id="skills" class="skill-panel" aria-labelledby="skills-title">
        <h3 id="skills-title">核心能力</h3>
        <ul class="tag-list">
          <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
