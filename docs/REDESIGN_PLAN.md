# NexusAI Bento - 重新設計開發計劃 v2.0

> **設計核心**：Glassmorphism（玻璃擬態）為主，淺色主題，Bento Grid 佈局為輔
> **目標**：將舊 Demo-site 重新設計為符合 2026 設計趨勢的現代化網站
> **建立日期**：2025-12-16
> **版本**：2.0（含工作流程自動化）

---

## 🚀 工作流程架構

### 工具矩陣

| 工具類型 | 工具名稱 | 用途 | 階段 |
|---------|---------|------|------|
| **Skill** | `rwd-design` | 響應式設計參考 | Phase 1-3 |
| **Skill** | `codex-cli` | 程式碼審查 | Phase 1-4 |
| **Skill** | `context-optimizer` | 大型檔案查詢 | 全程 |
| **Sub-agent** | `code-reviewer` | 程式碼品質檢查 | 每個 CSS/JS 完成後 |
| **Sub-agent** | `researcher` | 查詢設計模式 | Phase 1 準備 |
| **Sub-agent** | `debugger` | 問題排查 | Phase 5 |
| **MCP** | `playwright-mcp` | E2E 響應式測試 | Phase 5 |
| **MCP** | `chrome-devtools` | 效能分析 | Phase 5 |
| **MCP** | `sequential-thinking` | 複雜邏輯規劃 | Phase 1, 4 |

### 並行執行策略

```
Phase 1 可並行任務:
├── 1.1 Design Tokens ─────────────┐
├── 1.2 Glassmorphism Components ──┼── 同時進行（無依賴）
└── 1.3 Bento Grid System ─────────┘

Phase 2 必須順序:
2.1 Hero → 2.2 Navigation → 2.3 Features → 2.4-2.6 其他

Phase 3 可並行任務:
├── Dashboard ─────┐
├── Contact ───────┤
├── About ─────────┼── 頁面間無依賴，可並行
├── Pricing ───────┤
└── Projects ──────┘
```

---

## 目錄

