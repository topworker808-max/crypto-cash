import { MetadataRoute } from 'next';
import { locations } from '@/config/locations';
import { i18n } from '@/i18n/config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cryptocash.pro';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const pages: MetadataRoute.Sitemap = [];

    // Landing pages for each language
    for (const lang of i18n.locales) {
        pages.push({
            url: `${BASE_URL}/${lang}`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: lang === i18n.defaultLocale ? 1.0 : 0.9,
        });

        // City pages for each language
        for (const location of locations) {
            pages.push({
                url: `${BASE_URL}/${lang}/${location.slug}`,
                lastModified: now,
                changeFrequency: 'hourly', // Rates update frequently
                priority: 0.8,
            });
        }
    }

    return pages;
}
