import { MetadataRoute } from 'next';
import { locations } from '@/config/locations';
import { blogPosts } from '@/config/blog';
import { i18n } from '@/i18n/config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://crypto2baht.com';

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

        // Blog index page
        pages.push({
            url: `${BASE_URL}/${lang}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
        });

        // Blog posts
        for (const post of blogPosts) {
            pages.push({
                url: `${BASE_URL}/${lang}/blog/${post.slug}`,
                lastModified: new Date(post.updatedAt || post.publishedAt),
                changeFrequency: 'monthly',
                priority: 0.6,
            });
        }

        // Static pages
        pages.push({
            url: `${BASE_URL}/${lang}/privacy`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        });

        pages.push({
            url: `${BASE_URL}/${lang}/terms`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        });
    }

    return pages;
}
