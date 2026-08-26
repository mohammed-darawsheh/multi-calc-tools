'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateSalary, supportedCountries } from './calculate';

const countryNames: Record<string, { ar: string; en: string }> = {
  saudiArabia: { ar: 'المملكة العربية السعودية (SAR)', en: 'Saudi Arabia (SAR)' },
  uae: { ar: 'الإمارات العربية المتحدة (AED)', en: 'United Arab Emirates (AED)' },
  egypt: { ar: 'مصر (EGP)', en: 'Egypt (EGP)' },
  jordan: { ar: 'الأردن (JOD)', en: 'Jordan (JOD)' },
  kuwait: { ar: 'الكويت (KWD)', en: 'Kuwait (KWD)' },
  qatar: { ar: 'قطر (QAR)', en: 'Qatar (QAR)' },
  bahrain: { ar: 'البحرين (BHD)', en: 'Bahrain (BHD)' },
  oman: { ar: 'سلطنة عمان (OMR)', en: 'Oman (OMR)' },
  unitedStates: { ar: 'الولايات المتحدة (USD)', en: 'United States (USD)' },
  unitedKingdom: { ar: 'المملكة المتحدة (GBP)', en: 'United Kingdom (GBP)' },
  germany: { ar: 'ألمانيا (EUR)', en: 'Germany (EUR)' },
  canada: { ar: 'كندا (CAD)', en: 'Canada (CAD)' },
  australia: { ar: 'أستراليا (AUD)', en: 'Australia (AUD)' },
};

export default function SalaryTax() {
  const t = useTranslations('tools.salaryTax.ui');
  const locale = useLocale();
  const isAr = locale.startsWith('ar');

  const [country, setCountry] = useState('saudiArabia');
  const [salary, setSalary] = useState('10000');
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');

  const grossNum = parseFloat(salary);
  const result = grossNum > 0 ? calculateSalary(country, grossNum, period) : null;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('country')}</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          >
            {supportedCountries.map((c) => (
              <option key={c} value={c}>
                {countryNames[c]?.[isAr ? 'ar' : 'en'] || c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">{t('salaryType')}</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPeriod('monthly')}
              className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
                period === 'monthly'
                  ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('monthly')}
            </button>
            <button
              type="button"
              onClick={() => setPeriod('annual')}
              className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
                period === 'annual'
                  ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('annual')}
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          {t('gross')} ({result?.currency || ''})
        </label>
        <input
          type="number"
          min="0"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full p-3 rounded-xl border border-border bg-background text-lg font-semibold"
        />
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('gross')}</p>
              <p className="text-xl font-bold">{result.gross.toLocaleString()} {result.currency}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('tax')}</p>
              <p className="text-xl font-bold text-red-500">{result.tax.toLocaleString()} {result.currency}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('socialSecurity')}</p>
              <p className="text-xl font-bold text-orange-500">{result.socialSecurity.toLocaleString()} {result.currency}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
            <p className="text-sm text-muted-foreground font-medium">{t('net')} ({period === 'monthly' ? t('monthly') : t('annual')})</p>
            <p className="text-3xl sm:text-4xl font-black text-accent">
              {result.net.toLocaleString()} <span className="text-lg font-bold">{result.currency}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {t('effectiveRate')}: <span className="font-bold">{result.effectiveRate}%</span>
            </p>
          </div>

          {result.notes && (
            <div className="p-4 rounded-xl bg-muted/60 text-xs text-muted-foreground leading-relaxed">
              💡 {isAr ? result.notes.ar : result.notes.en}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
