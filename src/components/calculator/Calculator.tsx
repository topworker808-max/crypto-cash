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
        <Card className="w-full bg-card/50 backdrop-blur-sm border-primary/20 shadow-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                    <ArrowRightLeft className="w-5 h-5" />
                    Exchange Calculator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Input Section */}
                <div className="space-y-2">
                    <Label htmlFor="usdt-amount" className="text-muted-foreground flex items-center gap-2">
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
                            className="text-lg font-mono bg-background/50 border-input focus:ring-primary h-12"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                            USDT
                        </div>
                    </div>
                </div>

                {/* Output Section - Dominant Element */}
                <div className="space-y-2 p-4 rounded-xl bg-primary/10 border border-primary/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <Label className="text-primary/80 font-medium flex items-center gap-2">
                        <Banknote className="w-4 h-4" /> You Receive ({cityConfig.currency})
                    </Label>
                    <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400 tracking-tight mt-1">
                        {receiveAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                        })}
                        <span className="text-xl sm:text-2xl ml-2 text-primary/70 font-normal">
                            {cityConfig.currency}
                        </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                        Current Rate: 1 USDT ≈ {rate.toFixed(2)} {cityConfig.currency}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
