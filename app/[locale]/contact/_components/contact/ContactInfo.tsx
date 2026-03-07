import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactInfo() {
    const t = useTranslations('contact');

    const contactInfo = [
        {
            icon: Mail,
            title: t('emailLabel'),
            value: 'fbi0258zzz@gmail.com',
        },
        {
            icon: Phone,
            title: t('phoneLabel'),
            value: '0979029036',
        },
        {
            icon: MapPin,
            title: t('locationLabel'),
            value: t('locationValue'),
        },
    ];

    return (
        <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info) => (
                <div key={info.title} className="text-center">
                    <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <info.icon className="w-6 h-6 text-gray-700" />
                        </div>
                    </div>
                    <h3 className="font-semibold mb-1">{info.title}</h3>
                    <p className="text-sm text-gray-600">{info.value}</p>
                </div>
            ))}
        </div>
    );
}
