"use client";

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from '@/i18n/config';
import { ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
    currentLang: Locale;
}

const languages: Record<Locale, { flag: string; label: string; shortLabel: string }> = {
    ru: { flag: '🇷🇺', label: 'Русский', shortLabel: 'RU' },
    en: { flag: '🇺🇸', label: 'English', shortLabel: 'EN' },
    zh: { flag: '🇨🇳', label: '中文', shortLabel: 'ZH' },
};

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    const currentLanguage = languages[currentLang];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const switchLanguage = (newLang: Locale) => {
        if (newLang === currentLang) {
            setIsOpen(false);
            return;
        }

        const segments = pathname.split('/');
        if (segments[1] && i18n.locales.includes(segments[1] as Locale)) {
            segments[1] = newLang;
        } else {
            segments.splice(1, 0, newLang);
        }

        const newPath = segments.join('/') || '/';
        document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=31536000`;

        setIsOpen(false);
        router.push(newPath);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button - Ex24 style */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 flex items-center gap-1.5 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                    {currentLanguage.shortLabel}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden min-w-[160px] z-50">
                    {i18n.locales.map((locale) => {
                        const lang = languages[locale];
                        const isActive = locale === currentLang;

                        return (
                            <button
                                key={locale}
                                onClick={() => switchLanguage(locale)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                                    isActive
                                        ? 'bg-gray-100 dark:bg-gray-700'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                }`}
                            >
                                <span className="text-xl">{lang.flag}</span>
                                <span className={`font-medium ${
                                    isActive
                                        ? 'text-gray-900 dark:text-white'
                                        : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                    {lang.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
