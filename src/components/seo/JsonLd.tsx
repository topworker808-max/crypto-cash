import type { Dictionary } from "@/i18n/getDictionary";

interface JsonLdProps {
    dict: Dictionary;
    type: 'faq' | 'organization' | 'webpage';
    pageUrl?: string;
}

export function JsonLd({ dict, type, pageUrl }: JsonLdProps) {
    const generateFAQSchema = () => {
        const faqItems = [
            { question: dict.faq.q1, answer: dict.faq.a1 },
            { question: dict.faq.q2, answer: dict.faq.a2 },
            { question: dict.faq.q3, answer: dict.faq.a3 },
            { question: dict.faq.q4, answer: dict.faq.a4 },
            { question: dict.faq.q5, answer: dict.faq.a5 },
        ];

        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        };
    };

    const generateOrganizationSchema = () => ({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Crypto2Baht",
        "description": dict.common.tagline,
        "url": pageUrl || "https://crypto2baht.com",
        "logo": `${pageUrl || "https://crypto2baht.com"}/logo.svg`,
        "sameAs": []
    });

    const generateWebPageSchema = () => ({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": dict.meta.title,
        "description": dict.meta.description,
        "url": pageUrl,
        "isPartOf": {
            "@type": "WebSite",
            "name": "Crypto2Baht",
            "url": pageUrl?.split('/').slice(0, 3).join('/') || "https://crypto2baht.com"
        }
    });

    let schema;
    switch (type) {
        case 'faq':
            schema = generateFAQSchema();
            break;
        case 'organization':
            schema = generateOrganizationSchema();
            break;
        case 'webpage':
            schema = generateWebPageSchema();
            break;
        default:
            return null;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Компонент для HowTo schema (как обменять крипту)
export function HowToJsonLd({ dict, lang }: { dict: Dictionary; lang: string }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": dict.howItWorks.title,
        "description": lang === 'ru'
            ? "Пошаговая инструкция по обмену USDT на тайские баты через Ex24.pro"
            : "Step-by-step guide to exchange USDT to Thai Baht via Ex24.pro",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": dict.howItWorks.step1,
                "text": lang === 'ru'
                    ? "Введите сумму USDT в калькулятор и посмотрите сколько бат вы получите"
                    : "Enter USDT amount in calculator to see how much THB you will receive"
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": dict.howItWorks.step2,
                "text": lang === 'ru'
                    ? "Перейдите на сайт партнёра Ex24.pro и свяжитесь с менеджером"
                    : "Go to partner website Ex24.pro and contact the manager"
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": dict.howItWorks.step3,
                "text": lang === 'ru'
                    ? "Получите наличные курьером или в офисе Ex24"
                    : "Receive cash via courier or at Ex24 office"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Финансовый калькулятор schema
export function FinancialCalculatorJsonLd({ lang }: { lang: string }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": lang === 'ru' ? "Калькулятор USDT в баты" : "USDT to THB Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": lang === 'ru'
            ? "Онлайн калькулятор для конвертации USDT в тайские баты по актуальному курсу"
            : "Online calculator for converting USDT to Thai Baht at live rates",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
