'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/config/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale.startsWith('ar');

  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12 sm:py-16">
        <div className="text-center space-y-3 mb-8">
          <span className="text-4xl block">📬</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('pages.contact.heading')}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {t('pages.contact.body')}
          </p>
        </div>

        {/* Contact Email Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 text-center">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
              {isAr ? 'البريد الإلكتروني الرسمي للتواصل والدعم' : 'Official Support & Contact Email'}
            </p>
            <p className="text-lg sm:text-2xl font-black text-accent select-all break-all">
              {siteConfig.email}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
            >
              <span>✉️</span>
              <span>{isAr ? 'إرسال رسالة مباشرة' : 'Send Direct Email'}</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm border transition-all active:scale-95 flex items-center justify-center gap-2 ${
                copied
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-background border-border text-foreground hover:bg-muted'
              }`}
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span>{copied ? (isAr ? 'تم نسخ البريد!' : 'Email Copied!') : (isAr ? 'نسخ البريد' : 'Copy Email')}</span>
            </button>
          </div>

          <div className="pt-4 border-t border-border/60 text-xs text-muted-foreground leading-relaxed">
            {isAr
              ? 'نرد عادة على جميع الاستفسارات والاقتراحات في غضون 24-48 ساعة عمل.'
              : 'We typically respond to inquiries and suggestions within 24-48 business hours.'}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
