export function Logo({ className = "h-10" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 240 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Yellow circle with arrows */}
            <g>
                {/* Yellow circle */}
                <circle cx="25" cy="25" r="18" fill="#FFD528"/>

                {/* Circular arrows */}
                <path
                    d="M25 7C15.059 7 7 15.059 7 25s8.059 18 18 18 18-8.059 18-18S34.941 7 25 7z"
                    stroke="#1a1a1a"
                    strokeWidth="3.5"
                    fill="none"
                />

                {/* Top-right arrow */}
                <path
                    d="M38 12l4-4m0 0l-4-4m4 4h-8"
                    stroke="#1a1a1a"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Bottom-left arrow */}
                <path
                    d="M12 38l-4 4m0 0l4 4m-4-4h8"
                    stroke="#1a1a1a"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Inner rotating arrows */}
                <path
                    d="M32 18c-1.5-2.5-4.5-4-7.5-4-5 0-9 4-9 9m4.5 9c1.5 2.5 4.5 4 7.5 4 5 0 9-4 9-9"
                    stroke="#1a1a1a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M32 18l-3 1.5M32 18l1.5-3"
                    stroke="#1a1a1a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18 32l3-1.5M18 32l-1.5 3"
                    stroke="#1a1a1a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>

            {/* Text "Crypto2Baht" */}
            <text
                x="55"
                y="34"
                className="fill-gray-900 dark:fill-white"
                style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
            >
                Crypto2Baht
            </text>
        </svg>
    );
}

export function LogoIcon({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Yellow circle */}
            <circle cx="25" cy="25" r="18" fill="#FFD528"/>

            {/* Outer circle with arrows */}
            <path
                d="M25 7C15.059 7 7 15.059 7 25s8.059 18 18 18 18-8.059 18-18S34.941 7 25 7z"
                stroke="#1a1a1a"
                strokeWidth="3.5"
                fill="none"
            />

            {/* Top-right arrow */}
            <path
                d="M38 12l4-4m0 0l-4-4m4 4h-8"
                stroke="#1a1a1a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Bottom-left arrow */}
            <path
                d="M12 38l-4 4m0 0l4 4m-4-4h8"
                stroke="#1a1a1a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Inner rotating arrows */}
            <path
                d="M32 18c-1.5-2.5-4.5-4-7.5-4-5 0-9 4-9 9m4.5 9c1.5 2.5 4.5 4 7.5 4 5 0 9-4 9-9"
                stroke="#1a1a1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M32 18l-3 1.5M32 18l1.5-3"
                stroke="#1a1a1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18 32l3-1.5M18 32l-1.5 3"
                stroke="#1a1a1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
