export function RussiaFlag({ className = "w-5 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
            <rect width="640" height="160" fill="#fff"/>
            <rect y="160" width="640" height="160" fill="#0039a6"/>
            <rect y="320" width="640" height="160" fill="#d52b1e"/>
        </svg>
    );
}

export function USAFlag({ className = "w-5 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
            <rect width="640" height="480" fill="#bd3d44"/>
            <rect y="37" width="640" height="37" fill="#fff"/>
            <rect y="111" width="640" height="37" fill="#fff"/>
            <rect y="185" width="640" height="37" fill="#fff"/>
            <rect y="259" width="640" height="37" fill="#fff"/>
            <rect y="333" width="640" height="37" fill="#fff"/>
            <rect y="407" width="640" height="37" fill="#fff"/>
            <rect width="260" height="259" fill="#192f5d"/>
            <g fill="#fff">
                <g id="s18">
                    <g id="s9">
                        <g id="s5">
                            <g id="s4">
                                <path id="s" d="M22,12 L24,18 L18,15 L26,15 L20,18 Z"/>
                                <use href="#s" x="42"/>
                                <use href="#s" x="84"/>
                                <use href="#s" x="126"/>
                            </g>
                            <use href="#s" x="168"/>
                        </g>
                        <use href="#s4" x="21" y="28"/>
                    </g>
                    <use href="#s9" y="56"/>
                </g>
                <use href="#s18" y="112"/>
                <use href="#s9" y="168"/>
            </g>
        </svg>
    );
}

export function ChinaFlag({ className = "w-5 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
            <rect width="640" height="480" fill="#de2910"/>
            <g fill="#ffde00">
                <path d="M96 48l20 62-51-38h62l-51 38z"/>
                <path d="M160 24l7 22-18-13h22l-18 13z"/>
                <path d="M184 48l7 22-18-13h22l-18 13z"/>
                <path d="M184 88l7 22-18-13h22l-18 13z"/>
                <path d="M160 112l7 22-18-13h22l-18 13z"/>
            </g>
        </svg>
    );
}

export const flags = {
    ru: RussiaFlag,
    en: USAFlag,
    zh: ChinaFlag,
} as const;
