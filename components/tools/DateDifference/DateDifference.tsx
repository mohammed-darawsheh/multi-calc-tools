'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateDateDifference } from './calculate';

export default function DateDifference() {
  const t = useTranslations('tools.dateDifference.ui');

  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const result = (startDate && endDate)
    ? calculateDateDifference(new Date(startDate), new Date(endDate))
    : null;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('startDate')}</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('endDate')}</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
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
        </div>
      )}
    </div>
  );
}
