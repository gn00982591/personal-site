import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import App from '../App.vue'

// 每個測試後卸載元件，避免捲動監聽器與觀察器殘留到下一個案例。
enableAutoUnmount(afterEach)

describe('App', () => {
  it('顯示企業系統開發工程師職稱', () => {
    const wrapper = mount(App)

    expect(wrapper.get('h1').text()).toBe('企業系統開發工程師')
  })

  it('首頁以可理解的即時資料流呈現企業系統能力', () => {
    const wrapper = mount(App)
    const flow = wrapper.get('[aria-label="企業系統即時資料流"]')

    expect(flow.text()).toContain('SYSTEM FLOW')
    expect(flow.text()).toContain('需求分析')
    expect(flow.text()).toContain('API 200 OK')
    expect(flow.text()).toContain('資料寫入成功')
    expect(flow.findAll('.system-flow__node')).toHaveLength(4)
  })

  it('顯示四個匿名代表案例', () => {
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('運輸與派車管理系統')
    expect(wrapper.text()).toContain('外銷訂單與文件系統')
    expect(wrapper.text()).toContain('ERP／WMS 資料整合')
    expect(wrapper.text()).toContain('系統穩定性與異常處理')
  })

  it('以人物照片與專業定位介紹本人', () => {
    const wrapper = mount(App)
    const portrait = wrapper.get('img[alt="企業系統開發工程師個人形象照"]')

    expect(portrait.attributes('src')).toContain('profile-portrait.webp')
    expect(wrapper.findAll('.profile-highlights li')).toHaveLength(3)
    expect(wrapper.text()).toContain('系統分析')
    expect(wrapper.text()).toContain('跨層開發')
    expect(wrapper.text()).toContain('穩定維運')
  })

  it('以現職企業規模與營運責任呈現系統穩定性', () => {
    const wrapper = mount(App)

    // 透過公開且匿名的工作情境，呈現大型企業核心系統的可靠性要求。
    expect(wrapper.text()).toContain('大型製造業集團')
    expect(wrapper.text()).toContain('支撐跨部門日常營運的核心企業系統')
    expect(wrapper.text()).toContain('最小修改、完整驗證及可回滾')
  })

  it('以專業狀態與時間軸強化後段內容', () => {
    const wrapper = mount(App)

    expect(wrapper.get('.method-timeline').attributes('aria-label')).toBe('企業系統問題處理流程')
    expect(wrapper.findAll('.project-card[data-sequence]')).toHaveLength(4)
  })

  it('不再公開求職聯絡方式與 QR Code', () => {
    const wrapper = mount(App)

    // 面試完成後移除所有公開求職入口，避免舊連結或聯絡資料繼續曝光。
    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(false)
    expect(wrapper.find('a[href^="https://github.com/"]').exists()).toBe(false)
    expect(wrapper.find('a[href*="pda.104.com.tw"]').exists()).toBe(false)
    expect(wrapper.find('img[src*="resume-104-qr.png"]').exists()).toBe(false)
    expect(wrapper.find('#contact').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('目前開放職涯交流')
    expect(wrapper.text()).not.toContain('聯絡我')
  })

  it('在頁尾精簡呈現網站建立流程與版本', () => {
    vi.stubEnv('VITE_GIT_BRANCH', 'main')
    vi.stubEnv('VITE_GIT_SHA', '45db5f35abbab35d852d7125e08e9e5af94e61e5')
    const wrapper = mount(App)
    const siteBuildMeta = wrapper.get('.site-footer [aria-label="網站建立流程與版本"]')

    // GitHub 分支與短版 Commit 碼對應實際部署來源，避免使用無法追溯的固定版號。
    expect(siteBuildMeta.text()).toContain('需求整理 → AI 協作設計 → Vue 開發 → 測試驗證 → GitHub Pages')
    expect(siteBuildMeta.text()).toContain('GitHub')
    expect(siteBuildMeta.text()).toContain('main · 45db5f3')
    expect(siteBuildMeta.text()).toContain('2026.09')
    vi.unstubAllEnvs()
  })

  it('將 Cursor 與 AI 使用呈現為可驗證的工程能力', () => {
    const wrapper = mount(App)
    const aiPractice = wrapper.get('[aria-label="AI 輔助企業系統分析與開發"]')

    expect(aiPractice.text()).toContain('Cursor')
    expect(aiPractice.text()).toContain('Vue → JavaScript API → Controller')
    expect(aiPractice.text()).toContain('最小修改')
    expect(aiPractice.text()).toContain('實際程式、資料與測試結果')
    expect(wrapper.text()).toContain('AI 輔助程式邏輯分析')
    expect(wrapper.text()).toContain('Context Engineering')
  })

  it('不顯示機密識別資訊', () => {
    const wrapper = mount(App)

    expect(wrapper.text()).not.toMatch(/[AE]\d{6}-\d{7}/)
    expect(wrapper.text()).not.toContain('Div_Dispatch')
    expect(wrapper.text()).not.toContain('華紙')
  })

  it('提供完整區塊導覽與可理解的互動控制', () => {
    const wrapper = mount(App)

    for (const href of ['#about', '#skills', '#projects', '#methods']) {
      expect(wrapper.get(`a[href="${href}"]`).exists()).toBe(true)
    }
    expect(wrapper.find('a[href="#contact"]').exists()).toBe(false)
    expect(wrapper.get('button[aria-controls="site-navigation"]').attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('button[aria-label*="模式"]').exists()).toBe(true)
  })

  it('瀏覽器不支援觀察器時仍直接顯示履歷區塊', async () => {
    const wrapper = mount(App)

    await nextTick()
    expect(wrapper.findAll('[data-reveal]').every((section) => section.classes('is-visible'))).toBe(true)
  })

  it('依上下捲動方向重播區塊進場效果', async () => {
    let observerCallback
    const unobserve = vi.fn()
    const disconnect = vi.fn()
    const animationFrames = []
    let nextAnimationFrameId = 1
    const originalInnerHeight = window.innerHeight
    const originalScrollHeight = document.documentElement.scrollHeight

    // 模擬瀏覽器觀察器，直接控制區塊進入與離開畫面的時機。
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) {
        observerCallback = callback
      }

      observe() {}
      unobserve(target) { unobserve(target) }
      disconnect() { disconnect() }
    })
    Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 0 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, writable: true, value: 500 })
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 1000 })
    const addEventListener = vi.spyOn(window, 'addEventListener')
    const removeEventListener = vi.spyOn(window, 'removeEventListener')
    const animationFrame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      const id = nextAnimationFrameId++
      animationFrames.push({ id, callback })
      return id
    })
    const cancelAnimationFrame = vi.spyOn(window, 'cancelAnimationFrame')

    const wrapper = mount(App)
    const section = wrapper.get('[data-reveal]').element
    const scrollListener = addEventListener.mock.calls.find(([eventName]) => eventName === 'scroll')[1]
    const animationFrameCallCountBeforeScroll = animationFrame.mock.calls.length
    animationFrames.length = 0

    window.scrollY = 200
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))
    expect(animationFrame.mock.calls.length - animationFrameCallCountBeforeScroll).toBe(1)
    animationFrames.shift().callback()
    await nextTick()
    expect(wrapper.attributes('style')).toContain('--scroll-progress: 0.4')

    observerCallback([{ target: section, isIntersecting: true }])
    await nextTick()
    expect(section.dataset.revealDirection).toBe('down')
    expect(section.classList.contains('is-visible')).toBe(true)

    observerCallback([{ target: section, isIntersecting: false }])
    expect(section.classList.contains('is-visible')).toBe(false)

    window.scrollY = 100
    window.dispatchEvent(new Event('scroll'))
    animationFrames.shift().callback()
    observerCallback([{ target: section, isIntersecting: true }])
    await nextTick()
    expect(section.dataset.revealDirection).toBe('up')
    expect(section.classList.contains('is-visible')).toBe(true)
    expect(unobserve).not.toHaveBeenCalled()
    expect(wrapper.get('.scroll-progress').exists()).toBe(true)

    // 保留一個尚未執行的影格，確認元件卸載時會完整清理資源。
    window.scrollY = 50
    window.dispatchEvent(new Event('scroll'))
    const pendingAnimationFrameId = animationFrames[0].id
    wrapper.unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
    expect(removeEventListener).toHaveBeenCalledWith('scroll', scrollListener)
    expect(cancelAnimationFrame).toHaveBeenCalledWith(pendingAnimationFrameId)

    Object.defineProperty(window, 'innerHeight', { configurable: true, writable: true, value: originalInnerHeight })
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: originalScrollHeight })
    addEventListener.mockRestore()
    removeEventListener.mockRestore()
    animationFrame.mockRestore()
    cancelAnimationFrame.mockRestore()
    vi.unstubAllGlobals()
  })
})
