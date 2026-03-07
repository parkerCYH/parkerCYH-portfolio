import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('footer');
    return (
        <footer className="bg-gray-900 text-white py-8 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-sm text-gray-400">{t('copyright')}</p>
            </div>
        </footer>
    );
}
