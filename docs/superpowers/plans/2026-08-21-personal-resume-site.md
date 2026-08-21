# 個人履歷介紹網站實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立並發布一個以企業系統開發與系統分析為定位的 Vue 3 響應式個人履歷網站。

**Architecture:** 使用 Vue 3 Single-File Components 組成單頁網站，履歷內容集中在 `src/data/profile.js`，畫面元件只負責展示與互動。Vite 負責開發與正式建置，Vitest 與 Vue Test Utils 驗證內容、導覽和主題切換，GitHub Actions 將 `dist` 發布到 GitHub Pages。

**Tech Stack:** Vue 3、Vite 8、JavaScript、原生 CSS、Vitest、Vue Test Utils、jsdom、GitHub Actions、GitHub Pages

**Spec:** `docs/superpowers/specs/2026-08-21-personal-resume-site-design.md`

## Global Constraints

- 首頁職稱固定為「企業系統開發工程師」。
- 專業方向固定為「企業系統開發＋系統分析」。
- 不公開姓名、現職公司、客戶、內部系統名稱、實際單號、資料表名稱或其他機密資訊。
- 公開 Email 固定為 `gn00982591@gmail.com`。
- 公開 GitHub 固定為 `https://github.com/gn00982591`。
- 預設使用米白與淺灰背景；主要文字為深藍灰；重點色為藍綠色。
- 不使用黑色作為主要背景；深色模式使用深藍灰而非純黑。
- 不加入虛構年資、公司名稱或量化成果。
- 所有新增程式必須加入必要的繁體中文註解。
- Node.js 使用 24.x；套件由 npm 產生並提交 `package-lock.json`。

## File Map

- `package.json`：專案命令與套件依賴。
- `package-lock.json`：固定實際安裝的依賴版本。
- `vite.config.js`：Vue、Vitest、jsdom 與 GitHub Pages base path。
- `index.html`：網站進入點與基本 SEO metadata。
- `src/main.js`：建立 Vue 應用程式並載入全域樣式。
- `src/App.vue`：組合所有履歷區塊並管理目前導覽區塊。
- `src/data/profile.js`：唯一的履歷文字與案例資料來源。
- `src/components/SiteHeader.vue`：桌面／手機導覽與主題切換。
- `src/components/HeroSection.vue`：職稱、定位摘要與主要行動按鈕。
- `src/components/ProfileSection.vue`：專業摘要與核心能力。
- `src/components/ProjectsSection.vue`：四個匿名代表案例。
- `src/components/WorkMethodSection.vue`：工作原則與技術工具。
- `src/components/ContactSection.vue`：GitHub 與 Email。
- `src/composables/useTheme.js`：淺色／深色主題狀態與 localStorage。
- `src/styles/main.css`：全域 token、版面、元件、響應式與減少動畫規則。
- `src/__tests__/App.spec.js`：主要內容、匿名規則與聯絡連結測試。
- `src/__tests__/useTheme.spec.js`：主題預設值、切換與儲存測試。
- `.github/workflows/deploy.yml`：建置及 GitHub Pages 部署。
- `README.md`：網站定位、開發命令與部署說明。

---

### Task 1: 建立可測試的 Vue 3／Vite 基礎專案

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.js`
- Create: `src/App.vue`
- Create: `src/styles/main.css`
- Create: `src/__tests__/App.spec.js`

**Interfaces:**
- Produces: Vite 應用程式進入點 `src/main.js`、根元件 `App.vue`、`npm run test`、`npm run build`。
- Consumes: 無。

- [ ] **Step 1: 建立專案清單與安裝依賴**

建立 `package.json`：

```json
{
  "name": "personal-site",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.0",
    "@vue/test-utils": "^2.4.0",
    "jsdom": "^26.0.0",
    "vite": "^8.0.0",
    "vitest": "^3.2.0"
  }
}
```

執行：`npm install`  
預期：產生 `package-lock.json`，命令結束碼為 0。

- [ ] **Step 2: 先建立失敗的根元件測試**

建立 `src/__tests__/App.spec.js`：

```js
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from '../App.vue'

