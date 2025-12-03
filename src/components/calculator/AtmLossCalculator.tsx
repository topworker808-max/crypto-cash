"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CityConfig } from "@/config/locations";
import { AlertTriangle, CreditCard, TrendingDown, Percent, Minus } from "lucide-react";
import type { Dictionary } from "@/i18n/getDictionary";

interface AtmLossCalculatorProps {
    cityConfig: CityConfig;
    amount: number;
    rate: number;
    dict?: Dictionary;
}

export function AtmLossCalculator({ cityConfig, amount, rate, dict }: AtmLossCalculatorProps) {
    // ATM fees and conversion loss estimates
    const ATM_FEE_THB = 220; // Thai ATM fee per withdrawal
    const ATM_LIMIT_THB = 25000; // Max per withdrawal
    const BANK_CONVERSION_LOSS = 0.04; // 4% typical bank spread

    const amountUSD = amount; // Assuming USDT ~ USD
    const idealTHB = amount * rate;

    // How many ATM withdrawals needed
    const withdrawalsNeeded = Math.ceil(idealTHB / ATM_LIMIT_THB);
    const totalAtmFees = withdrawalsNeeded * ATM_FEE_THB;

    // Bank conversion loss (on the USD->THB spread)
    const conversionLoss = idealTHB * BANK_CONVERSION_LOSS;

    // Total loss
    const totalLoss = totalAtmFees + conversionLoss;

    // What you actually get via ATM
    const actualReceive = idealTHB - totalLoss;

    // Savings with CryptoCash
    const savings = totalLoss;

    // Determine language
    const lang = dict?.landing.pattaya === 'Паттайя' ? 'ru' : 'en';

    const labels = {
        title: lang === 'ru' ? 'Потери на ATM' : 'ATM Losses',
        bankFee: lang === 'ru' ? 'Комиссия ATM' : 'ATM Fees',
        perWithdrawal: lang === 'ru' ? 'за снятие' : 'per withdrawal',
        withdrawals: lang === 'ru' ? 'снятий' : 'withdrawals',
        conversionLoss: lang === 'ru' ? 'Потеря на курсе' : 'Conversion Loss',
        bankSpread: lang === 'ru' ? 'спред банка' : 'bank spread',
        totalLoss: lang === 'ru' ? 'Итого потери' : 'Total Loss',
        youReceive: lang === 'ru' ? 'Получите через ATM' : 'You receive via ATM',
        savingsText: lang === 'ru' ? 'Экономия с CryptoCash' : 'Save with CryptoCash',
    };

    if (amount < 100) {
        return null;
    }

    return (
        <Card className="w-full bg-white dark:bg-[#1a1f2e] border-none shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h3 className="font-semibold">{labels.title}</h3>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {lang === 'ru'
                        ? `При снятии ${amountUSD.toLocaleString()} USD через банковскую карту:`
                        : `When withdrawing ${amountUSD.toLocaleString()} USD via bank card:`}
                </div>

                <div className="space-y-3">
                    {/* ATM Fees */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span>{labels.bankFee}</span>
                            <span className="text-xs text-gray-400">
                                ({withdrawalsNeeded} {labels.withdrawals} x {ATM_FEE_THB} {cityConfig.currency})
                            </span>
                        </div>
                        <span className="text-red-600 dark:text-red-400 font-medium">-{totalAtmFees.toLocaleString()} {cityConfig.currency}</span>
                    </div>

                    {/* Conversion Loss */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Percent className="w-4 h-4 text-gray-400" />
                            <span>{labels.conversionLoss}</span>
                            <span className="text-xs text-gray-400">
                                (~{(BANK_CONVERSION_LOSS * 100).toFixed(0)}% {labels.bankSpread})
                            </span>
                        </div>
                        <span className="text-red-600 dark:text-red-400 font-medium">-{conversionLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-[#333a4d] pt-3">
                        {/* Total Loss */}
                        <div className="flex items-center justify-between text-sm mb-2">
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                                <TrendingDown className="w-4 h-4 text-red-500" />
                                <span>{labels.totalLoss}</span>
                            </div>
                            <span className="text-red-600 dark:text-red-400 font-bold">-{totalLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}</span>
                        </div>

                        {/* What you receive */}
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{labels.youReceive}</span>
                            <span className="line-through">{actualReceive.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}</span>
                        </div>
                    </div>
                </div>

                {/* Savings highlight */}
                <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg p-3 mt-4">
                    <div className="flex items-center justify-between">
                        <span className="text-green-800 dark:text-green-400 font-medium text-sm">{labels.savingsText}</span>
                        <span className="text-green-700 dark:text-green-400 font-bold text-lg">+{savings.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
