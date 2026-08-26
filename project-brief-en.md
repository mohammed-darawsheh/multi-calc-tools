# Project: Bilingual Calculator Tools Website (Arabic/English)

## Overview
A Next.js (React) website offering a collection of everyday calculator tools (health, finance,
dates, unit conversion, text utilities, religious tools). Fully static/SSR — **no custom backend,
no database**. All calculations run client-side in the browser, except currency conversion and
prayer times, which call free, key-less public APIs directly from the client.

Target audience: both Arabic and English speakers, with automatic language detection based on
browser/search language.

## Suggested Domain Names
(Not finalized yet — verify actual availability before purchasing, e.g. on Namecheap)

- **7sbly.com** / **hesably.com** — from the colloquial Arabic "احسبلي" (calculate for me)
- **kolhesab.com** — "every calculation"
- **calctools.io** or **allcalc.app** — generic English name, easier to scale/rebrand later
- **hesabaty.com** — "my calculations"

Preference: short, easy to pronounce in both languages, `.com` if available (highest trust with
users and search engines).

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG for SEO, built-in i18n routing, React ecosystem |
| UI Library | **React 18** | Component reusability, interactive real-time calculators |
| Styling | **Tailwind CSS** | Fast to build, easy RTL support, small bundle size |
| i18n | **next-intl** | Native App Router support, locale-based routing, RTL handling |
| Hosting | **Vercel** (free tier) | Built by the Next.js team, zero-config deploys, free SSL, global CDN |
| Version Control | **GitHub** | Required to connect to Vercel for CI/CD |
| Analytics | **Google Analytics 4** | Free, standard |
| Ads | **Google AdSense** (primary) + **Adsterra** (fallback) | See Ads section below |
| External APIs | exchangerate-api.com, aladhan.com | Both free, no API key required |
| Date libs | hijri-date or moment-hijri | Client-side Hijri/Gregorian conversion |
| Image compression | browser-image-compression | Fully client-side, no upload needed |

No backend server, no database, no server-side API routes needed for the core tools — this keeps
hosting free and infrastructure maintenance-free.

---

## 2. Full Project Architecture

### 2.1 High-Level Folder Structure

```
/
├── app/
│   ├── [locale]/                      # "ar" or "en" — next-intl dynamic segment
│   │   ├── layout.tsx                 # Sets <html dir="rtl|ltr" lang="ar|en">, loads fonts
│   │   ├── page.tsx                   # Homepage — categorized tool index
│   │   ├── tools/
│   │   │   ├── age-calculator/page.tsx
│   │   │   ├── bmi-calculator/page.tsx
│   │   │   ├── ideal-weight/page.tsx
│   │   │   ├── daily-calories/page.tsx
│   │   │   ├── due-date/page.tsx
│   │   │   ├── ovulation/page.tsx
│   │   │   ├── loan-calculator/page.tsx
│   │   │   ├── zakat-calculator/page.tsx
│   │   │   ├── bank-interest/page.tsx
│   │   │   ├── discount-calculator/page.tsx
│   │   │   ├── gpa-calculator/page.tsx
│   │   │   ├── salary-tax/
│   │   │   │   ├── page.tsx           # Country selector entry point
│   │   │   │   └── [country]/page.tsx # Per-country calculator page
│   │   │   ├── currency-converter/page.tsx
│   │   │   ├── date-difference/page.tsx
│   │   │   ├── countdown/page.tsx
│   │   │   ├── iddah-calculator/page.tsx
│   │   │   ├── hijri-converter/page.tsx
│   │   │   ├── weight-converter/page.tsx
│   │   │   ├── length-converter/page.tsx
│   │   │   ├── temperature-converter/page.tsx
│   │   │   ├── area-converter/page.tsx
│   │   │   ├── word-counter/page.tsx
│   │   │   ├── password-generator/page.tsx
│   │   │   ├── image-compressor/page.tsx
│   │   │   ├── prayer-times/page.tsx
│   │   │   ├── qibla-direction/page.tsx
│   │   │   └── fasting-makeup-days/page.tsx
│   │   ├── about/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx
│   ├── sitemap.ts                     # Dynamic sitemap generation (next-sitemap or native)
│   ├── robots.ts
│   └── globals.css
│
├── components/
│   ├── ui/                            # Generic, reusable, no business logic
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Select.tsx
│   │   ├── Tabs.tsx
│   │   └── ResultDisplay.tsx
│   ├── layout/
│   │   ├── Header.tsx                 # Nav + language switcher
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── ads/
│   │   └── AdSlot.tsx                 # Generic ad container, provider-agnostic (see Ads section)
│   ├── seo/
│   │   ├── FaqSchema.tsx              # Injects FAQPage structured data
│   │   └── ToolSchema.tsx             # Injects WebApplication structured data
│   └── tools/                         # One folder per calculator, logic + UI together
│       ├── AgeCalculator/
│       │   ├── AgeCalculator.tsx      # UI component
│       │   ├── calculate.ts           # Pure calculation function (unit-testable)
│       │   └── calculate.test.ts
│       ├── BmiCalculator/
│       │   ├── BmiCalculator.tsx
│       │   ├── calculate.ts
│       │   └── calculate.test.ts
│       ├── SalaryTax/
│       │   ├── SalaryTaxCalculator.tsx
│       │   ├── calculate.ts           # Reads from config/tax-rates.ts
│       │   └── calculate.test.ts
│       └── ... (same pattern for every tool)
│
├── config/
│   ├── tax-rates.ts                   # Per-country tax brackets/config (see section 4)
│   ├── tools-registry.ts              # Central list of all tools: slug, category, icon, i18n key
│   └── site.ts                        # Site-wide constants (name, domain, social links)
│
├── content/
│   ├── ar.json                        # All Arabic UI strings + tool descriptions + FAQs
│   └── en.json                        # All English UI strings + tool descriptions + FAQs
│
├── lib/
│   ├── api/
│   │   ├── exchangeRate.ts            # Wrapper around exchangerate-api.com fetch
│   │   └── prayerTimes.ts             # Wrapper around aladhan.com fetch
│   ├── hijri.ts                       # Hijri/Gregorian conversion helpers
│   └── utils.ts                       # Generic helpers (formatting, rounding, etc.)
│
├── middleware.ts                      # Detects browser/Accept-Language, redirects to /ar or /en
├── i18n.ts                            # next-intl configuration
├── public/
│   ├── images/
│   └── favicon.ico
├── next.config.js
├── tailwind.config.js
├── package.json
└── tsconfig.json
```

