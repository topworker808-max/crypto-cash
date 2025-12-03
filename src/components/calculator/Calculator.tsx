"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CityConfig } from "@/config/locations";
import { ArrowUpDown, Check, Info } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";

function ThailandFlag({ className = "w-5 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="600" fill="#A51931"/>
            <rect y="100" width="900" height="400" fill="#F4F5F8"/>
            <rect y="200" width="900" height="200" fill="#2D2A4A"/>
        </svg>
    );
}

function RussiaFlag({ className = "w-5 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="200" fill="#FFFFFF"/>
            <rect y="200" width="900" height="200" fill="#0039A6"/>
            <rect y="400" width="900" height="200" fill="#D52B1E"/>
        </svg>
    );
}

export type SourceCurrency = 'USDT' | 'RUB';

interface CalculatorProps {
    cityConfig: CityConfig;
    amount: number | "";
    receiveAmount: number | "";
    onAmountChange: (val: number | "") => void;
    onReceiveAmountChange: (val: number | "") => void;
    rate: number;
    rubRate?: number; // RUB to THB rate
    rateUpdatedAt?: number;
    dict?: Dictionary;
    sourceCurrency?: SourceCurrency;
    onSourceCurrencyChange?: (currency: SourceCurrency) => void;
}

function formatTimeAgo(timestamp: number, lang: string): string {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) {
        return lang === 'ru' ? 'только что' : 'just now';
    }
    if (diffMin === 1) {
        return lang === 'ru' ? '1 мин назад' : '1 min ago';
    }
    if (diffMin < 60) {
        return lang === 'ru' ? `${diffMin} мин назад` : `${diffMin} min ago`;
    }
    return lang === 'ru' ? '1 час+ назад' : '1h+ ago';
}

