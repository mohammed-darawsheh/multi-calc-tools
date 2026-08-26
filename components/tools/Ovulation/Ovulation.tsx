'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateOvulation } from './calculate';

export default function Ovulation() {
  const t = useTranslations('tools.ovulation.ui');
  const locale = useLocale();

  const [lmpDate, setLmpDate] = useState(
    new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [cycleLength, setCycleLength] = useState('28');

  const cycle = parseInt(cycleLength) || 28;
  const result = lmpDate ? calculateOvulation(new Date(lmpDate), cycle) : null;

  const dateLocale = locale.startsWith('ar') ? 'ar-EG' : 'en-US';
  const format = (d: Date) =>
    d.toLocaleDateString(dateLocale, {
      weekday: 'short',
      month: 'short',
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
            className="w-full p-3.5 rounded-xl border border-border bg-background"
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
            className="w-full p-3.5 rounded-xl border border-border bg-background"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase">{t('ovulationDate')}</p>
            <p className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
              🌸 {format(result.ovulationDate)}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-center">
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('fertileWindow')}</p>
              <p className="text-base font-bold text-accent">
                {format(result.fertileWindowStart)} - {format(result.fertileWindowEnd)}
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('nextPeriod')}</p>
              <p className="text-base font-bold text-foreground">
                {format(result.nextPeriodDate)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
