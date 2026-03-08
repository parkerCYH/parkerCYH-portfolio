# Dev Plan: Smoke Testing

## Overview
新增一份 Smoke Test E2E 測試檔，快速驗證網站所有主要頁面皆可正常載入、核心內容可見，以及基本導航不中斷。這是用來在每次 build 或部署後，快速確認網站整體沒有崩潰的最低驗證層。

## Scope

**Included:**
- 所有主要頁面的 HTTP 可達性（不報錯、不白畫面）
- `/` → redirect（切換語系後到 `/en`）
- 每個頁面的代表性文字內容（**en 語系**）可見
- Header 導航連結點擊能正確跳頁
- Footer 版權文字可見

**Out of scope:**
- 語言切換邏輯（已由 `header-language-switcher.spec.ts` 涵蓋）
- Contact 表單送出（功能性測試，不屬於 smoke）
- Projects 子頁面（Showcase / Deep Dive / Playground）— 目前 return null，不列入 smoke

## File Changes

| File | Action | Notes |
|------|--------|-------|
| `tests/e2e/smoke.spec.ts` | Create | 新增 smoke test 主檔 |
| `package.json` | Edit | 新增 `test:e2e:smoke` 獨立 script |

## E2E Test Plan

### Test File
`tests/e2e/smoke.spec.ts`

### Test Cases

| # | Description | Steps | Expected |
|---|-------------|-------|----------|
| 1 | 根路徑 redirect 後語系正確 | `goto('/')` → switch to EN | URL 含 `/en` |
| 2 | 首頁核心內容可見 | `goto('/en')` | `Hi, I'm` 可見 |
| 3 | 關於頁可載入 | `goto('/en/about')` | `About Me` 可見 |
| 4 | 作品頁可載入 | `goto('/en/projects')` | `Featured Projects` 可見 |
| 5 | 聯絡頁可載入 | `goto('/en/contact')` | `Contact Me` 可見 |
| 6 | 首頁 Footer 可見 | `goto('/en')` | `© 2025` 可見 |
| 7 | 導航：點「About」連結可跳至 /en/about | `goto('/en')` → click nav About link | URL 含 `/en/about` |
| 8 | 導航：點「Contact」連結可跳至 /en/contact | `goto('/en')` → click nav Contact link | URL 含 `/en/contact` |

### package.json Script
```json
"test:e2e:smoke": "playwright test tests/e2e/smoke.spec.ts --reporter=list --workers=1"
```

## Open Questions
（已確認，無待解問題）
