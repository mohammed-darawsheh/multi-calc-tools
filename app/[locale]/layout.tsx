import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import type { Metadata } from "next";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: {
      template: isAr ? '%s — أدوات الحاسبة' : '%s — CalcTools',
      default: isAr
        ? 'أدوات الحاسبة — حاسبات ذكية ودقيقة أونلاين مجاناً'
        : 'CalcTools — Smart Online Calculators Free',
    },
    description: isAr
      ? 'مجموعة شاملة من الحاسبات اليومية الذكية للصحة، والمالية، والتواريخ، والوحدات، والإسلاميات. مجانية وبدون تسجيل.'
      : 'Comprehensive collection of smart online calculators for health, finance, dates, unit converters, and utilities.',
    metadataBase: new URL('https://ehsbha.online'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: isAr ? 'أدوات الحاسبة' : 'CalcTools',
      locale: isAr ? 'ar_AR' : 'en_US',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}