describe('App', () => {
  it('顯示企業系統開發工程師職稱', () => {
    const wrapper = mount(App)
    expect(wrapper.get('h1').text()).toBe('企業系統開發工程師')
  })
})
```

執行：`npm run test`  
預期：FAIL，原因為 `App.vue` 尚未建立或找不到指定標題。

- [ ] **Step 3: 建立最小可執行應用程式**

建立 `vite.config.js`：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 專案站台必須使用 Repository 名稱作為 base path。
export default defineConfig({
  base: '/personal-site/',
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  }
})
```

建立 `index.html`、`src/main.js` 與含有 `<h1>企業系統開發工程師</h1>` 的 `src/App.vue`；在 `main.js` 載入 `src/styles/main.css`。

- [ ] **Step 4: 驗證測試與正式建置**

執行：`npm run test && npm run build`  
預期：測試 PASS，且 `dist/index.html` 存在。

- [ ] **Step 5: 提交基礎專案**

```bash
git add -- package.json package-lock.json vite.config.js index.html src/main.js src/App.vue src/styles/main.css src/__tests__/App.spec.js
git commit -m "chore: scaffold Vue resume site"
```

---

### Task 2: 建立匿名履歷資料與主要內容元件

**Files:**
- Create: `src/data/profile.js`
- Create: `src/components/HeroSection.vue`
- Create: `src/components/ProfileSection.vue`
- Create: `src/components/ProjectsSection.vue`
- Create: `src/components/WorkMethodSection.vue`
- Create: `src/components/ContactSection.vue`
- Modify: `src/App.vue`
- Modify: `src/__tests__/App.spec.js`

**Interfaces:**
- Produces: named export `profile`，欄位為 `title`、`direction`、`summary`、`about`、`skills`、`projects`、`workMethods`、`tools`、`contact`。
- Consumes: Task 1 的 Vue 根元件與測試環境。

- [ ] **Step 1: 增加內容與匿名規則測試**

在 `App.spec.js` 新增測試，確認四個案例標題、Email、GitHub 連結存在，並確認頁面文字不包含實際公司名稱、內部單號格式與資料表前綴。

```js
it('顯示四個匿名代表案例與正確聯絡方式', () => {
  const wrapper = mount(App)
  expect(wrapper.text()).toContain('運輸與派車管理系統')
  expect(wrapper.text()).toContain('外銷訂單與文件系統')
  expect(wrapper.text()).toContain('ERP／WMS 資料整合')
  expect(wrapper.text()).toContain('系統穩定性與異常處理')
  expect(wrapper.get('a[href="mailto:gn00982591@gmail.com"]').exists()).toBe(true)
  expect(wrapper.get('a[href="https://github.com/gn00982591"]').exists()).toBe(true)
})

it('不顯示機密識別資訊', () => {
  const wrapper = mount(App)
  expect(wrapper.text()).not.toMatch(/[AE]\d{6}-\d{7}/)
  expect(wrapper.text()).not.toContain('Div_Dispatch')
  expect(wrapper.text()).not.toContain('華紙')
})
```

執行：`npm run test`  
預期：FAIL，因案例與聯絡區塊尚未建立。

- [ ] **Step 2: 建立唯一履歷資料來源**

建立 `src/data/profile.js`，以實際已確認文字完整定義 `profile`。四個 `projects` 物件皆使用以下介面：

```js
{
  title: '運輸與派車管理系統',
  context: '支援訂單、派車、轉運、合車與簽收的企業作業流程。',
  responsibility: '分析跨階段狀態與資料關聯，追查前端、API、後端服務與資料庫的一致性。',
  technologies: ['Vue 3', 'ASP.NET Core', 'EF Core', 'SQL Server'],
  approach: '從實際流程與狀態變化確認問題來源，以最小修改維持既有架構。'
}
```

其餘三個案例依設計規格第 4.5 節填入完整文字。

- [ ] **Step 3: 建立內容元件並組合到 App**

每個元件只接收需要的 props。例如 `ProjectsSection.vue`：

