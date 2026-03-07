import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from './_components/Header';
import Footer from './_components/Footer';
import LocaleHtmlSetter from './_components/LocaleHtmlSetter';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    const baseUrl = 'https://parkercyh.com'; // 替換為實際域名
    const alternateLanguages: Record<string, string> = {};
    for (const loc of routing.locales) {
        alternateLanguages[loc] = `${baseUrl}/${loc}`;
    }

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: `${baseUrl}/${locale}`,
            languages: alternateLanguages,
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <NextIntlClientProvider key={locale} messages={messages}>
            <LocaleHtmlSetter />
            <Header />
            {children}
            <Footer />
        </NextIntlClientProvider>
    );
}
