"use client";

import { useState } from 'react';
import { CityConfig } from '@/config/locations';
import { Calculator } from '@/components/calculator/Calculator';
import { RateComparison } from '@/components/calculator/RateComparison';
import { StickyActionBtn } from '@/components/conversion/StickyActionBtn';
import { BASE_EXCHANGE_RATE } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, MessageCircle, Banknote, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';

interface CityPageContentProps {
    location: CityConfig;
}

export function CityPageContent({ location }: CityPageContentProps) {
    const [amount, setAmount] = useState<number | "">("");
    const [receiveAmount, setReceiveAmount] = useState<number | "">("");
    const rate = BASE_EXCHANGE_RATE * location.baseRateModifier;

    return (
        <main className="flex min-h-screen flex-col items-center justify-start pt-12 p-4 pb-40 bg-background text-foreground relative overflow-hidden">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center space-y-8 relative z-10"
            >
                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                        CryptoCash <span className="text-gray-500">{location.displayName}</span>
                    </h1>
                    <p className="text-base text-gray-400">
                        Pro Banking Calculator. USDT to {location.currency}.
                    </p>
                </div>

                <Calculator
                    cityConfig={location}
                    amount={amount}
                    receiveAmount={receiveAmount}
                    onAmountChange={setAmount}
                    onReceiveAmountChange={setReceiveAmount}
                />

                {/* Rate Comparison Widget */}
                <RateComparison
                    cityConfig={location}
                    amount={typeof amount === 'number' ? amount : 1000}
                    rate={rate}
                />

                {/* SEO Content Block: Why Exchange? */}
                <div className="pt-6 space-y-4 text-left">
                    <h3 className="text-lg font-semibold text-white text-center">Why exchange USDT instead of Cash?</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start gap-3 p-4 bg-[#242936] rounded-xl border border-white/5">
                            <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-white">Better Rate than Banks</h4>
                                <p className="text-xs text-gray-400">Banks charge 3-5% hidden fees. We offer near-market rates.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-[#242936] rounded-xl border border-white/5">
                            <Wallet className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-white">No ATM Fees</h4>
                                <p className="text-xs text-gray-400">Save 220 THB on every withdrawal. No limits on amount.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-[#242936] rounded-xl border border-white/5">
                            <ShieldCheck className="w-5 h-5 text-purple-500 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-white">Safe Delivery to Condo</h4>
                                <p className="text-xs text-gray-400">Don't carry cash around. We deliver securely to your lobby.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How it Works Section */}
                <div className="pt-8 space-y-6">
                    <h3 className="text-lg font-semibold text-white">How to get Cash in {location.displayName}?</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-[#242936] flex items-center justify-center text-white">
                                <CalcIcon className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-gray-400">Calculate exact amount</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-[#242936] flex items-center justify-center text-white">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-gray-400">Open official chat</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-[#242936] flex items-center justify-center text-white">
                                <Banknote className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-gray-400">Courier delivers cash</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <StickyActionBtn cityConfig={location} receiveAmount={receiveAmount} />
        </main>
    );
}
