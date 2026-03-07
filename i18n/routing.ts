import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['zh-TW', 'en', 'ja'],
    defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];
