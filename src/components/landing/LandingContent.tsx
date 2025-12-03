"use client";

import Link from 'next/link';
import { locations } from '@/config/locations';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface LandingContentProps {
    lang: Locale;
    dict: Dictionary;
}

// Map city slugs to dictionary keys
const cityNameKeys: Record<string, keyof Dictionary['landing']> = {
    'pattaya': 'pattaya',
    'phuket': 'phuket',
};

export function LandingContent({ lang, dict }: LandingContentProps) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#E6E6E6] text-gray-900 relative overflow-hidden">
            {/* Language Switcher */}
            <div className="absolute top-4 right-4 z-20">
                <LanguageSwitcher currentLang={lang} />
            </div>

            <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900">
                        Crypto<span className="text-gray-500">Cash</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {dict.landing.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map((loc, index) => {
                        const cityKey = cityNameKeys[loc.slug];
                        const cityName = cityKey ? dict.landing[cityKey] : loc.displayName;

                        return (
                            <motion.div
                                key={loc.slug}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                <Link
                                    href={`/${lang}/${loc.slug}`}
                                    className="group block p-8 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg hover:border-[#FFD528] transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-full bg-gray-100 text-gray-700 group-hover:bg-[#FFD528] group-hover:text-gray-900 transition-colors">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#FFD528] transition-colors" />
                                    </div>

                                    <h2 className="text-2xl font-bold text-gray-900 text-left">
                                        {cityName}
                                    </h2>
                                    <p className="mt-2 text-gray-500 text-left text-sm">
                                        USDT → {loc.currency}
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
