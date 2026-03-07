import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Palette, Lightbulb } from 'lucide-react';

export default function AboutSection() {
    const t = useTranslations('about');

    return (
        <section id="about" className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{t('description')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="text-center">
                        <CardContent className="pt-8 pb-6">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Code2 className="w-8 h-8 text-gray-700" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('devTitle')}</h3>
                            <p className="text-gray-600 text-sm">{t('devDesc')}</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-6">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Palette className="w-8 h-8 text-gray-700" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('designTitle')}</h3>
                            <p className="text-gray-600 text-sm">{t('designDesc')}</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-6">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Lightbulb className="w-8 h-8 text-gray-700" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('innovateTitle')}</h3>
                            <p className="text-gray-600 text-sm">{t('innovateDesc')}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
