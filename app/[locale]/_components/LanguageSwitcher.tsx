'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';

const LOCALE_LABELS: Record<string, string> = {
    'zh-TW': '繁中',
    en: 'EN',
    ja: '日本語',
};

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function switchLocale(newLocale: string) {
        router.replace(pathname, { locale: newLocale as (typeof routing.locales)[number] });
    }

    return (
        <Dropdown
            trigger={
                <Button variant="outline" size="sm" className="gap-1.5 select-none" aria-label="Switch language">
                    <Globe className="w-3.5 h-3.5" />
                    {LOCALE_LABELS[locale]}
                </Button>
            }
            align="end"
            contentClassName="p-1 mt-2 bg-white rounded-md shadow-lg border"
        >
            {routing.locales.map((loc) => (
                <DropdownItem
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={locale === loc ? 'font-semibold' : ''}
                >
                    {LOCALE_LABELS[loc]}
                </DropdownItem>
            ))}
        </Dropdown>
    );
}
