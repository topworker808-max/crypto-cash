"use client";

import { useState } from 'react';
import { CityConfig } from '@/config/locations';
import { Calculator, type SourceCurrency } from '@/components/calculator/Calculator';
import { RateComparison } from '@/components/calculator/RateComparison';
import { AtmLossCalculator } from '@/components/calculator/AtmLossCalculator';
import { StickyActionBtn } from '@/components/conversion/StickyActionBtn';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import { FAQ } from '@/components/faq/FAQ';
import { JsonLd, HowToJsonLd, FinancialCalculatorJsonLd } from '@/components/seo/JsonLd';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, MessageCircle, Banknote, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';

interface CityPageContentProps {
    location: CityConfig;
    initialRate: number;
    initialRubRate?: number;
    rateUpdatedAt?: number;
    lang: Locale;
    dict: Dictionary;
}

export function CityPageContent({ location, initialRate, initialRubRate = 0.38, rateUpdatedAt, lang, dict }: CityPageContentProps) {
    const [amount, setAmount] = useState<number | "">("");
    const [receiveAmount, setReceiveAmount] = useState<number | "">("");
    const [sourceCurrency, setSourceCurrency] = useState<SourceCurrency>('USDT');

    // Use the live rate combined with the location modifier
    const rate = initialRate * location.baseRateModifier;

    // RUB to THB rate from API
    const rubRate = initialRubRate;

    // Get city name in current language
    const cityNameKey = location.slug as keyof typeof dict.landing;
    const cityName = dict.landing[cityNameKey] || location.displayName;

    return (
        <>
            {/* JSON-LD Structured Data for SEO */}
            <JsonLd dict={dict} type="faq" />
            <HowToJsonLd dict={dict} lang={lang} />
            <FinancialCalculatorJsonLd lang={lang} />

            <main className="flex min-h-screen flex-col items-center justify-start pt-6 p-4 pb-40 bg-[#E6E6E6] dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative overflow-hidden transition-colors">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center space-y-8 relative z-10"
            >
                {/* Header with controls - like Ex24.pro */}
                <div className="flex items-center justify-between w-full">
                    {/* Theme Toggle - Left */}
                    <ThemeToggle />

                    {/* Logo - Center */}
                    <Logo className="h-9 sm:h-10" />

                    {/* Language Switcher - Right */}
                    <LanguageSwitcher currentLang={lang} />
                </div>

                {/* Subtitle */}
                <div className="space-y-1 -mt-4">
                    <p className="text-base text-gray-600 dark:text-gray-400">
                        {dict.landing.subtitle}
                    </p>
                </div>

                <Calculator
                    cityConfig={location}
                    amount={amount}
                    receiveAmount={receiveAmount}
                    onAmountChange={setAmount}
                    onReceiveAmountChange={setReceiveAmount}
                    rate={rate}
                    rubRate={rubRate}
                    rateUpdatedAt={rateUpdatedAt}
                    dict={dict}
                    sourceCurrency={sourceCurrency}
                    onSourceCurrencyChange={setSourceCurrency}
                />

                {/* Rate Comparison Widget - only for USDT */}
                {sourceCurrency === 'USDT' && (
                    <RateComparison
                        cityConfig={location}
                        amount={typeof amount === 'number' ? amount : 1000}
                        rate={rate}
                        dict={dict}
                    />
                )}

                {/* ATM Loss Calculator - only for USDT */}
                {sourceCurrency === 'USDT' && typeof amount === 'number' && amount >= 100 && (
                    <AtmLossCalculator
                        cityConfig={location}
                        amount={amount}
                        rate={rate}
                        dict={dict}
                    />
                )}

                {/* SEO Content Block: Why Exchange? */}
                <div className="pt-6 space-y-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">{dict.benefits.title}</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{dict.benefits.betterRate.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{dict.benefits.betterRate.description}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <Wallet className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{dict.benefits.noAtmFees.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{dict.benefits.noAtmFees.description}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <ShieldCheck className="w-5 h-5 text-purple-600 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{dict.benefits.safeDelivery.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{dict.benefits.safeDelivery.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ways to Receive - Card Grid with Images */}
                <div className="pt-8 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                        {lang === 'ru' ? 'Способы получения' : 'Ways to Receive'}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {/* ATM Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                            <div className="w-16 h-16 mb-2 relative">
                                <Image
                                    src="/images/atm.png"
                                    alt="ATM"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {lang === 'ru' ? 'Снятие в ATM' : 'ATM Withdrawal'}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {lang === 'ru' ? 'По QR-коду без карты' : 'QR code, no card needed'}
                            </p>
                        </div>

                        {/* Delivery Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                            <div className="w-16 h-16 mb-2 relative">
                                <Image
                                    src="/images/delivery.png"
                                    alt="Delivery"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {lang === 'ru' ? 'Доставка курьером' : 'Courier Delivery'}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {lang === 'ru' ? 'До двери в удобное время' : 'To your door anytime'}
                            </p>
                        </div>

                        {/* Cash/Office Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                            <div className="w-16 h-16 mb-2 relative">
                                <Image
                                    src="/images/cash.png"
                                    alt="Cash"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {lang === 'ru' ? 'В офисе Ex24' : 'Ex24 Office'}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {lang === 'ru' ? 'Самовывоз наличных' : 'Cash pickup'}
                            </p>
                        </div>

                        {/* Bank Transfer Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                            <div className="w-16 h-16 mb-2 relative">
                                <Image
                                    src="/images/bank.png"
                                    alt="Bank"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {lang === 'ru' ? 'На тайский счёт' : 'Thai Bank Account'}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {lang === 'ru' ? 'Перевод по реквизитам' : 'Bank transfer'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* How it Works Section */}
                <div className="pt-8 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{dict.howItWorks.title.replace('{city}', String(cityName))}</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-xl bg-[#FFD528] shadow-sm flex items-center justify-center text-gray-900">
                                <CalcIcon className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{dict.howItWorks.step1}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-xl bg-[#FFD528] shadow-sm flex items-center justify-center text-gray-900">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{dict.howItWorks.step2}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-xl bg-[#FFD528] shadow-sm flex items-center justify-center text-gray-900">
                                <Banknote className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{dict.howItWorks.step3}</p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <FAQ dict={dict} />

                {/* Footer Links */}
                <div className="pt-8 pb-4 flex flex-col items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                        <Link href={`/${lang}/blog`} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                            {dict.blog.title}
                        </Link>
                        <span>|</span>
                        <Link href={`/${lang}/privacy`} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                            {dict.footer.privacy}
                        </Link>
                        <span>|</span>
                        <Link href={`/${lang}/terms`} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                            {dict.footer.terms}
                        </Link>
                    </div>
                    <p className="text-gray-400 dark:text-gray-500">
                        {dict.footer.disclaimer}
                    </p>
                </div>
            </motion.div>

            <StickyActionBtn
                cityConfig={location}
                receiveAmount={receiveAmount}
                sendAmount={amount}
                sendCurrency={sourceCurrency}
                lang={lang}
                dict={dict}
            />
        </main>
        </>
    );
}
