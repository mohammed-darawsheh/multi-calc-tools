'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateFastingMakeup } from './calculate';

export default function FastingMakeupDays() {
  const t = useTranslations('tools.fastingMakeupDays.ui');
  const locale = useLocale();

  const [missedDays, setMissedDays] = useState('10');
  const [fastedDays, setFastedDays] = useState('3');

  const missed = parseInt(missedDays) || 0;
  const fasted = parseInt(fastedDays) || 0;
  const result = calculateFastingMakeup({
    missedDays: missed,
    fastedDays: fasted,
    hasStartedMakeup: true,
    startDate: new Date(),
    locale,
  });

  const progressPercent = missed > 0 ? Math.min(100, Math.round((fasted / missed) * 100)) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('missedDays')}</label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            max="365"
            value={missedDays}
            onChange={(e) => setMissedDays(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('fastedDays')}</label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            max={missed}
            value={fastedDays}
            onChange={(e) => setFastedDays(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-muted-foreground">
            <span>{t('progress')}: {progressPercent}%</span>
            <span>{result.makeupCompleted} / {missed} {t('days')}</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
          <p className="text-xs text-muted-foreground font-semibold uppercase">{t('remainingDays')}</p>
          <p className="text-4xl sm:text-5xl font-black text-accent">
            {result.remainingDays}
          </p>
          <p className="text-xs text-muted-foreground pt-1">
            {result.remainingDays === 0 ? '🎉 ' + t('completed') : t('days')}
          </p>
        </div>

        {result.remainingDays > 0 && (
          <div className="p-4 rounded-xl border border-border bg-card text-center text-xs sm:text-sm text-muted-foreground space-y-1">
            <p>{t('recommendedTarget')}:</p>
            <p className="font-bold text-foreground">{result.estimatedEndDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}