```vue
<script setup>
defineProps({
  projects: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section id="projects" aria-labelledby="projects-title">
    <h2 id="projects-title">代表案例</h2>
    <article v-for="project in projects" :key="project.title">
      <h3>{{ project.title }}</h3>
      <p>{{ project.context }}</p>
      <p><strong>負責內容：</strong>{{ project.responsibility }}</p>
      <ul aria-label="使用技術">
        <li v-for="technology in project.technologies" :key="technology">
          {{ technology }}
        </li>
      </ul>
      <p><strong>處理方式：</strong>{{ project.approach }}</p>
    </article>
  </section>
</template>
```

在 `App.vue` 匯入 `profile` 與五個內容元件，依首頁、摘要、案例、工作方式、聯絡資訊順序組合。

- [ ] **Step 4: 執行內容測試與建置**

執行：`npm run test && npm run build`  
預期：所有測試 PASS，且正式建置成功。

- [ ] **Step 5: 提交履歷內容**

```bash
git add -- src/data/profile.js src/components/HeroSection.vue src/components/ProfileSection.vue src/components/ProjectsSection.vue src/components/WorkMethodSection.vue src/components/ContactSection.vue src/App.vue src/__tests__/App.spec.js
git commit -m "feat: add anonymized resume content"
```

---

### Task 3: 導覽、手機選單與淺深色主題

**Files:**
- Create: `src/components/SiteHeader.vue`
- Create: `src/composables/useTheme.js`
- Create: `src/__tests__/useTheme.spec.js`
- Modify: `src/App.vue`
- Modify: `src/__tests__/App.spec.js`

**Interfaces:**
- Produces: `useTheme()`，回傳 `theme: Ref<'light' | 'dark'>` 與 `toggleTheme(): void`。
- Consumes: Task 2 各區塊的固定 id：`about`、`skills`、`projects`、`methods`、`contact`。

- [ ] **Step 1: 先建立主題 composable 失敗測試**

建立 `src/__tests__/useTheme.spec.js`：

```js
import { beforeEach, describe, expect, it } from 'vitest'
import { useTheme } from '../composables/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('預設使用淺色主題並可切換與保存', () => {
    const { theme, toggleTheme } = useTheme()
    expect(theme.value).toBe('light')
    toggleTheme()
    expect(theme.value).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('resume-theme')).toBe('dark')
  })
})
```

執行：`npm run test -- src/__tests__/useTheme.spec.js`  
預期：FAIL，原因為 composable 尚未建立。

- [ ] **Step 2: 實作主題狀態**

建立 `useTheme.js`，預設值固定為 `light`，只接受 `light` 或 `dark` 的既有 localStorage 值。切換時同步更新 `document.documentElement.dataset.theme` 與 `resume-theme`。

- [ ] **Step 3: 建立可操作的 SiteHeader**

`SiteHeader.vue` 提供：

- 品牌文字「企業系統開發」
- 六個錨點連結
- 手機選單按鈕，具有 `aria-expanded` 與 `aria-controls`
- 主題切換按鈕，淺色時標籤為「切換為深色模式」，深色時為「切換為淺色模式」
- 點擊任何導覽連結後關閉手機選單

- [ ] **Step 4: 增加導覽與控制標籤測試**

在 `App.spec.js` 驗證所有導覽 href 均存在，並驗證兩個按鈕都有可理解的 accessible name。

執行：`npm run test`  
預期：所有測試 PASS。

- [ ] **Step 5: 提交互動功能**

```bash
git add -- src/components/SiteHeader.vue src/composables/useTheme.js src/__tests__/useTheme.spec.js src/App.vue src/__tests__/App.spec.js
git commit -m "feat: add navigation and theme controls"
```

---

### Task 4: 完成淺色視覺、響應式與動態效果

**Files:**
- Modify: `src/styles/main.css`
- Modify: `src/components/HeroSection.vue`
- Modify: `src/components/ProfileSection.vue`
- Modify: `src/components/ProjectsSection.vue`
- Modify: `src/components/WorkMethodSection.vue`
- Modify: `src/components/ContactSection.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Produces: CSS custom properties、`.container`、`.section`、`.project-grid`、`.tag-list`、`.button` 與響應式規則。
- Consumes: Task 2 的內容結構與 Task 3 的 `data-theme` 屬性。

- [ ] **Step 1: 定義主題 token**

在 `main.css` 定義淺色預設值：

```css
:root {
  --color-bg: #f7f5ef;
  --color-surface: #ffffff;
  --color-surface-muted: #eef3f2;
  --color-text: #18323d;
  --color-text-muted: #5d7078;
  --color-accent: #087f7a;
  --color-accent-strong: #05615d;
  --color-border: #d7e2df;
  --shadow-card: 0 18px 48px rgb(24 50 61 / 10%);
}

