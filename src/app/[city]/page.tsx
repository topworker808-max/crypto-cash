import { notFound } from 'next/navigation';
import { locations } from '@/config/locations';
import { Metadata } from 'next';
import { CityPageContent } from '@/components/city/CityPageContent';
import { getLiveRate } from '@/lib/rate-service';

interface CityPageProps {
    params: Promise<{
        city: string;
    }>;
}

// 1. Generate Static Params for SSG
export async function generateStaticParams() {
    return locations.map((loc) => ({
        city: loc.slug,
    }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
    const { city } = await params;
    const location = locations.find((loc) => loc.slug === city);

    if (!location) {
        return {
            title: 'Location Not Found',
        };
    }

    return {
        title: `USDT Exchange in ${location.displayName} | CryptoCash`,
        description: `Best rates for USDT to ${location.currency} in ${location.displayName}. Fast, secure, and reliable delivery.`,
    };
}

// 3. Page Component
export default async function CityPage({ params }: CityPageProps) {
    const { city } = await params;
    const location = locations.find((loc) => loc.slug === city);

    if (!location) {
        notFound();
    }

    // Fetch live rate
    const liveRate = await getLiveRate();

    return <CityPageContent location={location} initialRate={liveRate} />;
}
