import { unstable_cache } from 'next/cache';

const COINGECKO_USDT_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=thb';
const COINGECKO_RUB_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=rub';
const FALLBACK_USDT_RATE = 33.50;
const FALLBACK_RUB_RATE = 0.38; // ~2.6 RUB per 1 THB

interface CoinGeckoResponse {
    tether: {
        thb?: number;
        rub?: number;
    };
}

export interface RateData {
    rate: number;
    updatedAt: number; // Unix timestamp in ms
}

export interface AllRatesData {
    usdtRate: number;
    rubRate: number;
    updatedAt: number;
}

export const getLiveRate = unstable_cache(
    async (): Promise<number> => {
        try {
            console.log('Fetching live USDT/THB rate...');
            const response = await fetch(COINGECKO_USDT_API_URL, {
                next: { revalidate: 60 }, // Cache for 60 seconds
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`CoinGecko API error: ${response.statusText}`);
            }

            const data: CoinGeckoResponse = await response.json();

            if (!data.tether || !data.tether.thb) {
                throw new Error('Invalid data format from CoinGecko');
            }

            const rate = data.tether.thb;
            console.log(`Live Rate Fetched: ${rate} THB`);
            return rate;
        } catch (error) {
            console.error('Failed to fetch live rate:', error);
            return FALLBACK_USDT_RATE;
        }
    },
    ['usdt-thb-rate'],
    { revalidate: 60 }
);

export const getLiveRateWithTimestamp = unstable_cache(
    async (): Promise<RateData> => {
        const rate = await getLiveRate();
        return {
            rate,
            updatedAt: Date.now(),
        };
    },
    ['usdt-thb-rate-with-timestamp'],
    { revalidate: 60 }
);

// Get RUB to THB rate
// Strategy: Get USDT/RUB rate, then calculate RUB/THB = USDT/THB / USDT/RUB
export const getRubToThbRate = unstable_cache(
    async (): Promise<number> => {
        try {
            console.log('Fetching RUB/THB rate...');

            // Get USDT/RUB rate
            const response = await fetch(COINGECKO_RUB_API_URL, {
                next: { revalidate: 60 },
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`CoinGecko API error: ${response.statusText}`);
            }

            const data: CoinGeckoResponse = await response.json();

            if (!data.tether || !data.tether.rub) {
                throw new Error('Invalid data format from CoinGecko');
            }

            const usdtRubRate = data.tether.rub; // e.g., 100 RUB per 1 USDT
            const usdtThbRate = await getLiveRate(); // e.g., 34 THB per 1 USDT

            // Calculate RUB/THB = THB/USDT / RUB/USDT = (1/usdtThbRate) / (1/usdtRubRate) = usdtRubRate / usdtThbRate...
            // Actually: 1 RUB = X THB, where X = usdtThbRate / usdtRubRate
            const rubThbRate = usdtThbRate / usdtRubRate;

            console.log(`RUB/THB Rate: ${rubThbRate.toFixed(4)} (USDT/RUB: ${usdtRubRate}, USDT/THB: ${usdtThbRate})`);
            return rubThbRate;
        } catch (error) {
            console.error('Failed to fetch RUB rate:', error);
            return FALLBACK_RUB_RATE;
        }
    },
    ['rub-thb-rate'],
    { revalidate: 60 }
);

// Get all rates at once
export const getAllRates = unstable_cache(
    async (): Promise<AllRatesData> => {
        const [usdtRate, rubRate] = await Promise.all([
            getLiveRate(),
            getRubToThbRate(),
        ]);

        return {
            usdtRate,
            rubRate,
            updatedAt: Date.now(),
        };
    },
    ['all-rates'],
    { revalidate: 60 }
);
