"use client";

import { Button } from "@/components/ui/button";
import { CityConfig } from "@/config/locations";
import { ArrowRight } from "lucide-react";
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
                    className="w-full h-14 text-lg font-bold uppercase tracking-wide bg-white hover:bg-gray-100 text-[#1A1F2B] border-none rounded-2xl shadow-lg transition-all duration-300"
                >
                    <span className="mr-2">CONTINUE TO EXCHANGE</span>
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </motion.div>
        </div>
    );
}
