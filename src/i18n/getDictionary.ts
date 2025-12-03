import type { Locale } from './config';

// Import dictionaries statically for type safety
const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    ru: () => import('./dictionaries/ru.json').then((module) => module.default),
    zh: () => import('./dictionaries/zh.json').then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
    return dictionaries[locale]();
};