:root[data-theme='dark'] {
  --color-bg: #172932;
  --color-surface: #203741;
  --color-surface-muted: #29454d;
  --color-text: #edf7f5;
  --color-text-muted: #bfd0ce;
  --color-accent: #62d1c6;
  --color-accent-strong: #8be0d8;
  --color-border: #41616a;
  --shadow-card: 0 18px 48px rgb(7 24 31 / 28%);
}
```

- [ ] **Step 2: 實作版面與元件樣式**

完成 sticky header、雙欄 hero、能力標籤、案例卡片網格、工作步驟、聯絡卡片、focus-visible 樣式。最大內容寬度使用 `1120px`，正文行長控制在 `70ch` 以內。

- [ ] **Step 3: 加入響應式與減少動畫規則**

在 `768px` 以下改為單欄、顯示手機選單按鈕、按鈕提供足夠觸控尺寸；在 `prefers-reduced-motion: reduce` 時關閉平滑捲動、transition 與動畫。

- [ ] **Step 4: 加入漸進式淡入效果**

在 `App.vue` 使用 `IntersectionObserver` 為 `[data-reveal]` 元素加入 `is-visible`。當瀏覽器不支援 observer 或使用者要求減少動畫時，直接顯示所有內容。

- [ ] **Step 5: 執行完整驗證並提交**

執行：`npm run test && npm run build`  
預期：所有測試 PASS，正式建置成功，`dist/index.html` 存在。

```bash
git add -- src/styles/main.css src/components/HeroSection.vue src/components/ProfileSection.vue src/components/ProjectsSection.vue src/components/WorkMethodSection.vue src/components/ContactSection.vue src/App.vue
git commit -m "style: complete responsive resume design"
```

---

### Task 5: SEO、說明文件與 GitHub Pages 自動部署

**Files:**
- Modify: `index.html`
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`

**Interfaces:**
- Produces: `dist` GitHub Pages artifact 與網站 URL `https://gn00982591.github.io/personal-site/`。
- Consumes: Task 1 的 `npm run build`、`vite.config.js` base path 與 Task 4 的完整網站。

- [ ] **Step 1: 補齊 SEO metadata**

在 `index.html` 設定：

```html
<title>企業系統開發工程師｜個人履歷</title>
<meta name="description" content="結合企業系統開發、系統分析、ASP.NET、Vue 與 SQL Server 的個人履歷介紹。" />
<meta name="theme-color" content="#f7f5ef" />
```

- [ ] **Step 2: 建立 GitHub Pages workflow**

建立 `.github/workflows/deploy.yml`，只在 `main` push 或手動觸發時執行；權限固定為 `contents: read`、`pages: write`、`id-token: write`。工作流程依序使用 checkout、Node 24、`npm ci`、`npm test`、`npm run build`、configure-pages、upload-pages-artifact 與 deploy-pages，且 deploy job 使用 `github-pages` environment。

- [ ] **Step 3: 建立 README**

README 說明網站目的、技術、匿名化原則、`npm install`、`npm run dev`、`npm run test`、`npm run build` 與部署 URL，不加入內部專案識別資訊。

- [ ] **Step 4: 執行最終驗證**

執行：

```bash
npm ci
npm run test
npm run build
test -f dist/index.html
```

預期：所有命令結束碼為 0。

- [ ] **Step 5: 提交部署設定**

```bash
git add -- index.html .github/workflows/deploy.yml README.md
git commit -m "ci: deploy resume site to GitHub Pages"
```

- [ ] **Step 6: 檢查 GitHub Actions 與發布結果**

確認最新 workflow run 成功，並以 HTTP GET 驗證 `https://gn00982591.github.io/personal-site/` 回應 200 且包含「企業系統開發工程師」。
