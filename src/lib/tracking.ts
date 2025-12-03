export interface TrackingParams {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
}

const DEFAULT_SOURCE = 'cryptocash';

/**
 * Build affiliate link with UTM parameters for tracking
 */
export function buildAffiliateLink(
    baseLink: string,
    params: TrackingParams = {}
): string {
    const {
        source = DEFAULT_SOURCE,
        medium = 'calculator',
        campaign = 'general',
        content = 'en',
    } = params;

    const url = new URL(baseLink);

    url.searchParams.set('utm_source', source);
    url.searchParams.set('utm_medium', medium);
    url.searchParams.set('utm_campaign', campaign);
    url.searchParams.set('utm_content', content);

    return url.toString();
}

/**
 * Track affiliate click event (for analytics)
 */
export function trackAffiliateClick(params: TrackingParams): void {
    // Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', 'affiliate_click', {
            event_category: 'conversion',
            event_label: params.campaign,
            utm_source: params.source,
            utm_medium: params.medium,
            utm_campaign: params.campaign,
            utm_content: params.content,
        });
    }

    // Yandex Metrica
    if (typeof window !== 'undefined' && 'ym' in window) {
        (window as typeof window & { ym: (...args: unknown[]) => void }).ym(
            Number(process.env.NEXT_PUBLIC_YM_ID),
            'reachGoal',
            'affiliate_click',
            params
        );
    }
}
