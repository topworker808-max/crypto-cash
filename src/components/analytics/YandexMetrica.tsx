'use client';

import Script from 'next/script';

interface YandexMetricaProps {
    counterId: string;
}

export function YandexMetrica({ counterId }: YandexMetricaProps) {
    if (!counterId) return null;

    return (
        <>
            <Script id="yandex-metrica" strategy="afterInteractive">
                {`
                    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(${counterId}, "init", {
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true
                    });
                `}
            </Script>
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${counterId}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
}

// Helper to track goals
export function reachGoal(
    counterId: string,
    goalName: string,
    params?: Record<string, unknown>
): void {
    if (typeof window !== 'undefined' && 'ym' in window) {
        (window as typeof window & { ym: (...args: unknown[]) => void }).ym(
            Number(counterId),
            'reachGoal',
            goalName,
            params
        );
    }
}
