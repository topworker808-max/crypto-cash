import { unstable_cache } from 'next/cache';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=thb';
const FALLBACK_RATE = 33.50;

interface CoinGeckoResponse {
    tether: {
        thb: number;
    };
}

export const getLiveRate = unstable_cache(
    async (): Promise<number> => {
        try {
            console.log('Fetching live USDT/THB rate...');
            const response = await fetch(COINGECKO_API_URL, {
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
            return FALLBACK_RATE;
        }
    },
    ['usdt-thb-rate'],
    { revalidate: 60 }
);