### 2.2 Why this structure

- **Each tool is self-contained** (`components/tools/<ToolName>/`): the UI component and the pure
  calculation function live together, but the calculation logic is separated into its own file
  (`calculate.ts`) so it can be unit-tested independently of React and reused if needed (e.g. in a
  future mobile app or API route).
- **`content/ar.json` and `content/en.json`** hold every user-facing string, tool description, and
  FAQ answer — not hardcoded inside components. This lets a non-developer (you) review and edit
  wording without touching code, and keeps translations consistent and centralized.
- **`config/tools-registry.ts`** is the single source of truth for "what tools exist" — the
  homepage index, sitemap generator, and navigation menu all read from this file instead of each
  maintaining their own hardcoded list. Adding a new tool later means adding one entry here plus
  the tool's folder — nothing else needs to change.
- **`config/tax-rates.ts`** isolates all country-specific tax data from the calculation logic
  (see Section 4), so adding a new country is a data change, not a code change.
- **`components/ads/AdSlot.tsx`** is a single generic component used everywhere an ad should
  appear. It internally decides which network to render (AdSense vs Adsterra) based on a config
  flag, so switching or combining ad networks never requires touching page files.

### 2.3 Data Flow (typical calculator page)

```
User Input (React state)
        ↓
Pure function in calculate.ts (no side effects, fully testable)
        ↓
Result rendered in <ResultDisplay />
```

For tools needing external data (currency, prayer times):

```
User Input
        ↓
lib/api/exchangeRate.ts (or prayerTimes.ts) — fetch() call, client-side
        ↓
Response parsed + cached in component state (or localStorage for short TTL)
        ↓
Combined with local calculation logic
        ↓
Result rendered
```

### 2.4 Rendering Strategy
- Static pages (About, Privacy, Contact, most calculators): **Static Site Generation (SSG)** —
  pre-rendered at build time for maximum speed and perfect SEO.
- Pages relying on live external data (currency converter, prayer times): still SSG for the shell/
  layout/SEO content, with the live data fetched client-side after hydration (so the page is still
  indexable and fast, only the live number updates client-side).

---

## 3. Full Tool List

