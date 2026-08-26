'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateSalary, supportedCountries } from './calculate';
import { taxConfig } from '@/config/tax-rates';

const countryNames: Record<string, { ar: string; en: string }> = {
  saudiArabia: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
  egypt: { ar: 'مصر', en: 'Egypt' },
  uae: { ar: 'الإمارات العربية المتحدة', en: 'UAE' },
  jordan: { ar: 'الأردن', en: 'Jordan' },
  kuwait: { ar: 'الكويت', en: 'Kuwait' },
  qatar: { ar: 'قطر', en: 'Qatar' },
  bahrain: { ar: 'البحرين', en: 'Bahrain' },
  oman: { ar: 'سلطنة عمان', en: 'Oman' },
  morocco: { ar: 'المغرب', en: 'Morocco' },
  lebanon: { ar: 'لبنان', en: 'Lebanon' },
  unitedStates: { ar: 'الولايات المتحدة', en: 'United States' },
  unitedKingdom: { ar: 'المملكة المتحدة', en: 'United Kingdom' },
};

export default function SalaryTax() {
  const t = useTranslations('tools.salaryTax.ui');
  const locale = useLocale();
  const isAr = locale.startsWith('ar');

  const [grossIncome, setGrossIncome] = useState('5000');
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [country, setCountry] = useState('saudiArabia');

  const income = parseFloat(grossIncome);
  const result = income > 0 ? calculateSalary(country, income, period) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('grossIncome')}</label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={grossIncome}
            onChange={(e) => setGrossIncome(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('period')}</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPeriod('monthly')}
              className={`py-3 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
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
              className={`py-3 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
                period === 'annual'
                  ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('annual')}
            </button>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('country')}</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-sm font-medium focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            {supportedCountries.map((code) => {
              const c = taxConfig[code];
              const name = isAr ? (countryNames[code]?.ar || code) : (countryNames[code]?.en || code);
              return (
                <option key={code} value={code}>
                  {name} ({c.currency})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
            <p className="text-xs text-muted-foreground font-semibold uppercase">{t('netIncome')}</p>
            <p className="text-3xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400">
              {result.net.toLocaleString()} <span className="text-lg font-bold">{result.currency}</span>
            </p>
            <p className="text-xs text-muted-foreground pt-1">
              {t('effectiveRate')}: <span className="font-bold text-foreground">{result.effectiveRate}%</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3.5 sm:p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('totalTax')}</p>
              <p className="text-lg sm:text-xl font-bold text-red-500">{result.tax.toLocaleString()} {result.currency}</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('socialSecurity')}</p>
              <p className="text-lg sm:text-xl font-bold text-foreground">{result.socialSecurity.toLocaleString()} {result.currency}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
