import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import App from '../App.vue'

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

  it('顯示四個匿名代表案例與正確聯絡方式', () => {
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('運輸與派車管理系統')
    expect(wrapper.text()).toContain('外銷訂單與文件系統')
    expect(wrapper.text()).toContain('ERP／WMS 資料整合')
    expect(wrapper.text()).toContain('系統穩定性與異常處理')
    expect(wrapper.get('a[href="mailto:gn00982591@gmail.com"]').exists()).toBe(true)
    expect(wrapper.get('a[href="https://github.com/gn00982591"]').exists()).toBe(true)
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

  it('以專業狀態與時間軸強化後段內容', () => {
    const wrapper = mount(App)

    expect(wrapper.get('.method-timeline').attributes('aria-label')).toBe('企業系統問題處理流程')
    expect(wrapper.text()).toContain('目前開放職涯交流')
    expect(wrapper.findAll('.project-card[data-sequence]')).toHaveLength(4)
  })

  it('不顯示機密識別資訊', () => {
    const wrapper = mount(App)

    expect(wrapper.text()).not.toMatch(/[AE]\d{6}-\d{7}/)
    expect(wrapper.text()).not.toContain('Div_Dispatch')
    expect(wrapper.text()).not.toContain('華紙')
  })

  it('提供完整區塊導覽與可理解的互動控制', () => {
    const wrapper = mount(App)

    for (const href of ['#about', '#skills', '#projects', '#methods', '#contact']) {
      expect(wrapper.get(`a[href="${href}"]`).exists()).toBe(true)
    }
    expect(wrapper.get('button[aria-controls="site-navigation"]').attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('button[aria-label*="模式"]').exists()).toBe(true)
  })

  it('瀏覽器不支援觀察器時仍直接顯示履歷區塊', async () => {
    const wrapper = mount(App)

    await nextTick()
    expect(wrapper.findAll('[data-reveal]').every((section) => section.classes('is-visible'))).toBe(true)
  })
})