### Health/Personal Calculators (local logic only)
- Age Calculator
- BMI Calculator
- Ideal Weight Calculator
- Daily Calorie Calculator (Mifflin-St Jeor equation)
- Due Date Calculator (Naegele's rule)
- Ovulation/Fertility Calculator

### Financial Calculators (local logic only, except currency)
- Loan & Installment Calculator
- Zakat Calculator
- Bank Interest Calculator
- Discount Percentage Calculator
- GPA Calculator
- **Salary-After-Tax Calculator (all countries)** — see Section 4, the most complex tool in scope
- **Currency Converter** (needs live API): exchangerate-api.com — free, no signup, called directly
  from client-side JS

### Date Calculators (local logic or lightweight JS libraries)
- Date Difference Calculator
- Countdown to an Event
- Iddah (Islamic waiting period) Calculator
- Hijri–Gregorian Date Converter (hijri-date or moment-hijri, fully client-side)

### Unit Converters (all fixed formulas)
- Weight
- Length
- Temperature
- Area

### Text Utilities (all client-side)
- Word & Character Counter
- Random Password Generator
- Online Image Compressor (browser-image-compression — compresses fully inside the browser,
  nothing uploaded to any server)

### Religious Tools
- Prayer Times by City (aladhan.com API — free, no key)
- Qibla Direction (same API's Kaaba coordinates + local bearing calculation)
- Remaining Fasting Makeup Days Calculator (local logic)
- Zakat Calculator (local logic)

---

## 4. Special Section: Salary-After-Tax Calculator (All Countries)

This is the hardest tool in the project because:
1. Every country has a completely different tax system (brackets, exemptions, social security),
   and some countries (many Gulf states) have no personal income tax at all.
2. Tax law changes yearly, so any data baked into the app needs to be structured for easy updates,
   not scattered arbitrarily through the codebase.

**Recommended approach for the Agent:**
- Build the tool around a **separate "Tax Config" data layer** (`config/tax-rates.ts`) — one file
  (or one JSON per country if it grows large) holding each country's tax brackets, exemption
  thresholds, and social security rate, completely decoupled from the calculation UI/logic.
- Start with a limited set of high-demand countries first (e.g. Jordan, Saudi Arabia, UAE, Egypt,
  Kuwait, Qatar, Bahrain, Oman, Morocco, Lebanon, United States, United Kingdom), with the
  architecture built so that **adding any new country later is a pure data addition** — a new
  object in the config file — with zero changes to calculation logic or page components.
- Example shape:
  ```ts
  // config/tax-rates.ts
  export const taxConfig: Record<string, CountryTaxConfig> = {
    jordan: {
      currency: "JOD",
      brackets: [
        { upTo: 5000, rate: 0 },
        { upTo: 10000, rate: 0.05 },
        { upTo: Infinity, rate: 0.10 },
      ],
      socialSecurityRate: 0.0725,
    },
    uae: {
      currency: "AED",
      brackets: [{ upTo: Infinity, rate: 0 }], // no personal income tax
      socialSecurityRate: 0,
    },
    // ...more countries added incrementally
  };
  ```
- Every country page includes a clear disclaimer: "This is an estimate; actual tax may vary based
  on individual circumstances. Please consult an official source."
- This achieves the goal (broad, scalable coverage) without over-promising full, always-accurate
  coverage of 190+ countries in a single pass.

---

## 5. Bilingual Support (Arabic + English) — Automatic Detection

- Separate routes: `/ar/...` and `/en/...`
- `next-intl` manages translations; `middleware.ts` inspects the browser's `Accept-Language`
  header (or search engine referral language when detectable) and redirects first-time visitors
  to the appropriate locale.
- Full RTL support for Arabic (`dir="rtl"` on `<html>`, Arabic-friendly fonts like Tajawal or Cairo
  from Google Fonts).
- Automatic `hreflang` tags linking every Arabic page to its English counterpart and vice versa.
- All copy (tool descriptions, FAQs) is written naturally in each language — not literal machine
  translation, which search engines penalize and which reads poorly to native speakers.

## 6. Content Workflow (Agent Drafts + Human Review)
- The Agent writes a first draft of every text string (tool explanations, FAQs) in both languages.
- All copy lives in `content/ar.json` and `content/en.json` — never hardcoded inside components —
  so it can be reviewed and edited without touching code.
- After delivery, you review and adjust wording before final publishing or submitting to AdSense.

## 7. Ads
- **Primary network**: Google AdSense
- **Fallback network**: Adsterra — activated automatically if the site is rejected by AdSense, or
  as a temporary measure while awaiting approval
- The codebase must allow switching between, or running both, ad networks without touching page
  files — handled entirely through the generic `<AdSlot />` component reading a config flag
- Full compliance with both networks' content policies (no misleading content, clear Privacy
  Policy page)

## 8. SEO / Structured Data
- Distinct metadata per page per language (title, description)
- Schema.org: `WebApplication` + `FAQPage` on every tool page
- FAQ section under every calculator
- Auto-generated `sitemap.xml`
- Image optimization via `next/image`
- Strong Core Web Vitals (Next.js supports this by default)
- Canonical URLs to avoid duplicate content issues

## 9. User Experience (UX)
- Clean, fast design, no full page reloads between tools (client-side navigation)
- Real-time results wherever feasible — no "Calculate" button required
- Optional dark mode
- Fully responsive, mobile-first design

## 10. Core Pages
- Homepage (categorized tool index)
- One page per tool
- About
- Privacy Policy
- Contact
- 404 page

---

## 11. Post-Delivery Steps (you do these, not the Agent)
1. Review all copy in `content/ar.json` and `content/en.json`
2. Push the project to GitHub (private or public repository)
3. Connect the repo to Vercel (sign in with GitHub → select repo → Deploy)
4. Purchase a domain (from the suggestions above or another) and connect it to Vercel via its
   domain settings
5. Add the site to Google Search Console and submit `sitemap.xml`
6. Add Google Analytics
7. Wait for Google indexing (typically a few weeks) before applying to Google AdSense
8. When applying to AdSense: make sure there's sufficient content, a clear Privacy Policy page,
   and no placeholder/under-construction sections
