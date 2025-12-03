# Project: CryptoCash - Multi-Location USDT Exchange Calculator

## 1. Core Philosophy & Goals
- **Type:** Lead Generation Web App (PWA).
- **Goal:** Drive traffic to the affiliate partner (ex24) via a high-utility calculator tool.
- **Vibe:** "Set and Forget". The code must be robust, requiring zero maintenance.
- **Scalability:** The app is NOT limited to Pattaya. It supports multiple locations (Phuket, Bangkok, Samui, etc.) via a configuration file.
- **Target Audience:** Russian-speaking and English-speaking expats/tourists in Thailand (and potentially other countries later).

## 2. Tech Stack (Strict)
- **Framework:** Next.js 14+ (App Router).
- **Styling:** Tailwind CSS + Shadcn UI (for accessible, premium components).
- **Language:** TypeScript (Strict mode).
- **Icons:** Lucide React.
- **Animation:** Framer Motion (micro-interactions for "premium feel").
- **Deployment:** Vercel (Edge Functions preferred for speed).

## 3. Architecture & Data Flow
### A. The "Config-First" Approach
Do NOT hardcode city names or rates in components.
Create a master config file (`@/config/locations.ts`) containing:
- **Slug:** (e.g., 'pattaya', 'phuket') - used for SEO URLs.
- **Display Name:** (e.g., "Pattaya", "Phuket").
- **Currency:** (THB, IDR, etc. - for future expansion).
- **Base Rate Modifier:** Ability to slightly adjust rate per city if needed.
- **Affiliate Link:** Specific link or source tag per city (fallback to default if unique link is missing).

### B. Routing Strategy (Crucial for SEO)
- `/` -> Landing page with location selector.
- `/[city]` -> The Calculator pre-configured for that city (e.g., `website.com/phuket`).
- The content (H1 titles, meta descriptions) must dynamically inject the City Name.

## 4. Feature Requirements
1.  **Bilingual Support (RU/EN):**
    - Auto-detect language.
    - Persistent toggle (saved in local storage).
    - All text strings must be in a `dictionaries` file, keyed by language.
2.  **The Calculator:**
    - Real-time conversion.
    - "Smart Inputs": Presets buttons (100, 500, 1000, 5000 USDT).
    - **Visual Hierarchy:** The "You Receive" amount must be the dominant visual element (Green/Gold).
3.  **Conversion Funnel:**
    - Sticky "Order Delivery" button on mobile.
    - Trust badges dynamic to the location (e.g., "Courier in [City Name]").

## 5. Coding Standards (Vibe Coding Instructions)
- **Chunking:** When writing code, break tasks into small, testable components.
- **DRY (Don't Repeat Yourself):** Use reusable UI components for the Calculator Card, Buttons, and Inputs.
- **SEO First:** Every page must include `generateMetadata` using the City Name and localized keywords.
- **Error Handling:** Fail gracefully. If a rate API fails (if we add one later), fallback to a hardcoded safe constant.

## 6. Design Aesthetic
- **Theme:** Dark Mode by default. "Cyberpunk Finance" or "Premium Dark".
- **Colors:** Deep background (#0f172a), Neon accents for actions (#10b981), White text.
- **Responsiveness:** Mobile-first. Assume 90% of users are on iPhone/Android.

## 7. Future-Proofing
- The structure must allow adding a new country (e.g., Bali/Indonesia) by simply adding a new entry to the `locations.ts` config, without rewriting component logic.