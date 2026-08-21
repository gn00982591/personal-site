<script setup>
defineProps({
  title: { type: String, required: true },
  direction: { type: String, required: true },
  summary: { type: String, required: true }
})
</script>

<template>
  <section class="hero section" aria-labelledby="hero-title">
    <div class="container hero__content">
      <div>
        <p class="eyebrow">{{ direction }}</p>
        <h1 id="hero-title">{{ title }}</h1>
        <p class="hero__summary">{{ summary }}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="#projects">查看代表案例</a>
          <a class="button button--secondary" href="#contact">聯絡我</a>
        </div>
      </div>
      <div class="hero__visual" aria-hidden="true">
        <span>需求</span><span>前端</span><span>API</span><span>後端</span><span>資料庫</span>
      </div>
    </div>
  </section>
</template>
