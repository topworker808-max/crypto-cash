"use client";

import { Button } from "@/components/ui/button";
import { CityConfig } from "@/config/locations";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface StickyOrderButtonProps {
    cityConfig: CityConfig;
}

export function StickyOrderButton({ cityConfig }: StickyOrderButtonProps) {
    const handleOrderClick = () => {
        const link = cityConfig.affiliateLink || "https://qr.ex24.pro/pattayahelper";
        window.open(link, "_blank");
    };

    return (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-50 flex justify-center pointer-events-none">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="w-full max-w-md pointer-events-auto"
            >
                <Button
                    onClick={handleOrderClick}
                    size="lg"
                    className="w-full h-14 text-lg font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse hover:animate-none bg-emerald-500 hover:bg-emerald-400 text-black border-none"
                >
                    <Send className="w-5 h-5 mr-2" />
                    Order Delivery in {cityConfig.displayName}
                </Button>
            </motion.div>
        </div>
    );
}
