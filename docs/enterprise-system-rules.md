# 企業系統規則異動紀錄

## BR-CONTACT-001

- 功能名稱：個人履歷網站－公開聯絡方式
- 規則版本：2.0.0
- 修改日期：2026-09-04
- 需求單號：未提供

### 原有規則

- 頁首與首頁提供「聯絡方式／聯絡我」入口。
- 頁尾前的聯絡區公開 Email、GitHub 個人連結、104 履歷、QR Code 與「目前開放職涯交流」狀態。
- 網站建立流程與 GitHub 分支／Commit 顯示在聯絡區底端。

### 新增規則

- 網站建立流程與 GitHub 分支／Commit 改於頁尾獨立顯示，不依賴聯絡資料。
- 正式建置內容不得包含已移除的求職聯絡入口或 QR 圖片。

### 移除規則

- 移除 Email、GitHub 個人連結、104 履歷連結、QR Code 與求職開放狀態。
- 移除頁首及首頁的聯絡導覽入口。

### 衝突處理

- 「版本需依 GitHub 分支註記」仍有效；僅移動顯示位置，不改為固定版號。
- 舊 Git 歷史不在本次非破壞性修改範圍內；目前版本的公開原始碼與建置產物不再保留聯絡值。

### 影響程式

- `src/App.vue`
- `src/components/SiteHeader.vue`
- `src/components/HeroSection.vue`
- `src/components/ContactSection.vue`（移除）
- `src/data/profile.js`
- `src/styles/main.css`
- `public/resume-104-qr.png`（移除）
- `src/__tests__/App.spec.js`
- 既有規格與計畫文件中的聯絡值（匿名化）

### 測試案例

- `TC-CONTACT-001`：頁面不含 Email、GitHub 個人連結、104 連結、QR 圖片及求職狀態；取代原「正確聯絡方式」與「104 履歷連結」案例。
- `TC-CONTACT-002`：頁尾仍顯示建立流程、GitHub 分支、短 Commit 與更新月份。
- `TC-NAV-001`：主要導覽及首頁不含 `#contact` 入口。

### 回歸測試

- 職稱、人物介紹、企業規模、四個匿名案例、AI 工程能力與上下捲動動畫維持正常。
