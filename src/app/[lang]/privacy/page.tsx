import { Metadata } from 'next';
import { i18n, type Locale, isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
    params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isValidLocale(lang)) return { title: 'Not Found' };

    const isRu = lang === 'ru';
    return {
        title: isRu ? 'Политика конфиденциальности | Crypto2Baht' : 'Privacy Policy | Crypto2Baht',
        description: isRu
            ? 'Политика конфиденциальности сервиса Crypto2Baht'
            : 'Privacy Policy of Crypto2Baht service',
    };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
    const { lang } = await params;
    if (!isValidLocale(lang)) notFound();

    const dict = await getDictionary(lang as Locale);
    const isRu = lang === 'ru';

    return (
        <main className="min-h-screen bg-[#E6E6E6] dark:bg-gray-900 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Link
                    href={`/${lang}`}
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {isRu ? 'Назад' : 'Back'}
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {isRu ? 'Политика конфиденциальности' : 'Privacy Policy'}
                    </h1>

                    <div className="prose prose-gray dark:prose-invert max-w-none text-sm space-y-4">
                        {isRu ? (
                            <>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">1. Общие положения</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Crypto2Baht («мы», «наш сервис») — информационный ресурс, предоставляющий калькулятор обмена криптовалюты.
                                    Мы не осуществляем обмен криптовалюты напрямую. Все операции обмена проводятся через нашего партнёра Ex24.pro.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">2. Какие данные мы собираем</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Мы можем собирать следующую информацию:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li>Данные об использовании сайта (страницы, время посещения)</li>
                                    <li>Техническая информация (тип браузера, IP-адрес, устройство)</li>
                                    <li>Cookies для улучшения работы сервиса</li>
                                </ul>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">3. Использование данных</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Собранные данные используются для:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li>Улучшения работы сервиса</li>
                                    <li>Анализа посещаемости (Google Analytics, Яндекс.Метрика)</li>
                                    <li>Отслеживания переходов к партнёру</li>
                                </ul>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">4. Передача данных третьим лицам</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li>Сервисов аналитики (Google, Яндекс)</li>
                                    <li>Случаев, требуемых законодательством</li>
                                </ul>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">5. Cookies</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Сайт использует cookies для корректной работы и аналитики.
                                    Вы можете отключить cookies в настройках браузера.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">6. Контакты</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    По вопросам конфиденциальности обращайтесь к нашему партнёру Ex24.pro.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Last updated: {new Date().toLocaleDateString('en-US')}
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">1. Introduction</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Crypto2Baht ("we", "our service") is an informational resource providing a cryptocurrency exchange calculator.
                                    We do not perform cryptocurrency exchanges directly. All exchange operations are conducted through our partner Ex24.pro.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">2. Data We Collect</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    We may collect the following information:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li>Website usage data (pages visited, time spent)</li>
                                    <li>Technical information (browser type, IP address, device)</li>
                                    <li>Cookies to improve service functionality</li>
                                </ul>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">3. Use of Data</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Collected data is used for:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li>Improving service quality</li>
                                    <li>Traffic analysis (Google Analytics, Yandex.Metrica)</li>
                                    <li>Tracking referrals to partner</li>
                                </ul>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">4. Third-Party Data Sharing</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    We do not sell or share your personal data with third parties, except for:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li>Analytics services (Google, Yandex)</li>
                                    <li>Cases required by law</li>
                                </ul>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">5. Cookies</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    This website uses cookies for proper functionality and analytics.
                                    You can disable cookies in your browser settings.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">6. Contact</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    For privacy-related inquiries, please contact our partner Ex24.pro.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
