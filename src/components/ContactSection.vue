<script setup>
defineProps({
  contact: { type: Object, required: true }
})
</script>

<template>
  <section id="contact" class="section section--contact" aria-labelledby="contact-title" data-reveal>
    <div class="container contact-card">
      <div>
        <p class="section-kicker">Contact</p>
        <h2 id="contact-title">一起把複雜流程整理清楚</h2>
        <p>若你正在尋找兼具系統分析、程式開發與資料整合能力的工程師，歡迎與我聯絡。</p>
      </div>
      <div class="contact-card__links">
        <a class="button button--primary" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        <a class="button button--secondary" :href="contact.github" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  </section>
</template>
