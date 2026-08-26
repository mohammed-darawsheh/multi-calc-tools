# CalcTools — Bilingual Calculator Tools Website

A Next.js (App Router) website offering a collection of everyday calculator tools in **Arabic and English** with automatic language detection, full RTL support, dark mode, and SEO optimization.

## Features

- **27 calculator tools** across 6 categories: Health, Financial, Dates, Converters, Text Utilities, Religious
- **Bilingual** (Arabic/English) with automatic `Accept-Language` detection
- **Full RTL support** for Arabic (`dir="rtl"`)
- **Dark mode** with system preference detection
- **Live data** for currency conversion (exchangerate-api.com) and prayer times (aladhan.com)
- **SEO optimized**: per-page metadata, `sitemap.xml`, `robots.txt`, JSON-LD (`WebApplication` + `FAQPage`)
- **Ad-ready**: generic `AdSlot` component with AdSense/Adsterra config
- **Unit-tested** calculation logic (27 passing tests with Vitest)

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS v4 |
| i18n | next-intl |
| Testing | Vitest |
| Hosting | Vercel (recommended) |

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Start production server
npm start
```

## Project Structure

```
app/
  [locale]/          # ar/ and en/ localized routes
    tools/           # One page per calculator tool
    about|privacy|contact
  sitemap.ts         # Dynamic sitemap
  robots.ts
components/
  ui/                # Reusable UI primitives (Button, Input, Card, Select, Tabs, ResultDisplay)
  layout/            # Header, Footer, ThemeProvider, LanguageSwitcher
  ads/               # AdSlot (AdSense/Adsterra)
  seo/               # JSON-LD schema injectors
  tools/             # One folder per tool: <Tool>.tsx (UI) + calculate.ts (pure logic) + calculate.test.ts
config/
  tools-registry.ts  # Single source of truth for all tools
  tax-rates.ts       # Per-country salary tax config
  ads.ts             # Ad network configuration
content/
  ar.json | en.json  # All user-facing strings, tool descriptions, FAQs
lib/
  api/               # exchangeRate.ts, prayerTimes.ts wrappers
  utils.ts
```

## Adding a New Tool

1. Add an entry to `config/tools-registry.ts` (slug, icon, category, i18nKey)
2. Create `components/tools/<ToolName>/` with:
   - `calculate.ts` — pure calculation function (unit-testable)
   - `<ToolName>.tsx` — UI component
   - `calculate.test.ts` — optional tests
3. Add strings + FAQs to `content/ar.json` and `content/en.json`
4. Create `app/[locale]/tools/<slug>/page.tsx` (use the `ToolPage` wrapper)

The sitemap, homepage, and navigation update automatically from the registry.

## Configuration

### Ads (AdSense / Adsterra)

Edit `config/ads.ts`:
- Set `network: 'adsense' | 'adsterra'`
- Add your `adsensePublisherId`
- Map ad slots in `adSlots`

### Adding a Country to Salary Tax

Edit `config/tax-rates.ts` — add a new entry to `taxConfig`. No code changes needed.

## Deployment

1. Push to GitHub
2. Connect repo to Vercel
3. Add custom domain
4. Submit `sitemap.xml` to Google Search Console
5. Add Google Analytics
6. Apply to Google AdSense (after indexing)

## License

MIT
