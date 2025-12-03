"use client";

import { Button } from "@/components/ui/button";
import { CityConfig } from "@/config/locations";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface StickyActionBtnProps {
    cityConfig: CityConfig;
}

export function StickyActionBtn({ cityConfig }: StickyActionBtnProps) {
    const handleOrderClick = () => {
        const link = cityConfig.affiliateLink || "https://qr.ex24.pro/pattayahelper";
        window.open(link, "_blank");
    };

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 p-4 bg-gradient-to-t from-background via-background/90 to-transparent pb-6">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="w-full max-w-md mx-auto"
            >
                <Button
                    onClick={handleOrderClick}
                    size="lg"
                    className="w-full h-16 text-xl font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-pulse hover:animate-none bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-none rounded-xl"
                >
                    <Send className="w-6 h-6 mr-2" />
                    Order Cash Delivery
                </Button>
            </motion.div>
        </div>
    );
}
