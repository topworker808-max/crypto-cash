"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CityConfig } from "@/config/locations";
import { Check, X } from "lucide-react";
import type { Dictionary } from "@/i18n/getDictionary";

interface RateComparisonProps {
    cityConfig: CityConfig;
    amount: number;
    rate: number;
    dict?: Dictionary;
}

export function RateComparison({ cityConfig, amount, rate, dict }: RateComparisonProps) {
    // Simulate rates
    const bankRate = rate * 0.97; // 3% lower
    const atmRate = rate * 0.95;  // 5% lower

    const cryptoCashAmount = amount * rate;
    const bankAmount = amount * bankRate;
    const atmAmount = amount * atmRate;

    const savings = cryptoCashAmount - bankAmount;

    const savingsText = dict?.comparison.savings
        .replace('{amount}', savings.toLocaleString(undefined, { maximumFractionDigits: 0 }))
        .replace('{currency}', cityConfig.currency) || `Save +${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${cityConfig.currency}`;

    return (
        <Card className="w-full bg-white border-none shadow-lg rounded-xl overflow-hidden mt-6">
            <CardContent className="p-0">
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <h3 className="text-gray-900 font-semibold text-center">{dict?.comparison.title || 'Compare Exchange Options'}</h3>
                </div>

                <div className="divide-y divide-gray-100">
                    {/* Bank Row */}
                    <div className="flex items-center justify-between p-4 opacity-80">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                                <X className="w-4 h-4 text-red-500" />
                            </div>
                            <div className="text-sm text-gray-600">{dict?.comparison.thaiBanks || 'Thai Banks'}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-gray-900 font-medium">
                                {bankAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}
                            </div>
                            <div className="text-xs text-red-500">-3%</div>
                        </div>
                    </div>

                    {/* ATM Row */}
                    <div className="flex items-center justify-between p-4 opacity-80">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                                <X className="w-4 h-4 text-red-500" />
                            </div>
                            <div className="text-sm text-gray-600">{dict?.comparison.atmWithdrawal || 'ATM Withdrawal'}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-gray-900 font-medium">
                                {atmAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}
                            </div>
                            <div className="text-xs text-red-500">-5% + 220 THB</div>
                        </div>
                    </div>

                    {/* CryptoCash Row (Highlighted) */}
                    <div className="flex items-center justify-between p-4 bg-[#FFD528]/10 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFD528]" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#FFD528]/20 flex items-center justify-center">
                                <Check className="w-4 h-4 text-[#C9A820]" />
                            </div>
                            <div className="text-sm text-gray-900 font-bold">{dict?.comparison.cryptoCash || 'CryptoCash'}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-gray-900 font-bold text-lg">
                                {cryptoCashAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}
                            </div>
                            {amount > 0 && (
                                <div className="text-xs text-green-600 font-medium">
                                    {savingsText}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
