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
        <div className="fixed bottom-0 left-0 w-full z-50 p-4 bg-gradient-to-t from-background via-background/95 to-transparent pb-8">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="w-full max-w-md mx-auto"
            >
                <Button
                    onClick={handleOrderClick}
                    size="lg"
                    className="w-full h-16 text-lg font-bold uppercase tracking-wide bg-white hover:bg-gray-100 text-[#1A1F2B] border-none rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300"
                >
                    <span className="mr-2">{ctaText}</span>
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </motion.div>
        </div>
    );
}
