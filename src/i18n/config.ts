export const i18n = {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'zh'],  // Order: Russian first, then English, then Chinese
} as const;

export type Locale = (typeof i18n)['locales'][number];

export function isValidLocale(locale: string): locale is Locale {
    return i18n.locales.includes(locale as Locale);
}
