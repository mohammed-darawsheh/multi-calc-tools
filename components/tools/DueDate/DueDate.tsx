'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateDueDate } from './calculate';

export default function DueDate() {
  const t = useTranslations('tools.dueDate.ui');
  const locale = useLocale();

  const [lmpDate, setLmpDate] = useState(
    new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [cycleLength, setCycleLength] = useState('28');

  const cycle = parseInt(cycleLength) || 28;
  const result = lmpDate ? calculateDueDate(new Date(lmpDate), cycle) : null;

  const dateLocale = locale.startsWith('ar') ? 'ar-EG' : 'en-US';
  const format = (d: Date) =>
    d.toLocaleDateString(dateLocale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('lmpDate')}</label>
          <input
            type="date"
            value={lmpDate}
            onChange={(e) => setLmpDate(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('cycleLength')}</label>
          <input
            type="number"
            min="20"
            max="45"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-center space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase">{t('estimatedDueDate')}</p>
            <p className="text-2xl sm:text-3xl font-black text-pink-600 dark:text-pink-400">
              {format(result.dueDate)}
            </p>
            <p className="text-xs text-muted-foreground pt-1">
              {t('daysRemaining')}: <span className="font-bold text-foreground">{result.daysUntilDue} {t('days')}</span>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-center">
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('currentWeek')}</p>
              <p className="text-2xl font-bold text-accent">
                {result.weeksPregnant} <span className="text-sm text-muted-foreground">/ 40</span>
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('trimester')}</p>
              <p className="text-sm font-bold text-foreground mt-1">
                {t(`trimester${result.trimester}` as any)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
