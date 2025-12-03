export interface BlogPost {
    slug: string;
    publishedAt: string;
    updatedAt?: string;
}

// Список статей блога
export const blogPosts: BlogPost[] = [
    {
        slug: 'how-to-exchange-usdt-thailand',
        publishedAt: '2025-01-15',
    },
    {
        slug: 'atm-fees-thailand',
        publishedAt: '2025-01-16',
    },
    {
        slug: 'best-way-to-get-cash-thailand',
        publishedAt: '2025-01-17',
    },
];
