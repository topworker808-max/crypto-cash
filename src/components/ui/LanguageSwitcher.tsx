"use client";

import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
    currentLang: Locale;
}

const langLabels: Record<Locale, string> = {
    ru: 'RU',
    en: 'EN',
};

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
    const pathname = usePathname();
    const router = useRouter();

    const switchLanguage = (newLang: Locale) => {
        if (newLang === currentLang) return;

        // Replace current lang prefix with new lang
        const segments = pathname.split('/');
        if (segments[1] && i18n.locales.includes(segments[1] as Locale)) {
            segments[1] = newLang;
        } else {
            segments.splice(1, 0, newLang);
        }

        const newPath = segments.join('/') || '/';

        // Set cookie for persistence
        document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=31536000`;

        router.push(newPath);
    };

    return (
        <div className="flex items-center gap-1 bg-zinc-800/50 rounded-lg p-1">
            {i18n.locales.map((locale) => (
                <button
                    key={locale}
                    onClick={() => switchLanguage(locale)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        locale === currentLang
                            ? 'bg-white text-black'
                            : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    {langLabels[locale]}
                </button>
            ))}
        </div>
    );
}
