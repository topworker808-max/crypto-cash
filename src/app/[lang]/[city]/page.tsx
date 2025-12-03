import { notFound } from 'next/navigation';
import { locations } from '@/config/locations';
import { Metadata } from 'next';
import { CityPageContent } from '@/components/city/CityPageContent';
import { getAllRates } from '@/lib/rate-service';
import { i18n, type Locale, isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

interface CityPageProps {
    params: Promise<{
        lang: string;
        city: string;
    }>;
}

// Generate all combinations of lang + city
export async function generateStaticParams() {
    const params: { lang: string; city: string }[] = [];

    for (const locale of i18n.locales) {
        for (const location of locations) {
            params.push({
                lang: locale,
                city: location.slug,
            });
        }
    }

    return params;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
    const { lang, city } = await params;

    if (!isValidLocale(lang)) return { title: 'Not Found' };

    const location = locations.find((loc) => loc.slug === city);
    const dict = await getDictionary(lang);

    if (!location) {
        return {
            title: 'Location Not Found',
        };
    }

    // Get city name in current language
    const cityNameKey = city as keyof typeof dict.landing;
    const cityName = dict.landing[cityNameKey] || location.displayName;

    const title = dict.meta.title.replace('{city}', String(cityName));
    const description = dict.meta.description
        .replace('{city}', String(cityName))
        .replace('{currency}', location.currency);

    return {
        title,
        description,
        alternates: {
            canonical: `/${lang}/${city}`,
            languages: {
                'en': `/en/${city}`,
                'ru': `/ru/${city}`,
            },
        },
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}

export default async function CityPage({ params }: CityPageProps) {
    const { lang, city } = await params;

    if (!isValidLocale(lang)) notFound();

    const location = locations.find((loc) => loc.slug === city);

    if (!location) {
        notFound();
    }

    const [ratesData, dict] = await Promise.all([
        getAllRates(),
        getDictionary(lang as Locale),
    ]);

    return (
        <CityPageContent
            location={location}
            initialRate={ratesData.usdtRate}
            initialRubRate={ratesData.rubRate}
            rateUpdatedAt={ratesData.updatedAt}
            lang={lang as Locale}
            dict={dict}
        />
    );
}
