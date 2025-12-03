"use client";
// Landing Page for CryptoCash


import Link from 'next/link';
import { locations } from '@/config/locations';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl">
            Crypto<span className="text-primary">Cash</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure USDT to Cash Delivery in Thailand. Select your location.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link
                href={`/${loc.slug}`}
                className="group block p-8 border border-border/50 rounded-2xl bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h2 className="text-2xl font-bold text-card-foreground group-hover:text-primary text-left">
                  {loc.displayName}
                </h2>
                <p className="mt-2 text-muted-foreground text-left text-sm">
                  Exchange USDT to {loc.currency}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

