<script setup>
defineProps({
  methods: { type: Array, required: true },
  tools: { type: Array, required: true }
})
</script>

<template>
  <section id="methods" class="section" aria-labelledby="methods-title" data-reveal>
    <div class="container section-grid">
      <div>
        <p class="section-kicker">How I Work</p>
        <h2 id="methods-title">工作方式</h2>
        <ol class="method-list">
          <li v-for="(method, index) in methods" :key="method">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <p>{{ method }}</p>
          </li>
        </ol>
      </div>
      <div class="tool-panel">
        <h3>技術工具</h3>
        <ul class="tag-list">
          <li v-for="tool in tools" :key="tool">{{ tool }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
