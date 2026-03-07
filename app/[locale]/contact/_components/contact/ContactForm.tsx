'use client';

import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactForm() {
    const t = useTranslations('contact.form');

    const formSchema = z.object({
        name: z.string().min(2, { message: t('nameError') }),
        subject: z.string().min(2, { message: t('subjectError') }),
        email: z.string().email({ message: t('emailError') }),
        message: z.string().min(10, { message: t('messageError') }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '', subject: '', email: '', message: '' },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                alert(t('successAlert'));
                form.reset();
            } else {
                alert(t('errorAlert'));
            }
        } catch {
            alert(t('errorAlert'));
        }
    }

    return (
        <Card>
            <CardContent className="p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('nameLabel')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('namePlaceholder')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('subjectLabel')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t('subjectPlaceholder')}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('emailLabel')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder={t('emailPlaceholder')}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('messageLabel')}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={t('messagePlaceholder')}
                                            rows={5}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full cursor-pointer" size="lg">
                            {t('submitButton')}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
