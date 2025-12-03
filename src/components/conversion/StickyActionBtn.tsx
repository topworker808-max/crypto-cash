"use client";

import { Button } from "@/components/ui/button";
import { CityConfig } from "@/config/locations";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { buildAffiliateLink, trackAffiliateClick } from "@/lib/tracking";
import type { Dictionary } from "@/i18n/getDictionary";

interface StickyActionBtnProps {
    cityConfig: CityConfig;
    receiveAmount: number | "";
    lang?: string;
    dict?: Dictionary;
}

export function StickyActionBtn({ cityConfig, receiveAmount, lang = 'en', dict }: StickyActionBtnProps) {
    const handleOrderClick = () => {
        const baseLink = cityConfig.affiliateLink || "https://qr.ex24.pro/pattayahelper";

        const trackingParams = {
            source: 'cryptocash',
            medium: 'sticky_button',
            campaign: cityConfig.slug,
            content: lang,
        };

        // Track the click
        trackAffiliateClick(trackingParams);

        // Open link with UTM parameters
        const link = buildAffiliateLink(baseLink, trackingParams);
        window.open(link, "_blank");
    };

    const displayAmount = receiveAmount ? receiveAmount.toLocaleString() : "";

    // Build CTA text
    let ctaText: string;
    if (displayAmount && dict?.cta.getAmount) {
        ctaText = dict.cta.getAmount
            .replace('{amount}', displayAmount)
            .replace('{currency}', cityConfig.currency);
    } else if (dict?.cta.getCash) {
        ctaText = dict.cta.getCash;
    } else {
        ctaText = displayAmount ? `GET ${displayAmount} ${cityConfig.currency} NOW` : 'GET CASH NOW';
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 p-4 bg-gradient-to-t from-[#E6E6E6] via-[#E6E6E6]/95 to-transparent pb-8">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="w-full max-w-md mx-auto space-y-2"
            >
                <p className="text-center text-sm text-gray-600">
                    {dict?.cta.readyToExchange || "Ready to exchange?"}
                </p>
                <Button
                    onClick={handleOrderClick}
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-[#FFD528] hover:bg-[#E5BF24] text-gray-900 border-none rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <span className="mr-2">{ctaText}</span>
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </motion.div>
        </div>
    );
}
