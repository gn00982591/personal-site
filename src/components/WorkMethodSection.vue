<script setup>
defineProps({
  methods: { type: Array, required: true },
  tools: { type: Array, required: true },
  aiPractice: { type: Object, required: true }
})
</script>

<template>
  <section id="methods" class="section" aria-labelledby="methods-title" data-reveal>
    <div class="container section-grid">
      <div>
        <p class="section-kicker">How I Work</p>
        <h2 id="methods-title">工作方式</h2>
        <!-- 垂直時間軸呈現處理企業系統問題的固定方法與先後順序。 -->
        <ol class="method-list method-timeline" aria-label="企業系統問題處理流程">
          <li v-for="(method, index) in methods" :key="method" :style="`--item-index: ${index}`">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <p>{{ method }}</p>
          </li>
        </ol>
      </div>
      <div class="tool-panel tool-panel--stack">
        <h3>技術工具</h3>
        <ul class="tag-list">
          <li v-for="(tool, index) in tools" :key="tool" :style="`--item-index: ${index}`">{{ tool }}</li>
        </ul>
        <div class="tool-panel__signature" aria-hidden="true">
          <span>Vue 3</span><i></i><span>ASP.NET</span><i></i><span>SQL Server</span>
        </div>
      </div>

      <!-- AI 能力以實際分析流程與驗證原則呈現，避免只列工具名稱。 -->
      <article class="ai-practice" aria-label="AI 輔助企業系統分析與開發">
        <div class="ai-practice__heading">
          <div>
            <p class="section-kicker">AI Assisted Engineering</p>
            <h3>{{ aiPractice.title }}</h3>
          </div>
          <span class="ai-practice__tool">Cursor + AI</span>
        </div>
        <p>{{ aiPractice.summary }}</p>
        <ol class="ai-practice__workflow">
          <li v-for="(item, index) in aiPractice.workflow" :key="item" :style="`--item-index: ${index}`">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ item }}</strong>
          </li>
        </ol>
        <p class="ai-practice__verification"><span aria-hidden="true">✓</span>{{ aiPractice.verification }}</p>
      </article>
    </div>
  </section>
</template>