1. [Phase 0：準備工作](#phase-0準備工作)
2. [Phase 1：設計系統重構](#phase-1設計系統重構)
3. [Phase 2：首頁重新設計](#phase-2首頁重新設計)
4. [Phase 3：功能頁面重構](#phase-3功能頁面重構)
5. [Phase 4：互動與動效](#phase-4互動與動效)
6. [Phase 5：測試與優化](#phase-5測試與優化)
7. [驗收標準](#驗收標準)

---

## Phase 0：準備工作

### 0.1 環境確認

```bash
# 任務清單
□ 0.1.1 確認專案結構
  - 執行: ls -la /Users/gamepig/projects/Temporary/stlye/nexus-bento
  - 預期: 確認 css/, js/, pages/, index.html 存在

□ 0.1.2 建立備份
  - 執行: cp -r nexus-bento nexus-bento.backup.$(date +%Y%m%d)
  - 目的: 確保可回滾

□ 0.1.3 確認 Git 狀態
  - 執行: git status
  - 建立新分支: git checkout -b feature/glassmorphism-redesign
```

### 0.2 資源收集（使用 Sub-agent: researcher）

```
□ 0.2.1 收集 Glassmorphism 最佳實踐
  🤖 Agent: researcher (Haiku)
  📝 Prompt: "搜尋 glassmorphism CSS 2024-2025 最佳實踐，
             包含 backdrop-filter 瀏覽器支援和效能考量"

□ 0.2.2 收集 Bento Grid 範例
  🤖 Agent: researcher (Haiku)
  📝 Prompt: "搜尋 bento grid layout CSS 實作範例，
             特別是 Apple 和現代 SaaS 網站的應用"

□ 0.2.3 確認設計參考檔案
  📂 讀取: /Users/gamepig/projects/Temporary/stlye/參考元素/2026-design-trends.json
  📂 讀取: /Users/gamepig/projects/Temporary/stlye/參考元素/2026-web-design-guide.md
```

---

## Phase 1：設計系統重構

### 1.1 建立新的 Design Tokens

**檔案**：`css/design-tokens-v2.css`
**預估 Token 節省**：使用 `context-optimizer` 三階段查詢

#### 1.1.1 淺色主題背景色

```css
/* ====== 步驟 1.1.1.1 ====== */
□ 定義淺色主題基礎背景（5 分鐘）

:root {
  /* 基礎背景層級 */
  --bg-base: #F8FAFC;         /* 最淺，頁面背景 */
  --bg-subtle: #F1F5F9;       /* 區塊背景 */
  --bg-muted: #E2E8F0;        /* 卡片內部背景 */
  --bg-emphasis: #CBD5E1;     /* 強調區域 */
}

/* ====== 步驟 1.1.1.2 ====== */
□ 定義漸層背景（5 分鐘）

:root {
  /* 主漸層 - 柔和藍紫 */
  --gradient-hero: linear-gradient(
    135deg,
    #EEF2FF 0%,    /* 淺藍 */
    #F0FDFA 50%,   /* 淺青 */
    #FDF4FF 100%   /* 淺紫 */
  );

  /* 網格漸層 */
  --gradient-mesh:
    radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.08) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(168, 85, 247, 0.06) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(6, 182, 212, 0.08) 0px, transparent 50%);
}

/* ====== 步驟 1.1.1.3 ====== */
□ 定義玻璃效果背景（5 分鐘）

:root {
  /* Glassmorphism 背景 */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-bg-hover: rgba(255, 255, 255, 0.85);
  --glass-bg-active: rgba(255, 255, 255, 0.92);
  --glass-bg-subtle: rgba(255, 255, 255, 0.4);
  --glass-bg-solid: rgba(255, 255, 255, 0.95);
}
```

#### 1.1.2 Glassmorphism 專用變數

```css
/* ====== 步驟 1.1.2.1 ====== */
□ 定義模糊效果（3 分鐘）

:root {
  --blur-xs: blur(4px);
  --blur-sm: blur(8px);
  --blur-md: blur(16px);
  --blur-lg: blur(24px);
  --blur-xl: blur(40px);
}

/* ====== 步驟 1.1.2.2 ====== */
□ 定義玻璃邊框（3 分鐘）

:root {
  --glass-border: 1px solid rgba(255, 255, 255, 0.3);
  --glass-border-hover: 1px solid rgba(255, 255, 255, 0.5);
  --glass-border-colored: 1px solid rgba(99, 102, 241, 0.2);
  --glass-border-subtle: 1px solid rgba(0, 0, 0, 0.05);
}

/* ====== 步驟 1.1.2.3 ====== */
□ 定義玻璃陰影（3 分鐘）

:root {
  --glass-shadow-sm:
    0 1px 2px rgba(0, 0, 0, 0.02),
    0 4px 16px rgba(0, 0, 0, 0.04);
  --glass-shadow-md:
    0 2px 4px rgba(0, 0, 0, 0.02),
    0 8px 32px rgba(0, 0, 0, 0.06);
  --glass-shadow-lg:
    0 4px 8px rgba(0, 0, 0, 0.02),
    0 16px 48px rgba(0, 0, 0, 0.08);
  --glass-shadow-glow:
    0 0 40px rgba(99, 102, 241, 0.1);
}
```

#### 1.1.3 色彩系統

```css
/* ====== 步驟 1.1.3.1 ====== */
□ 定義主色系（淺色主題適配）（5 分鐘）

:root {
  /* 主色 - Indigo */
  --color-primary: #6366F1;
  --color-primary-light: #818CF8;
  --color-primary-lighter: #C7D2FE;
  --color-primary-dark: #4F46E5;

  /* OKLCH 版本（更準確的色彩） */
  --color-primary-oklch: oklch(55.7% 0.24 264);
}

/* ====== 步驟 1.1.3.2 ====== */
□ 定義輔助色系（5 分鐘）

:root {
  /* 輔助色 */
  --color-accent-cyan: #06B6D4;
  --color-accent-purple: #A855F7;
  --color-accent-pink: #EC4899;
  --color-accent-emerald: #10B981;
  --color-accent-amber: #F59E0B;
}

/* ====== 步驟 1.1.3.3 ====== */
□ 定義功能色（淺色主題版本）（5 分鐘）

:root {
  /* 成功 */
  --color-success: #22C55E;
  --color-success-bg: #F0FDF4;
  --color-success-border: #BBF7D0;

  /* 警告 */
  --color-warning: #F59E0B;
  --color-warning-bg: #FFFBEB;
  --color-warning-border: #FDE68A;

  /* 錯誤 */
  --color-error: #EF4444;
  --color-error-bg: #FEF2F2;
  --color-error-border: #FECACA;

  /* 資訊 */
  --color-info: #3B82F6;
  --color-info-bg: #EFF6FF;
  --color-info-border: #BFDBFE;
}

/* ====== 步驟 1.1.3.4 ====== */
□ 定義文字色（淺色主題）（3 分鐘）

:root {
  --text-primary: #1E293B;
  --text-secondary: #475569;
  --text-tertiary: #64748B;
  --text-muted: #94A3B8;
  --text-placeholder: #CBD5E1;
}
```

#### 1.1.4 排版系統

```css
/* ====== 步驟 1.1.4.1 ====== */
□ 引入字體（3 分鐘）

/* 在 HTML head 中加入 */
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

/* ====== 步驟 1.1.4.2 ====== */
□ 定義流體字型（使用 rwd-design Skill 參考）（5 分鐘）
🔧 Skill: rwd-design

:root {
  --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 1rem + 1.25vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 1rem + 2.5vw, 2rem);
  --font-size-3xl: clamp(1.875rem, 1rem + 4.375vw, 3rem);
  --font-size-4xl: clamp(2.25rem, 1rem + 6.25vw, 4rem);
  --font-size-hero: clamp(3rem, 2rem + 5vw, 5rem);
}

/* ====== 步驟 1.1.4.3 ====== */
□ 定義字重和行高（3 分鐘）

:root {
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
}
```

#### 1.1.5 ✅ 完成後檢查

```
□ 1.1.5.1 程式碼審查
  🤖 Agent: code-reviewer (Sonnet)
  📝 Prompt: "審查 css/design-tokens-v2.css 的 CSS 變數定義，
             檢查命名一致性、值的合理性、遺漏的變數"

□ 1.1.5.2 瀏覽器測試
  - 在 index.html 中引入 design-tokens-v2.css
  - 檢查 CSS 變數是否正確載入
```

---

### 1.2 建立 Glassmorphism 元件庫

**檔案**：`css/glassmorphism.css`

#### 1.2.1 基礎玻璃卡片

```css
/* ====== 步驟 1.2.1.1 ====== */
□ 建立 .glass-card 基礎類別（10 分鐘）

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--blur-md);
  -webkit-backdrop-filter: var(--blur-md);
  border: var(--glass-border);
  border-radius: var(--radius-2xl, 1rem);
  box-shadow: var(--glass-shadow-md);
  transition: all 0.3s ease;
}

/* ====== 步驟 1.2.1.2 ====== */
□ 建立懸停狀態（5 分鐘）

.glass-card:hover {
  background: var(--glass-bg-hover);
  border: var(--glass-border-hover);
  box-shadow: var(--glass-shadow-lg);
  transform: translateY(-2px);
}

/* ====== 步驟 1.2.1.3 ====== */
□ 建立變體類別（10 分鐘）

/* 更透明版本 */
.glass-card--subtle {
  background: var(--glass-bg-subtle);
  box-shadow: var(--glass-shadow-sm);
}

/* 較不透明版本 */
.glass-card--solid {
  background: var(--glass-bg-solid);
}

/* 帶色調版本 */
.glass-card--primary {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.2);
}

.glass-card--cyan {
  background: rgba(6, 182, 212, 0.1);
  border-color: rgba(6, 182, 212, 0.2);
}

/* 強調邊框版本 */
.glass-card--bordered {
  border-width: 2px;
}
```

#### 1.2.2 玻璃導航欄

```css
/* ====== 步驟 1.2.2.1 ====== */
□ 建立 .glass-nav（10 分鐘）

.glass-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: var(--blur-lg);
  -webkit-backdrop-filter: var(--blur-lg);
  border-bottom: var(--glass-border-subtle);
  z-index: 1000;
  transition: all 0.3s ease;
}

/* ====== 步驟 1.2.2.2 ====== */
□ 建立滾動後狀態（5 分鐘）

.glass-nav--scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 導航內容容器 */
.glass-nav__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

#### 1.2.3 玻璃按鈕

```css
/* ====== 步驟 1.2.3.1 ====== */
□ 建立 .glass-btn（10 分鐘）

.glass-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: var(--blur-sm);
  -webkit-backdrop-filter: var(--blur-sm);
  border: var(--glass-border);
  border-radius: var(--radius-lg, 0.75rem);
  cursor: pointer;
  transition: all 0.2s ease;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
}

.glass-btn:active {
  transform: translateY(0);
}

/* ====== 步驟 1.2.3.2 ====== */
□ 建立按鈕變體（10 分鐘）

/* 主要按鈕 */
.glass-btn--primary {
  color: white;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.glass-btn--primary:hover {
  background: var(--color-primary-dark);
}

/* 輔助按鈕 */
.glass-btn--secondary {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  color: var(--color-primary);
}

/* 幽靈按鈕 */
.glass-btn--ghost {
  background: transparent;
  border-color: transparent;
}

.glass-btn--ghost:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* 按鈕尺寸 */
.glass-btn--sm {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-xs);
}

.glass-btn--lg {
  padding: 1rem 2rem;
  font-size: var(--font-size-base);
}
```

#### 1.2.4 玻璃輸入框

```css
/* ====== 步驟 1.2.4.1 ====== */
□ 建立 .glass-input（10 分鐘）

.glass-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 16px; /* 避免 iOS 縮放 */
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: var(--blur-sm);
  -webkit-backdrop-filter: var(--blur-sm);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-md, 0.5rem);
  transition: all 0.2s ease;
}

.glass-input::placeholder {
  color: var(--text-placeholder);
}

/* ====== 步驟 1.2.4.2 ====== */
□ 建立焦點狀態（5 分鐘）

.glass-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* 錯誤狀態 */
.glass-input--error {
  border-color: var(--color-error);
}

.glass-input--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

#### 1.2.5 ✅ 完成後檢查

```
□ 1.2.5.1 程式碼審查
  🤖 Agent: code-reviewer (Sonnet)
  📝 Prompt: "審查 css/glassmorphism.css，檢查：
             1. backdrop-filter 是否有 -webkit- 前綴
             2. 過渡動畫是否順暢
             3. 是否有無障礙問題"

□ 1.2.5.2 瀏覽器兼容性測試
  🔧 MCP: playwright-mcp
  📝 測試: 在 Chrome, Safari, Firefox 中檢查 backdrop-filter 效果
```

---

### 1.3 建立 Bento Grid 系統

**檔案**：`css/bento-grid.css`
**參考**：使用 `rwd-design` Skill

#### 1.3.1 Bento 容器

```css
/* ====== 步驟 1.3.1.1 ====== */
□ 建立 .bento-grid 容器（10 分鐘）
🔧 Skill: rwd-design（參考 Grid 響應式部分）

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 1rem;
  padding: 1rem;
}

/* ====== 步驟 1.3.1.2 ====== */
□ 建立響應式斷點（10 分鐘）

/* 平板橫向 */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 平板直向 */
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 手機 */
@media (max-width: 480px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}
```

#### 1.3.2 Bento 項目尺寸

```css
/* ====== 步驟 1.3.2.1 ====== */
□ 建立尺寸變體類別（15 分鐘）

/* 標準 1x1 */
.bento-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl, 0.75rem);
}

/* 特色 2x2 */
.bento-item--featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* 寬 2x1 */
.bento-item--wide {
  grid-column: span 2;
}

/* 高 1x2 */
.bento-item--tall {
  grid-row: span 2;
}

/* ====== 步驟 1.3.2.2 ====== */
□ 建立特殊尺寸（10 分鐘）

/* 英雄 3x2 */
.bento-item--hero {
  grid-column: span 3;
  grid-row: span 2;
}

/* 橫幅 4x1 */
.bento-item--banner {
  grid-column: span 4;
}

/* 響應式尺寸調整 */
@media (max-width: 768px) {
  .bento-item--featured,
  .bento-item--wide,
  .bento-item--hero {
    grid-column: span 2;
  }

  .bento-item--banner {
    grid-column: span 2;
  }
}

@media (max-width: 480px) {
  .bento-item--featured,
  .bento-item--wide,
  .bento-item--tall,
  .bento-item--hero,
  .bento-item--banner {
    grid-column: span 1;
    grid-row: span 1;
  }
}
```

#### 1.3.3 Bento + Glass 整合

```css
/* ====== 步驟 1.3.3.1 ====== */
□ 結合玻璃效果（10 分鐘）

.bento-item.glass-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

/* 內容區域 */
.bento-item__icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-mesh);
  border-radius: var(--radius-lg);
  font-size: 1.5rem;
}

.bento-item__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.bento-item__description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  flex: 1;
}

/* ====== 步驟 1.3.3.2 ====== */
□ 建立內容對齊變體（5 分鐘）

.bento-item--center {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.bento-item--end {
  justify-content: flex-end;
}
```

#### 1.3.4 ✅ 完成後檢查

```
□ 1.3.4.1 響應式測試
  🔧 MCP: playwright-mcp
  📝 測試: 檢查 375px, 768px, 1024px, 1440px 斷點

□ 1.3.4.2 程式碼審查
  🤖 Agent: code-reviewer (Sonnet)
  📝 Prompt: "審查 css/bento-grid.css，確認響應式斷點邏輯正確"
```

---

## Phase 2：首頁重新設計

### 2.1 Hero Section

**檔案**：`index.html`, `css/landing.css`

#### 2.1.1 HTML 結構

```html
/* ====== 步驟 2.1.1.1 ====== */
□ 建立 Hero 背景結構（10 分鐘）

<section class="hero">
  <!-- 背景層 -->
  <div class="hero__background">
    <div class="hero__gradient"></div>
    <div class="hero__blob hero__blob--1"></div>
    <div class="hero__blob hero__blob--2"></div>
    <div class="hero__blob hero__blob--3"></div>
  </div>

  <!-- 內容層 -->
  <div class="hero__content">
    <!-- 步驟 2.1.1.2 -->
  </div>
</section>

/* ====== 步驟 2.1.1.2 ====== */
□ 建立 Hero 內容結構（15 分鐘）

<div class="hero__content">
  <div class="container">
    <!-- Badge -->
    <div class="hero__badge glass-card--subtle">
      <span class="hero__badge-dot"></span>
      <span data-lang="zh">v3.0 全新發布</span>
      <span data-lang="en" style="display:none">v3.0 Now Available</span>
    </div>

    <!-- 標題 -->
    <h1 class="hero__title">
      <span data-lang="zh">打造未來的</span>
      <span data-lang="en" style="display:none">Build the Future</span>
      <br>
      <span class="hero__title-gradient" data-lang="zh">設計系統</span>
      <span class="hero__title-gradient" data-lang="en" style="display:none">Design System</span>
    </h1>

    <!-- 副標題 -->
    <p class="hero__subtitle">
      <span data-lang="zh">純 HTML + CSS + 最小化 JavaScript，打造極速且美觀的網頁體驗</span>
      <span data-lang="en" style="display:none">Pure HTML + CSS + Minimal JavaScript for fast and beautiful web experiences</span>
    </p>

    <!-- 按鈕組 -->
    <div class="hero__buttons">
      <a href="#features" class="glass-btn glass-btn--primary glass-btn--lg">
        <span data-lang="zh">開始使用</span>
        <span data-lang="en" style="display:none">Get Started</span>
        <i data-lucide="arrow-right"></i>
      </a>
      <a href="pages/dashboard.html" class="glass-btn glass-btn--secondary glass-btn--lg">
        <span data-lang="zh">查看範例</span>
        <span data-lang="en" style="display:none">View Demo</span>
        <i data-lucide="external-link"></i>
      </a>
    </div>

    <!-- 統計數字 -->
    <div class="hero__stats">
      <div class="hero__stat glass-card--subtle">
        <span class="hero__stat-value">30+</span>
        <span class="hero__stat-label" data-lang="zh">UI 元件</span>
        <span class="hero__stat-label" data-lang="en" style="display:none">Components</span>
      </div>
      <div class="hero__stat glass-card--subtle">
        <span class="hero__stat-value">16</span>
        <span class="hero__stat-label" data-lang="zh">頁面範例</span>
        <span class="hero__stat-label" data-lang="en" style="display:none">Pages</span>
      </div>
      <div class="hero__stat glass-card--subtle">
        <span class="hero__stat-value">100%</span>
        <span class="hero__stat-label" data-lang="zh">響應式</span>
        <span class="hero__stat-label" data-lang="en" style="display:none">Responsive</span>
      </div>
    </div>
  </div>
</div>
```

#### 2.1.2 CSS 樣式

```css
/* ====== 步驟 2.1.2.1 ====== */
□ 建立 Hero 背景樣式（15 分鐘）

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 72px; /* 導航欄高度 */
}

.hero__background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background: var(--gradient-hero);
}

/* Blob 動畫 */
.hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation: blob-float 20s ease-in-out infinite;
}

.hero__blob--1 {
  width: 400px;
  height: 400px;
  background: rgba(99, 102, 241, 0.3);
  top: 10%;
  left: 10%;
}

.hero__blob--2 {
  width: 300px;
  height: 300px;
  background: rgba(168, 85, 247, 0.3);
  top: 50%;
  right: 10%;
  animation-delay: -5s;
}

.hero__blob--3 {
  width: 350px;
  height: 350px;
  background: rgba(6, 182, 212, 0.3);
  bottom: 10%;
  left: 30%;
  animation-delay: -10s;
}

@keyframes blob-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -30px) scale(1.05); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
  75% { transform: translate(20px, 10px) scale(1.02); }
}

/* ====== 步驟 2.1.2.2 ====== */
□ 建立 Hero 內容樣式（20 分鐘）

.hero__content {
  position: relative;
  z-index: 1;
  width: 100%;
  text-align: center;
  padding: 2rem 0;
}

/* Badge */
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent-emerald);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 標題 */
.hero__title {
  font-size: var(--font-size-hero);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  line-height: var(--line-height-tight);
  margin-bottom: 1.5rem;
}

.hero__title-gradient {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent-purple) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 副標題 */
.hero__subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: var(--line-height-relaxed);
}

/* 按鈕組 */
.hero__buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

/* 統計數字 */
.hero__stats {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero__stat {
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  text-align: center;
  min-width: 120px;
}

.hero__stat-value {
  display: block;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.hero__stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

/* ====== 步驟 2.1.2.3 ====== */
□ 響應式調整（10 分鐘）

@media (max-width: 768px) {
  .hero__title {
    font-size: var(--font-size-3xl);
  }

  .hero__subtitle {
    font-size: var(--font-size-lg);
    padding: 0 1rem;
  }

  .hero__buttons {
    flex-direction: column;
    padding: 0 1rem;
  }

  .hero__stats {
    gap: 1rem;
  }

  .hero__stat {
    min-width: 100px;
    padding: 0.75rem 1rem;
  }

  .hero__blob {
    opacity: 0.4;
  }
}
```

#### 2.1.3 ✅ 完成後檢查

```
□ 2.1.3.1 視覺檢查
  - 開啟 index.html 確認 Hero 區域顯示正確
  - 確認漸層和 blob 動畫流暢

□ 2.1.3.2 響應式測試
  🔧 MCP: playwright-mcp
  📝 測試: 375px, 768px, 1024px 三個斷點

□ 2.1.3.3 程式碼審查
  🤖 Agent: code-reviewer (Sonnet)
```

---

### 2.2 導航欄重構

**檔案**：`index.html`, `css/layout.css`

#### 2.2.1 HTML 結構

```html
/* ====== 步驟 2.2.1.1 ====== */
□ 建立玻璃導航欄（15 分鐘）

<nav class="glass-nav" id="main-nav">
  <div class="glass-nav__container">
    <!-- Logo -->
    <a href="/" class="glass-nav__logo">
      <i data-lucide="hexagon" class="glass-nav__logo-icon"></i>
      <span>NexusAI</span>
    </a>

    <!-- 桌機導航連結 -->
    <ul class="glass-nav__links">
      <li><a href="#features" data-lang="zh">功能</a><a href="#features" data-lang="en" style="display:none">Features</a></li>
      <li><a href="#showcase" data-lang="zh">展示</a><a href="#showcase" data-lang="en" style="display:none">Showcase</a></li>
      <li><a href="#pricing" data-lang="zh">定價</a><a href="#pricing" data-lang="en" style="display:none">Pricing</a></li>
      <li><a href="pages/dashboard.html" data-lang="zh">儀表板</a><a href="pages/dashboard.html" data-lang="en" style="display:none">Dashboard</a></li>
    </ul>

    <!-- 右側操作區 -->
    <div class="glass-nav__actions">
      <!-- 語言切換 -->
      <button class="glass-btn glass-btn--ghost glass-btn--sm" data-lang-toggle>
        <i data-lucide="globe"></i>
        <span id="current-lang">中文</span>
      </button>

      <!-- 主題切換 -->
      <button class="glass-btn glass-btn--ghost glass-btn--sm" data-theme-toggle title="切換主題">
        <i data-lucide="sun"></i>
      </button>

      <!-- 漢堡選單（手機版） -->
      <button class="glass-nav__hamburger" aria-label="開啟選單" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</nav>

/* ====== 步驟 2.2.1.2 ====== */
□ 建立手機版側邊欄（10 分鐘）

<!-- 側邊欄遮罩 -->
<div class="sidebar-overlay" aria-hidden="true"></div>

<!-- 側邊欄 -->
<aside class="glass-sidebar" aria-hidden="true">
  <div class="glass-sidebar__header">
    <a href="/" class="glass-nav__logo">
      <i data-lucide="hexagon"></i>
      <span>NexusAI</span>
    </a>
    <button class="glass-sidebar__close" aria-label="關閉選單">
      <i data-lucide="x"></i>
    </button>
  </div>

  <nav class="glass-sidebar__nav">
    <a href="#features">功能</a>
    <a href="#showcase">展示</a>
    <a href="#pricing">定價</a>
    <a href="pages/dashboard.html">儀表板</a>
  </nav>
</aside>
```

#### 2.2.2 CSS 樣式

```css
/* ====== 步驟 2.2.2.1 ====== */
□ 導航欄樣式（15 分鐘）

/* 覆蓋 layout.css 中的 .top-nav */
.glass-nav {
  /* 已在 glassmorphism.css 定義 */
}

.glass-nav__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.glass-nav__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  text-decoration: none;
}

.glass-nav__logo-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

.glass-nav__links {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.glass-nav__links a {
  display: block;
  padding: 0.5rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.glass-nav__links a:hover {
  color: var(--text-primary);
  background: rgba(0, 0, 0, 0.05);
}

.glass-nav__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ====== 步驟 2.2.2.2 ====== */
□ 漢堡選單樣式（10 分鐘）

.glass-nav__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.glass-nav__hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* 手機版顯示漢堡選單 */
@media (max-width: 768px) {
  .glass-nav__links {
    display: none;
  }

  .glass-nav__hamburger {
    display: flex;
  }
}

/* ====== 步驟 2.2.2.3 ====== */
□ 側邊欄樣式（15 分鐘）

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 998;
}

.sidebar-overlay.active {
  opacity: 1;
  visibility: visible;
}

.glass-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: var(--blur-lg);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 999;
  padding: 1rem;
}

.glass-sidebar.active {
  transform: translateX(0);
}

.glass-sidebar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: var(--glass-border-subtle);
  margin-bottom: 1rem;
}

.glass-sidebar__close {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
}

.glass-sidebar__close:hover {
  background: rgba(0, 0, 0, 0.05);
}

.glass-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.glass-sidebar__nav a {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.glass-sidebar__nav a:hover {
  color: var(--text-primary);
  background: rgba(0, 0, 0, 0.05);
}
```

---

### 2.3 Features Bento Grid

**檔案**：`index.html`, `css/landing.css`

#### 2.3.1 HTML 結構

```html
/* ====== 步驟 2.3.1.1 ====== */
□ 建立 Features Section（20 分鐘）

<section id="features" class="features-section">
  <div class="container">
    <!-- Section Header -->
    <div class="section-header">
      <span class="section-tag glass-card--subtle">
        <i data-lucide="sparkles"></i>
        <span data-lang="zh">核心功能</span>
        <span data-lang="en" style="display:none">Core Features</span>
      </span>
      <h2 class="section-title">
        <span data-lang="zh">為現代網頁打造</span>
        <span data-lang="en" style="display:none">Built for Modern Web</span>
      </h2>
      <p class="section-subtitle">
        <span data-lang="zh">結合 2026 設計趨勢，打造極致使用體驗</span>
        <span data-lang="en" style="display:none">Combining 2026 design trends for the ultimate user experience</span>
      </p>
    </div>

    <!-- Bento Grid -->
    <div class="bento-grid">
      <!-- Featured: 極速效能 (2x2) -->
      <div class="bento-item bento-item--featured glass-card">
        <div class="bento-item__icon">
          <i data-lucide="zap"></i>
        </div>
        <h3 class="bento-item__title" data-lang="zh">極速效能</h3>
        <h3 class="bento-item__title" data-lang="en" style="display:none">Lightning Fast</h3>
        <p class="bento-item__description" data-lang="zh">
          純 HTML + CSS + 最小化 JavaScript，無需框架依賴，載入速度極快
        </p>
        <p class="bento-item__description" data-lang="en" style="display:none">
          Pure HTML + CSS + Minimal JavaScript, no framework dependencies
        </p>
        <div class="bento-item__visual">
          <!-- 速度視覺化動畫 -->
          <div class="speed-meter">
            <div class="speed-meter__bar"></div>
            <span class="speed-meter__label">< 0.5s</span>
          </div>
        </div>
      </div>

      <!-- Wide: OKLCH 色彩 (2x1) -->
      <div class="bento-item bento-item--wide glass-card">
        <div class="bento-item__icon">
          <i data-lucide="palette"></i>
        </div>
        <h3 class="bento-item__title" data-lang="zh">OKLCH 色彩系統</h3>
        <h3 class="bento-item__title" data-lang="en" style="display:none">OKLCH Color System</h3>
        <p class="bento-item__description" data-lang="zh">
          採用感知均勻的色彩空間，確保色彩一致性
        </p>
        <div class="color-swatches">
          <div class="color-swatch" style="background: var(--color-primary)"></div>
          <div class="color-swatch" style="background: var(--color-accent-cyan)"></div>
          <div class="color-swatch" style="background: var(--color-accent-purple)"></div>
          <div class="color-swatch" style="background: var(--color-accent-pink)"></div>
          <div class="color-swatch" style="background: var(--color-accent-emerald)"></div>
        </div>
      </div>

      <!-- Standard: 30+ 元件 (1x1) -->
      <div class="bento-item glass-card bento-item--center">
        <span class="bento-item__big-number">30+</span>
        <h3 class="bento-item__title" data-lang="zh">UI 元件</h3>
        <h3 class="bento-item__title" data-lang="en" style="display:none">Components</h3>
      </div>

      <!-- Standard: 主題切換 (1x1) -->
      <div class="bento-item glass-card">
        <div class="bento-item__icon">
          <i data-lucide="sun-moon"></i>
        </div>
        <h3 class="bento-item__title" data-lang="zh">深淺主題</h3>
        <h3 class="bento-item__title" data-lang="en" style="display:none">Dark/Light</h3>
        <p class="bento-item__description" data-lang="zh">一鍵切換主題</p>
      </div>

      <!-- Wide: 響應式設計 (2x1) -->
      <div class="bento-item bento-item--wide glass-card">
        <div class="bento-item__icon">
          <i data-lucide="smartphone"></i>
        </div>
        <h3 class="bento-item__title" data-lang="zh">完全響應式</h3>
        <h3 class="bento-item__title" data-lang="en" style="display:none">Fully Responsive</h3>
        <p class="bento-item__description" data-lang="zh">
          Mobile-First 設計，完美適配所有裝置
        </p>
        <div class="device-preview">
          <div class="device device--mobile"></div>
          <div class="device device--tablet"></div>
          <div class="device device--desktop"></div>
        </div>
      </div>

      <!-- Standard: PWA (1x1) -->
      <div class="bento-item glass-card">
        <div class="bento-item__icon">
          <i data-lucide="download-cloud"></i>
        </div>
        <h3 class="bento-item__title">PWA</h3>
        <p class="bento-item__description" data-lang="zh">支援離線使用</p>
        <p class="bento-item__description" data-lang="en" style="display:none">Offline Support</p>
      </div>

      <!-- Standard: MIT 授權 (1x1) -->
      <div class="bento-item glass-card bento-item--center">
        <div class="bento-item__icon">
          <i data-lucide="scale"></i>
        </div>
        <h3 class="bento-item__title">MIT</h3>
        <p class="bento-item__description" data-lang="zh">開源授權</p>
        <p class="bento-item__description" data-lang="en" style="display:none">Open Source</p>
      </div>
    </div>
  </div>
</section>
```

#### 2.3.2 CSS 樣式

```css
/* ====== 步驟 2.3.2.1 ====== */
□ Section 通用樣式（10 分鐘）

.features-section {
  padding: 6rem 0;
  background: var(--bg-subtle);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* ====== 步驟 2.3.2.2 ====== */
□ Bento 項目內部樣式（15 分鐘）

.bento-item__big-number {
  font-size: var(--font-size-hero);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 速度計視覺效果 */
.speed-meter {
  margin-top: 1rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 9999px;
  height: 8px;
  overflow: hidden;
  position: relative;
}

.speed-meter__bar {
  width: 90%;
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent-emerald), var(--color-primary));
  border-radius: 9999px;
  animation: speed-fill 2s ease-out;
}

@keyframes speed-fill {
  from { width: 0; }
  to { width: 90%; }
}

.speed-meter__label {
  position: absolute;
  right: 0;
  top: -1.5rem;
  font-size: var(--font-size-sm);
  color: var(--color-accent-emerald);
  font-weight: var(--font-weight-semibold);
}

/* 色彩樣本 */
.color-swatches {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.color-swatch {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  box-shadow: var(--glass-shadow-sm);
}

/* 裝置預覽 */
.device-preview {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-top: 1rem;
}

.device {
  background: rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-sm);
}

.device--mobile {
  width: 24px;
  height: 40px;
}

.device--tablet {
  width: 40px;
  height: 48px;
}

.device--desktop {
  width: 64px;
  height: 40px;
}
```

---

### 2.4 - 2.6 其他 Sections（略）

以下 Sections 遵循相同模式：
- 2.4 Showcase Section
- 2.5 Stats Section
- 2.6 Testimonials Section
- 2.7 Pricing Section
- 2.8 CTA Section
- 2.9 Footer

每個 Section 需要：
1. HTML 結構（使用 glass-card 和 bento 元素）
2. CSS 樣式（整合 glassmorphism 效果）
3. 響應式斷點
4. 程式碼審查（code-reviewer agent）

---

## Phase 3：功能頁面重構

### 3.1 Dashboard 頁面

**檔案**：`pages/dashboard.html`
**並行策略**：可與其他頁面並行開發

```
□ 3.1.1 KPI 卡片區（Bento Grid）
  - 使用 .bento-item--featured 作為主要 KPI
  - 3 個 .bento-item 作為次要 KPI

□ 3.1.2 圖表區（Glass Card）
  - 玻璃卡片容器
  - 保持原有 Chart.js 整合

□ 3.1.3 數據表格（Glass Table）
  - 參考 rwd-design Skill 的響應式表格

□ 3.1.4 側邊欄卡片
  - 快速統計
  - 最近活動

□ 3.1.5 程式碼審查
  🤖 Agent: code-reviewer
```

### 3.2 其他頁面清單

| 頁面 | 優先級 | 並行組 | 主要變更 |
|-----|--------|-------|---------|
| about.html | P1 | A | 玻璃卡片團隊介紹 |
| contact.html | P1 | A | 玻璃表單 |
| pricing.html | P1 | A | 玻璃定價卡片 |
| projects.html | P2 | B | Bento Grid 專案卡片 |
| calendar.html | P2 | B | 玻璃日曆容器 |
| kanban.html | P2 | B | 玻璃看板列 |
| data-table.html | P2 | C | 玻璃表格 |
| profile.html | P2 | C | 玻璃個人資料卡 |
| notifications.html | P3 | C | 玻璃通知卡片 |
| settings-*.html | P3 | D | 玻璃表單 |
| js-showcase.html | P3 | D | Bento 展示 |

---

## Phase 4：互動與動效

### 4.1 微愉悅動效

**檔案**：`css/animations.css`, `js/micro-interactions.js`
**使用**：`sequential-thinking` MCP 規劃動畫邏輯

```css
/* ====== 步驟 4.1.1 ====== */
□ 按鈕動效（10 分鐘）

.glass-btn {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-btn:hover {
  transform: translateY(-2px);
}

.glass-btn:active {
  transform: translateY(0) scale(0.98);
}

/* 漣漪效果 */
.glass-btn {
  position: relative;
  overflow: hidden;
}

.glass-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  transform: scale(0);
  opacity: 0;
  transition: transform 0.5s, opacity 0.3s;
}

.glass-btn:active::after {
  transform: scale(2);
  opacity: 1;
  transition: transform 0s, opacity 0s;
}

/* ====== 步驟 4.1.2 ====== */
□ 卡片懸停效果（10 分鐘）

.glass-card {
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--glass-shadow-lg);
}
```

### 4.2 滾動動畫

```javascript
/* ====== 步驟 4.2.1 ====== */
□ Intersection Observer 實作（15 分鐘）

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

```css
/* ====== 步驟 4.2.2 ====== */
□ 入場動畫類別（10 分鐘）

.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* 延遲序列 */
.animate-on-scroll:nth-child(1) { transition-delay: 0s; }
.animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
.animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
.animate-on-scroll:nth-child(4) { transition-delay: 0.3s; }
```

---

## Phase 5：測試與優化

### 5.1 自動化測試（使用 MCP 工具）

```
□ 5.1.1 響應式測試
  🔧 MCP: playwright-mcp
  📝 測試腳本:

  const viewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'Desktop', width: 1440, height: 900 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000');
    await page.screenshot({ path: `screenshots/${vp.name}.png` });
  }

□ 5.1.2 效能分析
  🔧 MCP: chrome-devtools
  📝 檢查項目:
  - Lighthouse Performance Score > 90
  - First Contentful Paint < 1.5s
  - Cumulative Layout Shift < 0.1

□ 5.1.3 問題排查
  🤖 Agent: debugger (Sonnet)
  📝 Prompt: "分析測試結果，找出效能瓶頸和 CSS 問題"
```

### 5.2 瀏覽器兼容性

```
□ 5.2.1 backdrop-filter 降級方案

@supports not (backdrop-filter: blur(1px)) {
  .glass-card,
  .glass-nav,
  .glass-btn {
    background: rgba(255, 255, 255, 0.95);
  }
}

□ 5.2.2 測試瀏覽器清單
  🔧 MCP: playwright-mcp
  - Chrome (Chromium)
  - Firefox
  - WebKit (Safari)
```

### 5.3 無障礙檢查

```
□ 5.3.1 色彩對比度
  - 使用 chrome-devtools 的 Accessibility 面板
  - 確保文字對比度符合 WCAG 2.1 AA

□ 5.3.2 鍵盤導航
  - Tab 順序正確
  - Focus 樣式明顯
  - ESC 關閉 modal/sidebar

□ 5.3.3 螢幕閱讀器
  - 正確的 ARIA 標籤
  - 語意化 HTML
```

---

## 驗收標準

### 視覺設計 ✓

- [ ] 所有卡片元件使用 Glassmorphism 效果
- [ ] 首頁 Features 使用 Bento Grid 佈局
- [ ] 淺色主題為預設
- [ ] 深色主題可正常切換
- [ ] 色彩符合 2026 設計趨勢
- [ ] 排版使用流體字型

### 功能完整 ✓

- [ ] 中英文切換正常運作
- [ ] 主題切換正常運作
- [ ] 所有導航連結正確
- [ ] 所有 16 個頁面可正常訪問
- [ ] 手機版側邊欄正常運作

### 效能指標 ✓

- [ ] Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] backdrop-filter 不影響滾動流暢度
- [ ] 無 JavaScript 錯誤

### 響應式 ✓

- [ ] 375px（iPhone SE）正常顯示
- [ ] 768px（iPad）正常顯示
- [ ] 1024px（iPad Pro）正常顯示
- [ ] 1440px（Desktop）正常顯示
- [ ] 1920px（Large Desktop）正常顯示

### 無障礙 ✓

- [ ] 文字對比度符合 WCAG AA
- [ ] 鍵盤可完整導航
- [ ] Focus 樣式明顯
- [ ] ARIA 標籤正確

---

## 檔案結構規劃

### 新增檔案

```
nexus-bento/
├── css/
│   ├── design-tokens-v2.css    # Phase 1.1
│   ├── glassmorphism.css       # Phase 1.2
│   ├── bento-grid.css          # Phase 1.3
│   ├── animations.css          # Phase 4
│   └── utilities.css           # 工具類別
│
├── js/
│   ├── scroll-animations.js    # Phase 4.2
│   └── micro-interactions.js   # Phase 4.1
│
└── docs/
    ├── REDESIGN_PLAN.md        # 本文件
    ├── COMPONENT_GUIDE.md      # 元件使用指南
    └── CHANGELOG.md            # 變更記錄
```

### 修改檔案

```
待修改：
├── index.html                  # Phase 2
├── css/landing.css             # Phase 2
├── css/layout.css              # Phase 2.2
├── js/main.js                  # Phase 4
└── pages/                      # Phase 3
    └── [16 個頁面]
```

---

## 執行順序建議

```
推薦執行順序（含並行策略）：

Phase 0 ──────────────────────────────────────────→ 準備完成
    │
Phase 1.1 ─┬─ 1.2 ─┬─ 1.3 ───────────────────────→ 設計系統完成
           │       │    （可並行，無依賴）
           └───────┘
    │
Phase 2.1 → 2.2 → 2.3 → 2.4-2.9 ────────────────→ 首頁完成
    │
Phase 3.1 ─┬─ 3.2-A ─┬─ 3.2-B ─┬─ 3.2-C ─┬─ 3.2-D → 頁面完成
           │ about   │ projects│ data   │ settings
           │ contact │ calendar│ profile│ js-show
           │ pricing │ kanban  │ notify │
           └─────────┴─────────┴────────┴─────────
    │
Phase 4.1 → 4.2 ─────────────────────────────────→ 動效完成
    │
Phase 5.1 → 5.2 → 5.3 ───────────────────────────→ 測試完成
```

---

## 工作流程自動化腳本

### 開發啟動

```bash
# 啟動本地開發伺服器
cd /Users/gamepig/projects/Temporary/stlye/nexus-bento
python -m http.server 3000

# 或使用 live-server（需要安裝）
npx live-server --port=3000
```

### 程式碼審查觸發

每完成一個 CSS 或 JS 檔案後，使用：
```
🤖 Agent: code-reviewer (Sonnet)
📝 Prompt: "審查 [檔案路徑]，檢查程式碼品質、效能和無障礙問題"
```

### 響應式測試觸發

每完成一個頁面後，使用：
```
🔧 MCP: playwright-mcp
📝 測試: 375px, 768px, 1024px, 1440px 四個斷點截圖
```

---

*文件版本：2.0.0*
*最後更新：2025-12-16*
*包含：Sub-agents、Skills、MCP 工作流程整合*
