"use client";

import { CityConfig } from '@/config/locations';
import { Calculator } from '@/components/calculator/Calculator';
import { StickyActionBtn } from '@/components/conversion/StickyActionBtn';
import { motion } from 'framer-motion';

interface CityPageContentProps {
    location: CityConfig;
}

export function CityPageContent({ location }: CityPageContentProps) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 pb-32 bg-background text-foreground relative overflow-hidden">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full text-center space-y-8 relative z-10"
            >
                <div className="space-y-2">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
                        CryptoCash <span className="text-zinc-500">{location.displayName}</span>
                    </h1>
                    <p className="text-lg text-zinc-400">
                        Fastest USDT to {location.currency} delivery.
                    </p>
                </div>

                <Calculator cityConfig={location} />
            </motion.div>

            <StickyActionBtn cityConfig={location} />
        </main>
    );
}
