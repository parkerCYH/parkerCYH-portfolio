# E2E 測試規劃（Playwright）

> 目標：為 parkerCYH-portfolio 建立 E2E 測試基礎，優先覆蓋 i18n 語言切換核心流程。

---

## 一、技術棧確認

| 工具 | 版本 | 說明 |
|------|------|------|
| `@playwright/test` | `^1.58.2`（已安裝）| 測試框架，已在 devDependencies |
| Chromium | `pnpm exec playwright install chromium` | 只裝 Chromium，縮短 CI 時間 |
| Next.js dev server | `pnpm dev` | 測試前先啟動，或交由 `webServer` 自動啟動 |

---

## 二、測試目錄結構

```
parkerCYH-portfolio/
├── playwright.config.ts          # Playwright 全域設定
├── tests/
│   └── e2e/
│       └── header-language-switcher.spec.ts   # Header 語言切換測試（本次交付）
└── package.json                  # 新增測試 scripts
```

---

## 三、`playwright.config.ts` 設定重點

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  // 若 dev server 已在運行則直接複用
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

---

## 四、測試案例清單

### 4-1. 語言切換（首頁）— `e2e/i18n/language-switcher.spec.ts`

這是此次的主要交付測試。

| # | 測試名稱 | 驗證邏輯 |
|---|---------|---------|
| 1 | 預設語言應為繁中 | 進入 `/`，確認 redirect 到 `/zh-TW`，頁面顯示「嗨，我是」|
| 2 | 切換至英文 | 點語言切換器 → 選 EN → URL 變 `/en`，顯示 "Hi, I'm" |
| 3 | 切換至日文 | 點語言切換器 → 選 日本語 → URL 變 `/ja`，顯示「こんにちは」|
| 4 | 語言切換後 `<html lang>` 屬性正確 | 切換至 `/en` 後 `<html>` 的 `lang` 屬性應為 `en` |
| 5 | 直接造訪語言 URL 顯示正確語言 | 直接訪問 `/ja`，無需切換，應直接顯示日文 |
| 6 | 語言切換保留頁面路徑 | 在 `/zh-TW/about` 頁切換語言 → 跳到 `/en/about`（路徑保留）|

---

### 4-2. Header 導覽列 — `e2e/navigation/header-nav.spec.ts`（未來）

| # | 測試名稱 |
|---|---------|
| 1 | Projects 下拉選單可開關 |
| 2 | 點選 Showcase 導向正確頁面 |
| 3 | 點選 Logo 回首頁 |

---

### 4-3. 聯絡表單 — `e2e/contact/contact-form.spec.ts`（未來）

| # | 測試名稱 |
|---|---------|
| 1 | 空白送出顯示驗證提示 |
| 2 | 三語言的錯誤訊息應各自對應翻譯 |

---

## 五、`package.json` 新增 scripts

```json
"prepare": "playwright install chromium",
"test:e2e:header-language-switcher": "playwright test tests/e2e/header-language-switcher.spec.ts --reporter=list --workers=1"
```

| 指令 | 用途 |
|------|------|
| `pnpm prepare` | 安裝 Chromium，換電腦後執行一次即可 |
| `pnpm test:e2e:header-language-switcher` | 執行語言切換測試，輸出清單格式、單執行緒方便閱讀 |

**命名規則：** 往後每新增一個測試檔，就對應新增一個 script：
```
"test:e2e:{testname}": "playwright test tests/e2e/{testname}.spec.ts --reporter=list --workers=1"
```

---

## 六、測試資料策略

- 測試中**不 mock 翻譯**，直接讀取 `messages/*.json` 的實際字串（整合測試語意）
- `baseURL` 透過 env var 覆蓋，方便指向不同環境：
  ```bash
  BASE_URL=https://staging.example.com pnpm test:e2e:header-language-switcher
  ```

---

## 七、執行順序

```
[1] 建立 playwright.config.ts
[2] 建立 tests/e2e/header-language-switcher.spec.ts（語言切換，6 個測試案例）
[3] 新增 package.json scripts（prepare + test:e2e:header-language-switcher）
[4] 執行 pnpm test:e2e:header-language-switcher 驗證全部通過
```

---

*計劃建立日期：2026-03-07*
