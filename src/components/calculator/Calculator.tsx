"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CityConfig } from "@/config/locations";
import { BASE_EXCHANGE_RATE } from "@/lib/constants";
import { PresetButtons } from "./PresetButtons";
import { ArrowRightLeft, Banknote, Wallet } from "lucide-react";

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
        <Card className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 shadow-xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-white">
                    <ArrowRightLeft className="w-5 h-5" />
                    Exchange Calculator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Input Section */}
                <div className="space-y-2">
                    <Label htmlFor="usdt-amount" className="text-zinc-400 flex items-center gap-2">
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
                            className="text-lg font-mono bg-zinc-950 border-zinc-800 focus:ring-white h-12 text-white placeholder:text-zinc-600"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-500">
                            USDT
                        </div>
                    </div>
                </div>

                {/* Output Section - Dominant Element */}
                <div className="space-y-2 p-4 rounded-xl bg-zinc-950 border border-zinc-800 relative overflow-hidden">
                    <Label className="text-zinc-400 font-medium flex items-center gap-2">
                        <Banknote className="w-4 h-4" /> You Receive ({cityConfig.currency})
                    </Label>
                    <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                        {receiveAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                        })}
                        <span className="text-xl sm:text-2xl ml-2 text-zinc-500 font-normal">
                            {cityConfig.currency}
                        </span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-2">
                        Current Rate: 1 USDT ≈ {rate.toFixed(2)} {cityConfig.currency}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
