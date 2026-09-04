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
        <!-- 面試完成後只保留作品入口，不再從首頁導向公開聯絡方式。 -->
        <div class="hero__actions">
          <a class="button button--primary" href="#projects">查看代表案例</a>
        </div>
      </div>
      <!-- 以可閱讀的動態資料流，呈現企業系統從需求到資料落地的完整能力。 -->
      <section class="system-flow" aria-label="企業系統即時資料流">
        <div class="system-flow__header">
          <span class="system-flow__status" aria-hidden="true"></span>
          <strong>SYSTEM FLOW</strong>
          <span class="system-flow__live">LIVE</span>
        </div>

        <!-- 每個節點依序亮起，模擬企業系統實際處理資料的過程。 -->
        <div class="system-flow__pipeline">
          <div class="system-flow__node" style="--flow-delay: 0s">
            <span class="system-flow__icon" aria-hidden="true">01</span>
            <span><strong>需求分析</strong><small>流程與規則確認</small></span>
            <span class="system-flow__result">完成</span>
          </div>
          <div class="system-flow__connector" aria-hidden="true"><i></i></div>
          <div class="system-flow__node" style="--flow-delay: .8s">
            <span class="system-flow__icon" aria-hidden="true">02</span>
            <span><strong>Vue 3 前端</strong><small>操作與資料送出</small></span>
            <span class="system-flow__result">送出</span>
          </div>
          <div class="system-flow__connector" aria-hidden="true"><i></i></div>
          <div class="system-flow__node" style="--flow-delay: 1.6s">
            <span class="system-flow__icon" aria-hidden="true">03</span>
            <span><strong>ASP.NET API</strong><small>驗證與商業邏輯</small></span>
            <span class="system-flow__result">200 OK</span>
          </div>
          <div class="system-flow__connector" aria-hidden="true"><i></i></div>
          <div class="system-flow__node" style="--flow-delay: 2.4s">
            <span class="system-flow__icon" aria-hidden="true">04</span>
            <span><strong>SQL Server</strong><small>資料寫入與整合</small></span>
            <span class="system-flow__result">成功</span>
          </div>
        </div>

        <!-- 底部訊息讓訪客不必猜測動畫所代表的意義。 -->
        <div class="system-flow__console">
          <span aria-hidden="true">›</span>
          <span>API 200 OK · 資料寫入成功</span>
        </div>
      </section>
    </div>
  </section>
</template>
