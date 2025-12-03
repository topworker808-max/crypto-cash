'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
    measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
    if (!measurementId) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${measurementId}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
}

// Helper to track custom events
export function trackEvent(
    action: string,
    category: string,
    label?: string,
    value?: number
): void {
    if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
}
