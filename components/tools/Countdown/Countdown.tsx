'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { calculateCountdown } from './calculate';

export default function Countdown() {
  const t = useTranslations('tools.countdown.ui');

  const [target, setTarget] = useState(() => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1, 0, 1);
    nextYear.setHours(0, 0, 0, 0);
    return nextYear.toISOString().slice(0, 16);
  });

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const result = (target && now) ? calculateCountdown(new Date(target), now) : null;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5">{t('targetDate')}</label>
        <input
          type="datetime-local"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-medium"
        />
      </div>

      {result && (
        <div className="space-y-4">
          {result.isPast ? (
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center font-bold text-amber-600 dark:text-amber-400">
              ⚠️ {t('eventPassed')}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-card border border-border text-center space-y-4 shadow-sm">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{t('timeRemaining')}</p>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {[
                  { label: t('days'), v: result.parts.days },
                  { label: t('hours'), v: result.parts.hours },
                  { label: t('minutes'), v: result.parts.minutes },
                  { label: t('seconds'), v: result.parts.seconds },
                ].map((p) => (
                  <div key={p.label} className="p-3 sm:p-4 rounded-xl bg-muted/60 border border-border/50">
                    <p className="text-2xl sm:text-4xl font-black tabular-nums text-accent">
                      {String(p.v).padStart(2, '0')}
                    </p>
                    <p className="text-[11px] text-muted-foreground font-semibold mt-1">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
