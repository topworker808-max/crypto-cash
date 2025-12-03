import { notFound } from 'next/navigation';
import { locations } from '@/config/locations';
import { Metadata } from 'next';
import { CityPageContent } from '@/components/city/CityPageContent';

interface CityPageProps {
    params: {
        city: string;
    };
}

// 1. Generate Static Params for SSG (SEO + Performance)
export async function generateStaticParams() {
    return locations.map((loc) => ({
        city: loc.slug,
    }));
}

// 2. Dynamic Metadata for SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
    const citySlug = params.city;
    const location = locations.find((loc) => loc.slug === citySlug);

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

// 3. The Page Component (Server Side)
export default function CityPage({ params }: CityPageProps) {
    const citySlug = params.city;
    const location = locations.find((loc) => loc.slug === citySlug);

    if (!location) {
        notFound();
    }

    return <CityPageContent location={location} />;
}
