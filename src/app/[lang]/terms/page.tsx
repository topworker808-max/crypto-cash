import { Metadata } from 'next';
import { i18n, type Locale, isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
    params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isValidLocale(lang)) return { title: 'Not Found' };

    const isRu = lang === 'ru';
    return {
        title: isRu ? 'Условия использования | Crypto2Baht' : 'Terms of Service | Crypto2Baht',
        description: isRu
            ? 'Условия использования сервиса Crypto2Baht'
            : 'Terms of Service of Crypto2Baht',
    };
}

export default async function TermsPage({ params }: TermsPageProps) {
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
                        {isRu ? 'Условия использования' : 'Terms of Service'}
                    </h1>

                    <div className="prose prose-gray dark:prose-invert max-w-none text-sm space-y-4">
                        {isRu ? (
                            <>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">1. О сервисе</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Crypto2Baht — информационный ресурс, предоставляющий калькулятор для расчёта обмена криптовалюты USDT на тайские баты (THB).
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 font-medium">
                                    Важно: Мы НЕ являемся обменником криптовалюты. Мы предоставляем информационные услуги и направляем пользователей к нашему партнёру Ex24.pro.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">2. Отказ от ответственности</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Курсы обмена, отображаемые на сайте, носят ориентировочный характер.
                                    Актуальный курс может отличаться. Для получения точного курса обращайтесь к партнёру Ex24.pro.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Мы не несём ответственности за:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li>Точность отображаемых курсов</li>
                                    <li>Действия партнёра Ex24.pro</li>
                                    <li>Убытки, связанные с использованием информации на сайте</li>
                                    <li>Технические сбои и недоступность сервиса</li>
                                </ul>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">3. Партнёрская программа</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Сайт содержит партнёрские ссылки на Ex24.pro. При переходе по ссылке мы можем получать комиссию от партнёра.
                                    Это не влияет на стоимость услуг для вас.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">4. Использование сервиса</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Используя наш сервис, вы соглашаетесь:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li>Использовать сервис только в законных целях</li>
                                    <li>Не нарушать работу сервиса</li>
                                    <li>Самостоятельно проверять информацию перед принятием финансовых решений</li>
                                </ul>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">5. Интеллектуальная собственность</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Весь контент сайта (тексты, дизайн, код) защищён авторским правом.
                                    Копирование без разрешения запрещено.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">6. Изменения условий</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Мы оставляем за собой право изменять данные условия в любое время.
                                    Продолжая использовать сервис, вы принимаете обновлённые условия.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">7. Контакты</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    По всем вопросам обращайтесь к нашему партнёру Ex24.pro.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Last updated: {new Date().toLocaleDateString('en-US')}
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">1. About the Service</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Crypto2Baht is an informational resource providing a calculator for USDT to Thai Baht (THB) exchange rates.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 font-medium">
                                    Important: We are NOT a cryptocurrency exchanger. We provide informational services and direct users to our partner Ex24.pro.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">2. Disclaimer</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Exchange rates displayed on this website are estimates only.
                                    Actual rates may vary. For current rates, please contact our partner Ex24.pro.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300">
                                    We are not responsible for:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li>Accuracy of displayed exchange rates</li>
                                    <li>Actions of partner Ex24.pro</li>
                                    <li>Losses related to use of information on this website</li>
                                    <li>Technical issues or service unavailability</li>
                                </ul>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">3. Affiliate Program</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    This website contains affiliate links to Ex24.pro. We may receive commission when you click these links.
                                    This does not affect the cost of services for you.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">4. Use of Service</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    By using our service, you agree to:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                                    <li>Use the service only for lawful purposes</li>
                                    <li>Not disrupt the service operation</li>
                                    <li>Verify information independently before making financial decisions</li>
                                </ul>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">5. Intellectual Property</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    All website content (text, design, code) is protected by copyright.
                                    Copying without permission is prohibited.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">6. Changes to Terms</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    We reserve the right to modify these terms at any time.
                                    By continuing to use the service, you accept the updated terms.
                                </p>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">7. Contact</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    For all inquiries, please contact our partner Ex24.pro.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
