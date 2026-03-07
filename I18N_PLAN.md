# 路由式 i18n 重構開發計劃

> 目標：在現有 Next.js App Router 專案中加入路由式多語言支援（繁體中文 / English），全程相容 SSR，不破壞現有功能。

---

## 一、技術選型

| 選項 | 說明 |
|------|------|
| **`next-intl`** ✅ 選用 | 專為 Next.js App Router 設計，原生支援 RSC + SSR，API 簡潔，TypeScript 完整型別 |
| `next-i18next` | 主要針對 Pages Router，App Router 支援較弱 |
| `react-i18next` | Client-side 為主，SSR 整合繁瑣 |

**語言清單：**
- `zh-TW`（繁體中文，預設語言）
- `en`（英文）
- `ja`（日文）

---

## 二、目標 URL 結構

```
/zh-TW              → 首頁（繁體中文）
/en                 → Homepage (English)
/ja                 → ホームページ（日本語）
/zh-TW/about        → 關於頁
/en/about           → About page
/ja/about           → 自己紹介ページ
/zh-TW/contact      → 聯絡頁
/en/contact         → Contact page
/ja/contact         → お問い合わせページ
/zh-TW/projects     → 作品集頁
/en/projects        → Projects page
/ja/projects        → プロジェクトページ
/                   → 301 redirect → /zh-TW（由 middleware 處理）
```

API 路由（`/api/contact`）保持不變，無需語言前綴。

---

## 三、最終目錄結構

```
parkerCYH-portfolio/
├── messages/                        # 翻譯資源檔
│   ├── zh-TW.json
│   ├── en.json
│   └── ja.json
├── i18n/                            # next-intl 設定模組
│   ├── routing.ts                   # 語言清單、預設語言、路由策略
│   └── request.ts                   # Server-side 訊息載入（getRequestConfig）
├── middleware.ts                    # Locale 偵測 & 路由重導向
├── app/
│   ├── globals.css                  # 不變
│   ├── layout.tsx                   # Root layout（極簡，僅 <html><body>）
│   ├── [locale]/                    # 動態 locale segment
│   │   ├── layout.tsx               # Locale layout（載入字型、Header、Footer、next-intl Provider）
│   │   ├── page.tsx                 # 首頁
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   │   └── _components/
│   │   │       ├── contact/
│   │   │       │   ├── ContactForm.tsx
│   │   │       │   └── ContactInfo.tsx
│   │   │       └── sections/
│   │   │           └── ContactSection.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── showcase/page.tsx
│   │   │   ├── deep-dive/page.tsx
│   │   │   └── playground/page.tsx
│   │   └── _components/             # Locale-aware 共用元件
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── sections/
│   │           ├── HeroSection.tsx
│   │           ├── AboutSection.tsx
│   │           ├── SkillsSection.tsx
│   │           └── ProjectsSection.tsx
│   └── api/                         # API 路由維持原位，不加 locale 前綴
│       └── contact/
│           └── route.ts
├── components/
│   └── ui/                          # shadcn/ui（不動）
└── lib/
    ├── env.ts                        # 不動
    └── utils.ts                      # 不動
```

---

## 四、翻譯資源結構（`messages/*.json`）

命名空間依頁面 / 元件分組，方便按需載入：

```json
// messages/zh-TW.json（示意）
{
  "metadata": {
    "title": "鄭雲修 - 全端開發者",
    "description": "鄭雲修的個人作品集網站"
  },
  "nav": {
    "home": "首頁",
    "about": "關於",
    "projects": "作品",
    "contact": "聯絡",
    "showcase": "精選作品",
    "deepDive": "技術深探",
    "playground": "實驗室"
  },
```

```json
// messages/ja.json（示意）
{
  "metadata": {
    "title": "Parker Cheng - フルスタック開発者",
    "description": "Parker Chengのポートフォリオサイト"
  },
  "nav": {
    "home": "ホーム",
    "about": "自己紹介",
    "projects": "作品",
    "contact": "お問い合わせ",
    "showcase": "ショーケース",
    "deepDive": "技術解説",
    "playground": "実験室"
  },
```

```json
// messages/zh-TW.json（接續示意）
{
  "hero": {
    "greeting": "嗨，我是",
    "name": "鄭雲修",
    "subtitle": "全端開發者 | UI/UX 設計師 | 創意工作者",
    "cta_contact": "聯絡我",
    "cta_projects": "查看作品"
  },
  "about": { ... },
  "skills": { ... },
  "projects": { ... },
  "contact": {
    "form": { ... },
    "info": { ... }
  }
}
```

---

## 五、核心實作步驟

### Step 0 — 安裝依賴

```bash
pnpm add next-intl
```

---

### Step 1 — i18n 設定模組

**`i18n/routing.ts`**
```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh-TW', 'en', 'ja'],
  defaultLocale: 'zh-TW',
});
```

**`i18n/request.ts`**（Server-side 訊息載入，SSR 核心）
```ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

---

### Step 2 — Middleware

**`middleware.ts`**（負責語言偵測、URL 重導向、Accept-Language header 解析）
```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 排除 API 路由、靜態資源、_next
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

---

### Step 3 — App Router 重構

#### `app/layout.tsx`（Root Layout，極簡）
- 移除字型、Header、Footer 的引用
- 只保留 `<html><body>{children}</body></html>`
- 不設定 `lang`（由 `[locale]/layout.tsx` 動態設定）

