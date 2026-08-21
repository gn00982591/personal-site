<script setup>
defineProps({
  projects: { type: Array, required: true }
})
</script>

<template>
  <section id="projects" class="section section--muted" aria-labelledby="projects-title" data-reveal>
    <div class="container">
      <p class="section-kicker">Selected Work</p>
      <h2 id="projects-title">代表案例</h2>
      <p class="section-intro">以匿名方式呈現企業系統中的實際問題類型、負責範圍與處理方法。</p>
      <div class="project-grid">
        <!-- 序號同時作為卡片進場延遲值，形成有節奏的閱讀順序。 -->
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          class="project-card"
          :data-sequence="index + 1"
          :style="`--card-index: ${index}`"
        >
          <span class="project-card__signal" aria-hidden="true"></span>
          <span class="project-card__number">0{{ index + 1 }}</span>
          <h3>{{ project.title }}</h3>
          <p>{{ project.context }}</p>
          <p><strong>負責內容</strong>{{ project.responsibility }}</p>
          <ul class="tag-list tag-list--compact" aria-label="使用技術">
            <li v-for="technology in project.technologies" :key="technology">{{ technology }}</li>
          </ul>
          <p><strong>處理方式</strong>{{ project.approach }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
