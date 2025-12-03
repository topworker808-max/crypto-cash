# CryptoCash - Project Status

## Цель проекта
Lead-generation сайт для affiliate партнёра Ex24.pro (обмен крипты на кэш в Таиланде).
**Мы НЕ обменник** — мы информационный ресурс, который направляет пользователей к партнёру.

## Целевая аудитория
- **Основная:** Русскоязычные экспаты/туристы в Таиланде
- **Вторичная:** Англоязычные туристы
- **Ищут:** обмен крипты на кэш, лучший курс, альтернативу ATM

## Партнёрская ссылка
```
https://qr.ex24.pro/pattayahelper
```
UTM параметры добавляются автоматически через `src/lib/tracking.ts`

---

## Что сделано

### Sprint 1: SEO + Аналитика
- [x] `src/app/sitemap.ts` — динамическая sitemap
- [x] `src/app/robots.ts` — robots.txt
- [x] `src/lib/tracking.ts` — UTM tracking для партнёрских ссылок
- [x] `src/components/analytics/GoogleAnalytics.tsx` — GA4 (нужен GA_ID)
- [x] `src/components/analytics/YandexMetrica.tsx` — Яндекс Метрика (нужен YM_ID)
- [x] JSON-LD structured data в layout.tsx

### Sprint 2: Двуязычность (RU/EN)
- [x] `src/i18n/config.ts` — конфигурация языков
- [x] `src/i18n/dictionaries/ru.json` — русский словарь
- [x] `src/i18n/dictionaries/en.json` — английский словарь
- [x] `src/middleware.ts` — определение языка пользователя
- [x] Роутинг `[lang]/[city]` — /ru/pattaya, /en/phuket
- [x] `src/components/ui/LanguageSwitcher.tsx` — переключатель RU/EN

### Sprint 3: Редизайн под Ex24
- [x] Светлая тема (#E6E6E6 фон)
- [x] Жёлтый акцент (#FFD528)
- [x] Белые карточки с тенями
- [x] Все компоненты обновлены

### Sprint 4: UX + Trust (completed)
- [x] Preset кнопки сумм (100/500/1k/5k USDT) в калькуляторе
- [x] FAQ секция с переводами RU/EN
- [x] Мягкий CTA: "Готов обменять? Перейти к партнёру"
- [x] Индикатор "Курс обновлён X мин назад"
- [x] ATM Loss Calculator — показывает потери при ATM снятии

### Текущие компоненты
- `Calculator.tsx` — калькулятор USDT → THB (двусторонний) + preset кнопки
- `RateComparison.tsx` — сравнение: Bank vs ATM vs CryptoCash
- `AtmLossCalculator.tsx` — детальный расчёт потерь на ATM
- `FAQ.tsx` — FAQ секция с аккордеоном
- `StickyActionBtn.tsx` — мягкая CTA кнопка внизу
- `CityPageContent.tsx` — страница города
- `LandingContent.tsx` — главная с выбором города

---

## Технические детали

### Стек
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 3.4
- Framer Motion
- Shadcn UI

### API курса
- CoinGecko API (бесплатный)
- `src/lib/rate-service.ts` — getLiveRate()
- Кэш: ISR 1 минута

### Цвета (Ex24 стиль)
```css
--background: #E6E6E6 (светло-серый)
--accent: #FFD528 (жёлтый)
--card: #FFFFFF (белый)
--text: #2D3748 (тёмный)
```

### Города
Конфигурация в `src/config/locations.ts`:
- Pattaya (THB)
- Phuket (THB)
- Легко добавить новые

---

## SEO-запросы для оптимизации
- "обмен USDT на баты Паттайя"
- "как снять крипту в Таиланде"
- "USDT to THB calculator"
- "обмен криптовалюты Пхукет"
- "ATM комиссия Таиланд сколько"
- "курс USDT THB сегодня"

---

## Env переменные (нужно добавить)
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YM_ID=XXXXXXXX
NEXT_PUBLIC_BASE_URL=https://cryptocash.pro
```

---

## Деплой
- Vercel (автоматический из GitHub)
- Репозиторий: https://github.com/topworker808-max/crypto-cash
- Текущий URL: https://crypto-cash-xxx.vercel.app

---

## Ключевая концепция
**Мы — полезный инструмент + гид, НЕ обменник.**

1. Даём ценность (калькулятор, сравнение, FAQ)
2. Показываем экономию vs ATM/банк
3. Мягко направляем к партнёру
4. Зарабатываем на affiliate комиссии

---

## Следующие шаги (Sprint 5)

### Потенциальные улучшения
1. **A/B тесты CTA** — протестировать разные тексты кнопок
2. **Больше городов** — Bangkok, Samui, Chiang Mai
3. **Калькулятор комиссий банков** — сравнение карт (Wise, Revolut, Thai banks)
4. **Отзывы/testimonials** — социальное доказательство
5. **Push уведомления** — алерты на выгодный курс
6. **PWA** — установка на телефон

### Аналитика (после деплоя)
- Настроить GA4 events на клики CTA
- Настроить Яндекс Метрику цели
- Тепловые карты (Hotjar/Clarity)

### SEO (ongoing)
- Google Search Console — добавить sitemap
- Яндекс Вебмастер — зарегистрировать
- Linkbuilding — форумы экспатов
