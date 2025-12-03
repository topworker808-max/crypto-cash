import { Metadata } from 'next';
import { i18n, type Locale, isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { LandingContent } from '@/components/landing/LandingContent';
import { notFound } from 'next/navigation';

interface LangPageProps {
    params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: LangPageProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isValidLocale(lang)) return { title: 'Not Found' };

    const dict = await getDictionary(lang);

    return {
        title: dict.common.siteName + ' - ' + dict.common.tagline,
        description: dict.landing.subtitle,
        alternates: {
            canonical: `/${lang}`,
            languages: {
                'en': '/en',
                'ru': '/ru',
            },
        },
    };
}

export default async function LangPage({ params }: LangPageProps) {
    const { lang } = await params;
    if (!isValidLocale(lang)) notFound();

    const dict = await getDictionary(lang as Locale);

    return <LandingContent lang={lang as Locale} dict={dict} />;
}
