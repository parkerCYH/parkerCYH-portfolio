import { useTranslations } from 'next-intl';
import ContactForm from '../contact/ContactForm';
import ContactInfo from '../contact/ContactInfo';

export default function ContactSection() {
    const t = useTranslations('contact');

    return (
        <section id="contact" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-gray-600">{t('description')}</p>
                </div>

                <ContactInfo />
                <ContactForm />
            </div>
        </section>
    );
}
