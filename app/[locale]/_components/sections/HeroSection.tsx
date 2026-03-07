'use client';

import { useTranslations } from 'next-intl';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function HeroSection() {
    const t = useTranslations('hero');

    return (
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <div className="flex justify-center">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                        <AvatarImage
                            src="https://avatars.githubusercontent.com/u/25942074"
                            alt={t('avatarAlt')}
                        />
                        <AvatarFallback className="text-2xl">{t('avatarAlt')}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {t('greeting')} {t('name')}
                    </h1>
                    <p className="text-xl text-gray-600">{t('subtitle')}</p>
                    <p className="text-gray-500 max-w-2xl mx-auto">{t('description')}</p>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <Button size="lg" className="font-medium" asChild>
                        <Link href="/contact">{t('ctaContact')}</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="font-medium" asChild>
                        <Link href="/projects">{t('ctaProjects')}</Link>
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-6 pt-4">
                    <a
                        href="https://github.com/parkerCYH"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label={t('githubAriaLabel')}
                    >
                        <GitHubLogoIcon className="w-6 h-6" />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label={t('linkedinAriaLabel')}
                    >
                        <LinkedInLogoIcon className="w-6 h-6" />
                    </a>
                    <a
                        href="mailto:fbi0258zzz@gmail.com"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label={t('emailAriaLabel')}
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </section>
    );
}