#### `app/[locale]/layout.tsx`（Locale Layout）
- 接收 `params: { locale }` prop
- 使用 `next-intl/server` 的 `setRequestLocale(locale)` 啟用靜態渲染
- 設定 `<html lang={locale}>`
- 載入 Geist 字型
- 包含 `<Header />`, `<Footer />`, `<NextIntlClientProvider>`
- 用 `generateStaticParams` 預生成所有語言版本的 Layout

#### 各頁面 `page.tsx`
- 接收 `params: { locale }`
- 呼叫 `setRequestLocale(locale)` 
- 使用 `useTranslations` (Client) 或 `getTranslations` (Server) 取得翻譯
- 用 `generateMetadata` 動態生成語言對應的 `<title>` 和 `<description>`

---

### Step 4 — Header 元件重構

- 改用 `next-intl` 的 `useTranslations('nav')` 取代硬編中文字串
- 使用 `next-intl` 的 `<Link>` 元件（自動帶 locale prefix）
- 加入語言切換器（`LanguageSwitcher` 元件），切換時使用 `useRouter` from `next-intl`
- 補全 Projects 下拉選單 UI

---

### Step 5 — 所有元件翻譯化

將每個元件中的硬編中文字串替換為翻譯 key：

| 元件 | 命名空間 |
|------|---------|
| `HeroSection` | `hero` |
| `AboutSection` | `about` |
| `SkillsSection` | `skills` |
| `ProjectsSection` | `projects` |
| `ContactForm` | `contact.form` |
| `ContactInfo` | `contact.info` |
| `Header` | `nav` |
| `Footer` | `footer` |

---

### Step 6 — 靜態生成 (SSG) 最佳化

在每個 `[locale]` 路由的 `layout.tsx` 和 `page.tsx` 加入：

```ts
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```

這讓 Next.js 在 build time 預先生成所有語言版本，結合 SSR 使用時也能快速回應。

---

### Step 7 — `next.config.ts` 更新

```ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  experimental: { typedRoutes: true },
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'avatars.githubusercontent.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
```

---

### Step 8 — SEO 與 Metadata

每個頁面用 `generateMetadata` 輸出：
- `title`（語言對應）
- `description`（語言對應）
- `alternates.canonical` 指向正確的語言 URL
- `alternates.languages` 列出 `hreflang` 供搜尋引擎識別多語言版本

---

### Step 9 — API 路由安全性修補

順帶修補探索時發現的問題：

`app/api/contact/route.ts` 中 Email HTML body 使用未過濾的使用者輸入：
```ts
// 現況（有 HTML injection 風險）
html: `<p>${message.replace(/\n/g, '<br>')}</p>`

// 修正：使用純文字格式，或對特殊字元進行 escape
text: message,  // 改用純文字
```

---

## 六、執行順序與里程碑

```
Phase 1 — 基礎建設（不破壞現有功能）
  [1] 安裝 next-intl
  [2] 建立 i18n/routing.ts、i18n/request.ts
  [3] 建立 middleware.ts
  [4] 建立 messages/zh-TW.json（從現有中文硬編字串提取）
  [5] 建立 messages/en.json（英文翻譯）
  [5b] 建立 messages/ja.json（日文翻譯）
  [6] 更新 next.config.ts

Phase 2 — 路由重構
  [7] 建立 app/[locale]/ 資料夾結構
  [8] 重構 app/layout.tsx（Root layout 極簡化）
  [9] 建立 app/[locale]/layout.tsx（含 Provider + 字型 + generateStaticParams）
  [10] 遷移所有 page.tsx 至 app/[locale]/

Phase 3 — 元件翻譯化
  [11] 重構 Header.tsx（翻譯 + 語言切換器 + 下拉選單）
  [12] 重構 HeroSection, AboutSection, SkillsSection, ProjectsSection
  [13] 重構 ContactForm, ContactInfo, ContactSection
  [14] 建立 Footer 元件

Phase 4 — 品質收尾
  [15] SEO metadata（generateMetadata + hreflang）
  [16] 修補 API route HTML injection 問題
  [17] 修正 package.json next 版本號（目前寫 ^16.0.7，實際應為 ^15.x）
  [18] 全站測試（路由切換、SSR 渲染、表單提交、靜態生成）
```

---

## 七、重要技術細節

### SSR 相容性

`next-intl` 透過以下機制確保 SSR 正確運作：

1. **`setRequestLocale(locale)`** — 在每個 Server Component 頂部呼叫，避免 `async` 穿透問題，支援靜態渲染
2. **`getRequestConfig`** — 在 Server 端每次請求時載入對應語言的訊息，無 client-side runtime 負擔
3. **`NextIntlClientProvider`** — 在 layout 中將 Server 端載入的訊息序列化傳給 Client Components，Client component 的翻譯也走 SSR

### 語言切換器

```tsx
// 使用 next-intl 的 useRouter，不是 next/navigation 的 useRouter
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    // next-intl middleware 會自動處理 URL 前綴
    router.replace(pathname, { locale: newLocale });
  };
  ...
}
```

### TypeScript 型別安全

`next-intl` 支援從訊息 JSON 自動推斷翻譯 key 的型別，需在 `i18n/request.ts` 中設定型別聲明，避免 `t('typo.key')` 錯誤。

---

## 八、注意事項

- `app/api/` 路由必須放在 `app/[locale]/` **外部**，否則 API 路徑會帶語言前綴（`/zh-TW/api/contact` 不正確）
- `ContactForm` 的 fetch URL 為相對路徑 `/api/contact`，無需修改
- AWS Amplify 的 `amplify.yml` 無需修改，build 指令和快取設定不受 i18n 影響
- Tailwind v4 CSS 設定（`globals.css` 中的 CSS 變數）無需修改

---

*計劃建立日期：2026-03-07*
