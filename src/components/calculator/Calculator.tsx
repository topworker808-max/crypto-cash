"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CityConfig } from "@/config/locations";
import { ArrowUpDown, Check, Info } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CalculatorProps {
    cityConfig: CityConfig;
    amount: number | "";
    receiveAmount: number | "";
    onAmountChange: (val: number | "") => void;
    onReceiveAmountChange: (val: number | "") => void;
    rate: number;
}

export function Calculator({ cityConfig, amount, receiveAmount, onAmountChange, onReceiveAmountChange, rate }: CalculatorProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleUSDTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "") {
            onAmountChange("");
            onReceiveAmountChange("");
            return;
        }
        const num = parseFloat(val);
        if (!isNaN(num) && num >= 0) {
            onAmountChange(num);
            onReceiveAmountChange(parseFloat((num * rate).toFixed(2)));
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
            onAmountChange(parseFloat((num / rate).toFixed(2)));
        }
    };

    return (
        <div className="space-y-4 w-full max-w-md mx-auto">
            <Card className="w-full bg-[#242936] border-none shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                    {/* Top Input: You Send */}
                    <div className="p-6 pb-4 space-y-2 relative">
                        <Label htmlFor="usdt-input" className="text-gray-400 text-sm font-medium ml-1">You send</Label>
                        <div className="relative flex items-center bg-[#1A1F2B] rounded-2xl border border-transparent focus-within:border-white/20 transition-all">
                            <Input
                                id="usdt-input"
                                type="number"
                                placeholder="0"
                                value={amount}
                                onChange={handleUSDTChange}
                                className="text-3xl font-bold bg-transparent border-none focus:ring-0 h-16 text-white placeholder:text-gray-700 w-full pl-4 pr-24"
                            />
                            <div className="absolute right-4 flex items-center gap-2 bg-[#242936] px-3 py-1.5 rounded-xl">
                                <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs">₮</span>
                                <span className="text-white font-bold">USDT</span>
                            </div>
                        </div>
                    </div>

                    {/* Toggle / Rate Divider */}
                    <div className="relative h-6 mx-6 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-px bg-[#1A1F2B]" />
                        </div>
                        <div className="relative z-10 bg-[#242936] p-2 rounded-full border border-[#1A1F2B]">
                            <ArrowUpDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                                1 USDT ≈ {rate.toFixed(2)} {cityConfig.currency}
                            </span>
                        </div>
                    </div>

                    {/* Bottom Input: You Receive */}
                    <div className="p-6 pt-4 space-y-2">
                        <Label htmlFor="thb-input" className="text-gray-400 text-sm font-medium ml-1">You receive</Label>
                        <div className="relative flex items-center bg-[#1A1F2B] rounded-2xl border border-transparent focus-within:border-white/20 transition-all">
                            <Input
                                id="thb-input"
                                type="number"
                                placeholder="0"
                                value={receiveAmount}
                                onChange={handleTHBChange}
                                className="text-3xl font-bold bg-transparent border-none focus:ring-0 h-16 text-white placeholder:text-gray-700 w-full pl-4 pr-24"
                            />
                            <div className="absolute right-4 flex items-center gap-2 bg-[#242936] px-3 py-1.5 rounded-xl">
                                <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-xs">🇹🇭</span>
                                <span className="text-white font-bold">{cityConfig.currency}</span>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Details (Collapsible) */}
                    <div className="px-6 pb-6">
                        <button
                            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                            className="w-full flex items-center justify-between text-xs text-gray-500 hover:text-gray-300 transition-colors py-2"
                        >
                            <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Transaction details</span>
                            <span>{isDetailsOpen ? "Hide" : "Show"}</span>
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
                                        <span className="text-gray-400">Service Fee</span>
                                        <span className="text-green-400 font-medium">0 USDT</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Delivery</span>
                                        <span className="text-white font-medium">Included</span>
                                    </div>
                                    <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                                        <span className="text-gray-400">Total to Pay</span>
                                        <span className="text-white font-bold">{amount || 0} USDT</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col items-center justify-center gap-1 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>Secured by Ex24.pro</span>
                </div>
                <span className="text-[10px] text-gray-700">Indicative market rate. Final rate depends on volume.</span>
            </div>
        </div>
    );
}
