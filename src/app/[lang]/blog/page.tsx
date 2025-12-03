import { Metadata } from 'next';
import { i18n, type Locale, isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { blogPosts } from '@/config/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';

interface BlogPageProps {
    params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isValidLocale(lang)) return { title: 'Not Found' };

    const dict = await getDictionary(lang);

    return {
        title: `${dict.blog.title} | Crypto2Baht`,
        description: dict.blog.subtitle,
        alternates: {
            canonical: `/${lang}/blog`,
            languages: {
                'en': '/en/blog',
                'ru': '/ru/blog',
            },
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { lang } = await params;
    if (!isValidLocale(lang)) notFound();

    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-[#E6E6E6] dark:bg-gray-900 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Link
                    href={`/${lang}`}
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {lang === 'ru' ? 'На главную' : 'Home'}
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {dict.blog.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.blog.subtitle}
                    </p>
                </div>

                <div className="space-y-4">
                    {blogPosts.map((post) => {
                        const postData = dict.blog.posts[post.slug as keyof typeof dict.blog.posts];
                        if (!postData) return null;

                        return (
                            <Link
                                key={post.slug}
                                href={`/${lang}/blog/${post.slug}`}
                                className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group"
                            >
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#FFD528] transition-colors">
                                    {postData.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                    {postData.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                                        <Calendar className="w-3 h-3" />
                                        <span>{dict.blog.publishedAt}: {new Date(post.publishedAt).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</span>
                                    </div>
                                    <span className="text-sm text-[#FFD528] font-medium flex items-center gap-1">
                                        {dict.blog.readMore}
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