export function Calculator({
    cityConfig,
    amount,
    receiveAmount,
    onAmountChange,
    onReceiveAmountChange,
    rate,
    rubRate = 0.38, // Default RUB/THB rate (~2.6 RUB per 1 THB)
    rateUpdatedAt,
    dict,
    sourceCurrency = 'USDT',
    onSourceCurrencyChange
}: CalculatorProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [internalCurrency, setInternalCurrency] = useState<SourceCurrency>(sourceCurrency);

    const currentCurrency = onSourceCurrencyChange ? sourceCurrency : internalCurrency;
    const setCurrentCurrency = onSourceCurrencyChange || setInternalCurrency;

    // Determine language from dict
    const lang = dict?.common?.siteName ? (dict.landing.pattaya === 'Паттайя' ? 'ru' : 'en') : 'en';

    // Current rate based on selected currency
    const currentRate = currentCurrency === 'USDT' ? rate : rubRate;

    // Preset amounts based on currency
    const presets = currentCurrency === 'USDT'
        ? [100, 500, 1000, 5000]
        : [10000, 50000, 100000, 500000];

    const formatPreset = (preset: number) => {
        if (currentCurrency === 'RUB') {
            return preset >= 1000 ? `${preset / 1000}k` : preset;
        }
        return preset >= 1000 ? `${preset / 1000}k` : preset;
    };

    const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "") {
            onAmountChange("");
            onReceiveAmountChange("");
            return;
        }
        const num = parseFloat(val);
        if (!isNaN(num) && num >= 0) {
            onAmountChange(num);
            onReceiveAmountChange(parseFloat((num * currentRate).toFixed(2)));
        }
    };

    const handleTHBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "") {
            onAmountChange("");
            onReceiveAmountChange("");
            return;
        }
        const num = parseFloat(val);
        if (!isNaN(num) && num >= 0) {
            onReceiveAmountChange(num);
            onAmountChange(parseFloat((num / currentRate).toFixed(2)));
        }
    };

    const handleCurrencySwitch = (currency: SourceCurrency) => {
        setCurrentCurrency(currency);
        // Recalculate amounts with new rate
        if (amount && typeof amount === 'number') {
            const newRate = currency === 'USDT' ? rate : rubRate;
            onReceiveAmountChange(parseFloat((amount * newRate).toFixed(2)));
        }
    };

    return (
        <div className="space-y-4 w-full max-w-md mx-auto">
            <Card className="w-full bg-white border-none shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-0">
                    {/* Currency Switcher */}
                    <div className="p-4 pb-0">
                        <div className="flex bg-gray-100 rounded-xl p-1">
                            <button
                                type="button"
                                onClick={() => handleCurrencySwitch('USDT')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                                    currentCurrency === 'USDT'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-xs">₮</span>
                                USDT
                            </button>
                            <button
                                type="button"
                                onClick={() => handleCurrencySwitch('RUB')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                                    currentCurrency === 'RUB'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <RussiaFlag className="w-5 h-3.5 rounded-sm" />
                                RUB
                            </button>
                        </div>
                    </div>

                    {/* Top Input: You Send */}
                    <div className="p-5 pb-3 space-y-2 relative">
                        <Label htmlFor="source-input" className="text-gray-500 text-sm font-medium ml-1">
                            {dict?.calculator.youSend || 'You send'}
                        </Label>
                        <div className="relative flex items-center bg-gray-100 rounded-xl border border-gray-200 focus-within:border-[#FFD528] focus-within:ring-2 focus-within:ring-[#FFD528]/20 transition-all">
                            <Input
                                id="source-input"
                                type="number"
                                placeholder="0"
                                value={amount}
                                onChange={handleSourceChange}
                                className="text-3xl font-bold bg-transparent border-none focus:ring-0 h-14 text-gray-900 placeholder:text-gray-400 w-full pl-4 pr-24"
                            />
                            <div className="absolute right-3 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                                {currentCurrency === 'USDT' ? (
                                    <>
                                        <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-xs">₮</span>
                                        <span className="text-gray-900 font-bold text-sm">USDT</span>
                                    </>
                                ) : (
                                    <>
                                        <RussiaFlag className="w-5 h-3.5 rounded-sm" />
                                        <span className="text-gray-900 font-bold text-sm">RUB</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Preset Amount Buttons */}
                        <div className="flex gap-2 pt-1">
                            {presets.map((preset) => (
                                <button
                                    key={preset}
                                    type="button"
                                    onClick={() => {
                                        onAmountChange(preset);
                                        onReceiveAmountChange(parseFloat((preset * currentRate).toFixed(2)));
                                    }}
                                    className={`flex-1 py-1.5 px-2 text-sm font-medium rounded-lg transition-all ${
                                        amount === preset
                                            ? 'bg-[#FFD528] text-gray-900 shadow-sm'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {formatPreset(preset)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Toggle / Rate Divider */}
                    <div className="relative h-6 mx-5 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-px bg-gray-200" />
                        </div>
                        <div className="relative z-10 bg-white p-2 rounded-full border border-gray-200 shadow-sm">
                            <ArrowUpDown className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-white px-2 py-0.5 rounded">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs text-gray-600 font-medium">
                                1 {currentCurrency} ≈ {currentRate.toFixed(2)} {cityConfig.currency}
                            </span>
                        </div>
                    </div>

                    {/* Bottom Input: You Receive */}
                    <div className="p-5 pt-3 space-y-2">
                        <Label htmlFor="thb-input" className="text-gray-500 text-sm font-medium ml-1">
                            {dict?.calculator.youReceive || 'You receive'}
                        </Label>
                        <div className="relative flex items-center bg-gray-100 rounded-xl border border-gray-200 focus-within:border-[#FFD528] focus-within:ring-2 focus-within:ring-[#FFD528]/20 transition-all">
                            <Input
                                id="thb-input"
                                type="number"
                                placeholder="0"
                                value={receiveAmount}
                                onChange={handleTHBChange}
                                className="text-3xl font-bold bg-transparent border-none focus:ring-0 h-14 text-gray-900 placeholder:text-gray-400 w-full pl-4 pr-24"
                            />
                            <div className="absolute right-3 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                                <ThailandFlag className="w-5 h-4 rounded-sm" />
                                <span className="text-gray-900 font-bold text-sm">{cityConfig.currency}</span>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Details (Collapsible) */}
                    <div className="px-5 pb-5">
                        <button
                            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                            className="w-full flex items-center justify-between text-xs text-gray-500 hover:text-gray-700 transition-colors py-2"
                        >
                            <span className="flex items-center gap-1">
                                <Info className="w-3 h-3" /> {dict?.calculator.showDetails || 'Transaction details'}
                            </span>
                            <span>{isDetailsOpen ? (dict?.calculator.hideDetails || "Hide") : (lang === 'ru' ? 'Показать' : 'Show')}</span>
                        </button>

                        <AnimatePresence>
                            {isDetailsOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-2 pt-2 overflow-hidden"
                                >
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">{dict?.calculator.serviceFee || 'Service Fee'}</span>
                                        <span className="text-green-600 font-medium">{dict?.calculator.free || 'Free'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">{dict?.calculator.delivery || 'Delivery'}</span>
                                        <span className="text-gray-900 font-medium">{dict?.calculator.included || 'Included'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                                        <span className="text-gray-500">{dict?.calculator.totalToPay || 'Total to Pay'}</span>
                                        <span className="text-gray-900 font-bold">{amount || 0} {currentCurrency}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col items-center justify-center gap-1 text-xs text-gray-500">
                {rateUpdatedAt && (
                    <div className="flex items-center gap-1.5 text-gray-400">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                        </span>
                        <span>{lang === 'ru' ? 'Курс обновлён' : 'Rate updated'}: {formatTimeAgo(rateUpdatedAt, lang)}</span>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-600" />
                    <span>{dict?.footer.poweredBy || 'Rates powered by licensed partner'}</span>
                </div>
                <p className="text-center text-gray-400 mt-2 max-w-xs">
                    {lang === 'ru'
                        ? 'Расчёт ориентировочный. Актуальный курс уточняйте у партнёра.'
                        : 'Estimate only. Check current rate with partner.'}
                </p>
            </div>
        </div>
    );
}
