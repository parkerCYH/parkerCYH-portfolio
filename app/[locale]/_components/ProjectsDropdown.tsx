'use client';

import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Dropdown } from '@/components/ui/dropdown';

export default function ProjectsDropdown() {
    const t = useTranslations('nav');

    return (
        <Dropdown
            trigger={
                <button className="group flex items-center gap-1 text-sm hover:text-gray-600 transition-colors cursor-pointer outline-none">
                    {t('projects')}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
            }
            align="center"
            contentClassName="w-52 p-1 mt-4 bg-white rounded-md shadow-lg border"
        >
            <Link
                href="/projects/showcase"
                className="block px-4 py-2.5 rounded-sm hover:bg-accent transition-colors"
            >
                <p className="text-sm font-medium">{t('showcase')}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t('showcaseDesc')}</p>
            </Link>
            <Link
                href="/projects/deep-dive"
                className="block px-4 py-2.5 rounded-sm hover:bg-accent transition-colors"
            >
                <p className="text-sm font-medium">{t('deepDive')}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t('deepDiveDesc')}</p>
            </Link>
            <Link
                href="/projects/playground"
                className="block px-4 py-2.5 rounded-sm hover:bg-accent transition-colors"
            >
                <p className="text-sm font-medium">{t('playground')}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t('playgroundDesc')}</p>
            </Link>
        </Dropdown>
    );
}
