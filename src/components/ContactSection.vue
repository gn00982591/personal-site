<script setup>
// 使用 Vite 基底路徑，確保 QR Code 在 GitHub Pages 子目錄仍能正確載入。
const baseUrl = import.meta.env.BASE_URL
// 正式部署顯示 GitHub 分支與短版 Commit 碼；本機未注入時保留可辨識的預設值。
const gitBranch = import.meta.env.VITE_GIT_BRANCH || 'local'
const gitCommit = (import.meta.env.VITE_GIT_SHA || 'working-tree').slice(0, 7)

defineProps({
  contact: { type: Object, required: true }
})
</script>

<template>
  <section id="contact" class="section section--contact" aria-labelledby="contact-title" data-reveal>
    <div class="container contact-card">
      <div>
        <p class="section-kicker">Contact</p>
        <!-- 狀態文字讓聯絡區更像真實人物履歷，而不是一般網站表單。 -->
        <p class="availability"><span aria-hidden="true"></span>目前開放職涯交流</p>
        <h2 id="contact-title">一起把複雜流程整理清楚</h2>
        <p>若你正在尋找兼具系統分析、程式開發與資料整合能力的工程師，歡迎與我聯絡。</p>
      </div>
      <div class="contact-card__links">
        <a class="button button--primary" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        <a class="button button--secondary" :href="contact.github" target="_blank" rel="noreferrer">GitHub</a>
      </div>

      <!-- 104 履歷同時提供可點擊連結與 QR Code，兼顧手機及電腦訪客。 -->
      <div class="contact-card__resume">
        <div>
          <p class="section-kicker">104 Profile</p>
          <h3>104 線上履歷</h3>
          <p>手機可直接開啟，電腦可使用手機掃描 QR Code。</p>
          <a
            class="button button--secondary"
            :href="contact.resume104.url"
            target="_blank"
            rel="noreferrer"
          >查看 104 完整履歷</a>
        </div>
        <a
          class="resume-qr"
          :href="contact.resume104.url"
          target="_blank"
          rel="noreferrer"
          aria-label="開啟 104 完整履歷"
        >
          <img
            :src="`${baseUrl}${contact.resume104.qrCode}`"
            alt="掃描 QR Code 查看 104 完整履歷"
            width="180"
            height="180"
            loading="lazy"
          >
        </a>
      </div>

      <!-- 最底端以單行資訊交代建立流程，並用 GitHub 分支與 Commit 對應公開版本。 -->
      <div class="site-build-meta" aria-label="網站建立流程與版本">
        <p><strong>建立流程</strong><span>{{ contact.siteBuild.process }}</span></p>
        <p class="site-build-meta__version">
          <strong>GitHub</strong><span>{{ gitBranch }} · {{ gitCommit }}</span><span>{{ contact.siteBuild.updated }}</span>
        </p>
      </div>
    </div>
  </section>
</template>
