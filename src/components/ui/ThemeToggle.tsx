"use client";

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    // On mount, check for saved theme or system preference
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <button
                className="p-2.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"
                aria-label="Toggle theme"
            >
                <Sun className="w-5 h-5 text-gray-500" />
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            {theme === 'light' ? (
                <Sun className="w-5 h-5 text-amber-500" />
            ) : (
                <Moon className="w-5 h-5 text-blue-400" />
            )}
        </button>
    );
}
