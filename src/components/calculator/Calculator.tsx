"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CityConfig } from "@/config/locations";
import { BASE_EXCHANGE_RATE } from "@/lib/constants";
import { PresetButtons } from "./PresetButtons";
import { ArrowRightLeft, Banknote, Wallet, ShieldCheck } from "lucide-react";

interface CalculatorProps {
    cityConfig: CityConfig;
}

export function Calculator({ cityConfig }: CalculatorProps) {
    const [amount, setAmount] = useState<number | "">("");
    const [receiveAmount, setReceiveAmount] = useState<number>(0);

    const rate = BASE_EXCHANGE_RATE * cityConfig.baseRateModifier;

    useEffect(() => {
        const val = typeof amount === "number" ? amount : 0;
        setReceiveAmount(val * rate);
    }, [amount, rate]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "") {
            setAmount("");
            return;
        }
        const num = parseFloat(val);
        if (!isNaN(num) && num >= 0) {
            setAmount(num);
        }
    };

    const handlePresetSelect = (val: number) => {
        setAmount(val);
    };

    return (
        <div className="space-y-4">
            <Card className="w-full bg-[#242936] border-none shadow-xl rounded-2xl">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg text-white font-medium">
                        <ArrowRightLeft className="w-5 h-5 text-gray-400" />
                        Rate Calculator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Input Section */}
                    <div className="space-y-2">
                        <Label htmlFor="usdt-amount" className="text-gray-400 flex items-center gap-2 text-sm">
                            <Wallet className="w-4 h-4" /> You Send (USDT)
                        </Label>
                        <PresetButtons onSelect={handlePresetSelect} currentAmount={typeof amount === 'number' ? amount : 0} />
                        <div className="relative">
                            <Input
                                id="usdt-amount"
                                type="number"
                                placeholder="Enter amount..."
                                value={amount}
                                onChange={handleAmountChange}
                                className="text-xl font-medium bg-[#1A1F2B] border-none focus:ring-1 focus:ring-white/20 h-14 text-white placeholder:text-gray-600 rounded-xl"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                                USDT
                            </div>
                        </div>
                    </div>

                    {/* Output Section - Hero Element */}
                    <div className="space-y-2 p-5 rounded-xl bg-[#1A1F2B] border border-white/5 relative overflow-hidden">
                        <Label className="text-gray-400 font-medium flex items-center gap-2 text-sm">
                            <Banknote className="w-4 h-4" /> You Receive ({cityConfig.currency})
                        </Label>
                        <div className="text-5xl sm:text-6xl font-bold text-white tracking-tight mt-2">
                            {receiveAmount.toLocaleString(undefined, {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                            })}
                            <span className="text-xl sm:text-2xl ml-2 text-gray-500 font-normal">
                                {cityConfig.currency}
                            </span>
                        </div>
                        <div className="text-xs text-gray-600 mt-3 flex justify-between items-center">
                            <span>Rate: 1 USDT ≈ {rate.toFixed(2)} {cityConfig.currency}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-3 h-3" />
                <span>Secured by Ex24.pro</span>
            </div>
        </div>
    );
}
