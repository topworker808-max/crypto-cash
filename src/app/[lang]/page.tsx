import { Metadata } from 'next';
import { i18n, type Locale, isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { CityPageContent } from '@/components/city/CityPageContent';
import { DEFAULT_LOCATION } from '@/config/locations';
import { getAllRates } from '@/lib/rate-service';
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
                'zh': '/zh',
            },
        },
    };
}

export default async function LangPage({ params }: LangPageProps) {
    const { lang } = await params;
    if (!isValidLocale(lang)) notFound();

    const [ratesData, dict] = await Promise.all([
        getAllRates(),
        getDictionary(lang as Locale),
    ]);

    return (
        <CityPageContent
            location={DEFAULT_LOCATION}
            initialRate={ratesData.usdtRate}
            initialRubRate={ratesData.rubRate}
            rateUpdatedAt={ratesData.updatedAt}
            lang={lang as Locale}
            dict={dict}
        />
    );
}
