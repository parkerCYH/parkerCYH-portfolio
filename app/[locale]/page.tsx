import { setRequestLocale } from 'next-intl/server';
import HeroSection from './_components/sections/HeroSection';
import AboutSection from './_components/sections/AboutSection';
import SkillsSection from './_components/sections/SkillsSection';
import ProjectsSection from './_components/sections/ProjectsSection';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
        </main>
    );
}
