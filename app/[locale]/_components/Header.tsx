'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import ProjectsDropdown from './ProjectsDropdown';

export default function Header() {
    const t = useTranslations('nav');

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-lg font-semibold cursor-pointer">
                        {t('logoLabel')}
                    </Link>

                    <div className="flex items-center gap-6">
                        <ul className="flex items-center gap-6">
                            {/* Home */}
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm hover:text-gray-600 transition-colors"
                                >
                                    {t('home')}
                                </Link>
                            </li>

                            {/* About */}
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm hover:text-gray-600 transition-colors"
                                >
                                    {t('about')}
                                </Link>
                            </li>

                            {/* Projects with dropdown */}
                            <li>
                                <ProjectsDropdown />
                            </li>

                            {/* Contact */}
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm hover:text-gray-600 transition-colors"
                                >
                                    {t('contact')}
                                </Link>
                            </li>
                        </ul>

                        {/* Language Switcher */}
                        <LanguageSwitcher />
                    </div>
                </nav>
            </div>
        </header>
    );
}
