export interface CityConfig {
    slug: string;
    displayName: string;
    currency: string;
    baseRateModifier: number; // e.g., 1.0 = standard, 1.01 = +1%
    affiliateLink?: string;
}

export const locations: CityConfig[] = [
    {
        slug: 'pattaya',
        displayName: 'Pattaya',
        currency: 'THB',
        baseRateModifier: 1.0,
        affiliateLink: 'https://qr.ex24.pro/pattayahelper', // Updated
    },
    {
        slug: 'phuket',
        displayName: 'Phuket',
        currency: 'THB',
        baseRateModifier: 1.0,
        affiliateLink: 'https://qr.ex24.pro/pattayahelper', // Updated
    },
];

export const DEFAULT_LOCATION = locations[0];
