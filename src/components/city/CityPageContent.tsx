"use client";

import { useState } from 'react';
import { CityConfig } from '@/config/locations';
import { Calculator } from '@/components/calculator/Calculator';
import { RateComparison } from '@/components/calculator/RateComparison';
import { AtmLossCalculator } from '@/components/calculator/AtmLossCalculator';
import { StickyActionBtn } from '@/components/conversion/StickyActionBtn';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { FAQ } from '@/components/faq/FAQ';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, MessageCircle, Banknote, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';

interface CityPageContentProps {
    location: CityConfig;
    initialRate: number;
    rateUpdatedAt?: number;
    lang: Locale;
    dict: Dictionary;
}

export function CityPageContent({ location, initialRate, rateUpdatedAt, lang, dict }: CityPageContentProps) {
    const [amount, setAmount] = useState<number | "">("");
    const [receiveAmount, setReceiveAmount] = useState<number | "">("");

    // Use the live rate combined with the location modifier
    const rate = initialRate * location.baseRateModifier;

    // Get city name in current language
    const cityNameKey = location.slug as keyof typeof dict.landing;
    const cityName = dict.landing[cityNameKey] || location.displayName;

    return (
        <main className="flex min-h-screen flex-col items-center justify-start pt-12 p-4 pb-40 bg-[#E6E6E6] text-gray-900 relative overflow-hidden">
            {/* Language Switcher */}
            <div className="absolute top-4 right-4 z-20">
                <LanguageSwitcher currentLang={lang} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center space-y-8 relative z-10"
            >
                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                        CryptoCash <span className="text-gray-500">{cityName}</span>
                    </h1>
                    <p className="text-base text-gray-600">
                        {dict.calculator.title}. {dict.calculator.subtitle.replace('{currency}', location.currency)}
                    </p>
                </div>

                <Calculator
                    cityConfig={location}
                    amount={amount}
                    receiveAmount={receiveAmount}
                    onAmountChange={setAmount}
                    onReceiveAmountChange={setReceiveAmount}
                    rate={rate}
                    rateUpdatedAt={rateUpdatedAt}
                    dict={dict}
                />

                {/* Rate Comparison Widget */}
                <RateComparison
                    cityConfig={location}
                    amount={typeof amount === 'number' ? amount : 1000}
                    rate={rate}
                    dict={dict}
                />

                {/* ATM Loss Calculator */}
                {typeof amount === 'number' && amount >= 100 && (
                    <AtmLossCalculator
                        cityConfig={location}
                        amount={amount}
                        rate={rate}
                        dict={dict}
                    />
                )}

                {/* SEO Content Block: Why Exchange? */}
                <div className="pt-6 space-y-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 text-center">{dict.benefits.title}</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">{dict.benefits.betterRate.title}</h4>
                                <p className="text-xs text-gray-500">{dict.benefits.betterRate.description}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                            <Wallet className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">{dict.benefits.noAtmFees.title}</h4>
                                <p className="text-xs text-gray-500">{dict.benefits.noAtmFees.description}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                            <ShieldCheck className="w-5 h-5 text-purple-600 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">{dict.benefits.safeDelivery.title}</h4>
                                <p className="text-xs text-gray-500">{dict.benefits.safeDelivery.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How it Works Section */}
                <div className="pt-8 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">{dict.howItWorks.title.replace('{city}', String(cityName))}</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-700">
                                <CalcIcon className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-gray-600">{dict.howItWorks.step1}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-700">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-gray-600">{dict.howItWorks.step2}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-700">
                                <Banknote className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-gray-600">{dict.howItWorks.step3}</p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <FAQ dict={dict} />
            </motion.div>

            <StickyActionBtn cityConfig={location} receiveAmount={receiveAmount} lang={lang} dict={dict} />
        </main>
    );
}
