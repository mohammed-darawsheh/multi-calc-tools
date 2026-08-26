'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateFastingMakeup } from './calculate';

export default function FastingMakeupDays() {
  const t = useTranslations('tools.fastingMakeupDays.ui');
  const locale = useLocale();

  const [missedDays, setMissedDays] = useState('10');
  const [fastedDays, setFastedDays] = useState('3');
  const [hasStarted, setHasStarted] = useState(false);
  const [startDate, setStartDate] = useState('');

  const missedNum = parseInt(missedDays) || 0;
  const fastedNum = parseInt(fastedDays) || 0;

  const result = useMemo(() => {
    if (missedNum <= 0) return null;

    return calculateFastingMakeup({
      missedDays: missedNum,
      fastedDays: fastedNum,
      hasStartedMakeup: hasStarted,
      startDate: startDate ? new Date(startDate) : null,
      locale,
    });
  }, [missedNum, fastedNum, hasStarted, startDate, locale]);

  const progressPercent = missedNum > 0 ? Math.min(100, Math.round((fastedNum / missedNum) * 100)) : 0;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('missedDays')}</label>
          <input
            type="number"
            min="1"
            max="300"
            value={missedDays}
            onChange={(e) => setMissedDays(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('fastedDays')}</label>
          <input
            type="number"
            min="0"
            max={missedDays}
            value={fastedDays}
            onChange={(e) => setFastedDays(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl border border-border bg-card space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={hasStarted}
            onChange={(e) => setHasStarted(e.target.checked)}
            className="w-4 h-4 rounded accent-accent"
          />
          <span className="text-sm font-medium">{t('hasStarted')}</span>
        </label>

        {hasStarted && (
          <div className="pt-2">
            <label className="block text-xs text-muted-foreground mb-1">{t('startDate')}</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-background text-sm"
            />
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>نسبة الإنجاز (Progress)</span>
              <span className="font-bold text-accent">{progressPercent}%</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {result.isAllCompleted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-center font-bold">
              🎉 {t('allDone')}
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl border border-border bg-card">
                <p className="text-xs text-muted-foreground mb-1">{t('completedDays')}</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{result.makeupCompleted}</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <p className="text-xs text-muted-foreground mb-1">{t('remainingDays')}</p>
                <p className="text-2xl font-bold text-accent">{result.remainingDays}</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card sm:col-span-1">
                <p className="text-xs text-muted-foreground mb-1">{t('estimatedEnd')}</p>
                <p className="text-sm font-bold text-foreground mt-1">{result.estimatedEndDate}</p>
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-muted/60 text-xs text-muted-foreground leading-relaxed italic text-center">
            {t('motivation')}
          </div>
        </div>
      )}
    </div>
  );
}