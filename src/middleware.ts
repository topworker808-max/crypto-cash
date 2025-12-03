import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, isValidLocale } from '@/i18n/config';

function getLocaleFromHeaders(request: NextRequest): string {
    const acceptLanguage = request.headers.get('accept-language');
    if (!acceptLanguage) return i18n.defaultLocale;

    // Parse Accept-Language header
    const languages = acceptLanguage
        .split(',')
        .map((lang) => {
            const [code, quality = '1'] = lang.trim().split(';q=');
            return {
                code: code.split('-')[0].toLowerCase(),
                quality: parseFloat(quality),
            };
        })
        .sort((a, b) => b.quality - a.quality);

    // Find first matching locale
    for (const lang of languages) {
        if (isValidLocale(lang.code)) {
            return lang.code;
        }
    }

    return i18n.defaultLocale;
}

function getLocaleFromCookie(request: NextRequest): string | null {
    const cookie = request.cookies.get('NEXT_LOCALE');
    if (cookie && isValidLocale(cookie.value)) {
        return cookie.value;
    }
    return null;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // files with extensions
    ) {
        return NextResponse.next();
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = i18n.locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Determine locale: cookie > Accept-Language header > default (RU)
    const locale = getLocaleFromCookie(request) || getLocaleFromHeaders(request);

    // Redirect to locale-prefixed path
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;

    return NextResponse.redirect(newUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, api)
        // Skip all static files
        '/((?!_next|api|favicon.ico|og-image.png|.*\\..*).*)',
    ],
};
