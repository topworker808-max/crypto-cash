import { Metadata } from 'next';
import { i18n, type Locale, isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { blogPosts } from '@/config/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPostPageProps {
    params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
    const params: { lang: string; slug: string }[] = [];

    for (const locale of i18n.locales) {
        for (const post of blogPosts) {
            params.push({
                lang: locale,
                slug: post.slug,
            });
        }
    }

    return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { lang, slug } = await params;
    if (!isValidLocale(lang)) return { title: 'Not Found' };

    const dict = await getDictionary(lang);
    const postData = dict.blog.posts[slug as keyof typeof dict.blog.posts];

    if (!postData) {
        return { title: 'Article Not Found' };
    }

    return {
        title: `${postData.title} | Crypto2Baht`,
        description: postData.description,
        alternates: {
            canonical: `/${lang}/blog/${slug}`,
            languages: {
                'en': `/en/blog/${slug}`,
                'ru': `/ru/blog/${slug}`,
            },
        },
        openGraph: {
            title: postData.title,
            description: postData.description,
            type: 'article',
        },
    };
}

// JSON-LD for Article
function ArticleJsonLd({ title, description, publishedAt, lang }: { title: string; description: string; publishedAt: string; lang: string }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "datePublished": publishedAt,
        "author": {
            "@type": "Organization",
            "name": "Crypto2Baht"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Crypto2Baht"
        },
        "inLanguage": lang === 'ru' ? 'ru-RU' : 'en-US'
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { lang, slug } = await params;
    if (!isValidLocale(lang)) notFound();

    const dict = await getDictionary(lang as Locale);
    const post = blogPosts.find(p => p.slug === slug);
    const postData = dict.blog.posts[slug as keyof typeof dict.blog.posts];

    if (!post || !postData) {
        notFound();
    }

    // Estimate reading time (200 words per minute)
    const wordCount = postData.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <>
            <ArticleJsonLd
                title={postData.title}
                description={postData.description}
                publishedAt={post.publishedAt}
                lang={lang}
            />

            <main className="min-h-screen bg-[#E6E6E6] dark:bg-gray-900 py-8 px-4">
                <article className="max-w-2xl mx-auto">
                    <Link
                        href={`/${lang}/blog`}
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {dict.blog.backToBlog}
                    </Link>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
                        <header className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                {postData.title}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {postData.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{dict.blog.publishedAt}: {new Date(post.publishedAt).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{readingTime} {lang === 'ru' ? 'мин чтения' : 'min read'}</span>
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-gray dark:prose-invert max-w-none
                            prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                            prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-li:text-gray-600 dark:prose-li:text-gray-300
                            prose-strong:text-gray-900 dark:prose-strong:text-white
                            prose-table:text-sm
                            prose-th:bg-gray-100 dark:prose-th:bg-gray-700 prose-th:p-2
                            prose-td:p-2 prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700
                        ">
                            <ReactMarkdown>{postData.content}</ReactMarkdown>
                        </div>

                        {/* CTA at the end */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="bg-[#FFD528]/10 rounded-xl p-6 text-center">
                                <p className="text-gray-900 dark:text-white font-medium mb-3">
                                    {lang === 'ru' ? 'Готовы обменять USDT на баты?' : 'Ready to exchange USDT to Baht?'}
                                </p>
                                <Link
                                    href={`/${lang}`}
                                    className="inline-flex items-center gap-2 bg-[#FFD528] text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-[#FFD528]/90 transition-colors"
                                >
                                    {lang === 'ru' ? 'Перейти к калькулятору' : 'Go to Calculator'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
}
