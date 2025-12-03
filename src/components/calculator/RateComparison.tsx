"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CityConfig } from "@/config/locations";
import { Check, X } from "lucide-react";

interface RateComparisonProps {
    cityConfig: CityConfig;
    amount: number;
    rate: number;
}

export function RateComparison({ cityConfig, amount, rate }: RateComparisonProps) {
    // Simulate rates
    const bankRate = rate * 0.97; // 3% lower
    const atmRate = rate * 0.95;  // 5% lower

    const cryptoCashAmount = amount * rate;
    const bankAmount = amount * bankRate;
    const atmAmount = amount * atmRate;

    const savings = cryptoCashAmount - bankAmount;

    return (
        <Card className="w-full bg-[#242936] border-none shadow-xl rounded-2xl overflow-hidden mt-6">
            <CardContent className="p-0">
                <div className="p-4 bg-[#1A1F2B] border-b border-white/5">
                    <h3 className="text-white font-semibold text-center">Why exchange USDT?</h3>
                </div>

                <div className="divide-y divide-white/5">
                    {/* Bank Row */}
                    <div className="flex items-center justify-between p-4 opacity-70">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                <X className="w-4 h-4 text-red-500" />
                            </div>
                            <div className="text-sm text-gray-400">Thai Banks</div>
                        </div>
                        <div className="text-right">
                            <div className="text-white font-medium">
                                {bankAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}
                            </div>
                            <div className="text-xs text-red-400">-3% Rate</div>
                        </div>
                    </div>

                    {/* ATM Row */}
                    <div className="flex items-center justify-between p-4 opacity-70">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                <X className="w-4 h-4 text-red-500" />
                            </div>
                            <div className="text-sm text-gray-400">ATM Withdrawal</div>
                        </div>
                        <div className="text-right">
                            <div className="text-white font-medium">
                                {atmAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}
                            </div>
                            <div className="text-xs text-red-400">-5% + Fees</div>
                        </div>
                    </div>

                    {/* CryptoCash Row (Highlighted) */}
                    <div className="flex items-center justify-between p-4 bg-green-500/5 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Check className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="text-sm text-white font-bold">CryptoCash</div>
                        </div>
                        <div className="text-right">
                            <div className="text-green-400 font-bold text-lg">
                                {cryptoCashAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}
                            </div>
                            {amount > 0 && (
                                <div className="text-xs text-green-500 font-medium">
                                    Save +{savings.toLocaleString(undefined, { maximumFractionDigits: 0 })} {cityConfig.currency}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
