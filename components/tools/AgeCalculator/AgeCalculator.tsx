'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateAge } from './calculate';

export default function AgeCalculator() {
  const t = useTranslations('tools.ageCalculator.ui');
  const locale = useLocale();
  const isAr = locale.startsWith('ar');

  const [birthDate, setBirthDate] = useState('2000-01-01');

  const result = birthDate ? calculateAge(new Date(birthDate)) : null;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5">{t('birthDateLabel')}</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-medium"
        />
      </div>

      {result && (
        <div className="space-y-4">
          {/* Main Age Display */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
              <p className="text-3xl sm:text-4xl font-black text-accent">{result.years}</p>
              <p className="text-xs font-semibold text-muted-foreground mt-1">{t('years')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border">
              <p className="text-3xl sm:text-4xl font-black text-foreground">{result.months}</p>
              <p className="text-xs font-semibold text-muted-foreground mt-1">{t('months')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border">
              <p className="text-3xl sm:text-4xl font-black text-foreground">{result.days}</p>
              <p className="text-xs font-semibold text-muted-foreground mt-1">{t('days')}</p>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">{t('totalMonths')}</p>
              <p className="text-lg font-bold mt-0.5">{result.totalMonths.toLocaleString()}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">{t('totalWeeks')}</p>
              <p className="text-lg font-bold mt-0.5">{result.totalWeeks.toLocaleString()}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">{t('totalDays')}</p>
              <p className="text-lg font-bold mt-0.5">{result.totalDays.toLocaleString()}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">{t('totalHours')}</p>
              <p className="text-lg font-bold mt-0.5">{result.totalHours.toLocaleString()}</p>
            </div>
          </div>

          {/* Birthday & Day of Week */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
              <span className="text-2xl">🎂</span>
              <div>
                <p className="text-xs text-muted-foreground">{t('nextBirthday')}</p>
                <p className="text-sm font-bold text-accent">
                  {result.nextBirthdayDays} {t('days')}
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-xs text-muted-foreground">{t('dayOfWeek')}</p>
                <p className="text-sm font-bold text-foreground">
                  {isAr ? result.dayOfWeekAr : result.dayOfWeekEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
