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
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground relative overflow-hidden">
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
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl">
                        Crypto<span className="text-zinc-500">Cash</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
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
                                    className="group block p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-sm hover:border-white/20 hover:bg-zinc-900 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-full bg-zinc-800 text-white group-hover:bg-white group-hover:text-black transition-colors">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                                    </div>

                                    <h2 className="text-2xl font-bold text-white group-hover:text-white text-left">
                                        {cityName}
                                    </h2>
                                    <p className="mt-2 text-zinc-400 text-left text-sm">
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
