'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateIddah, type IddahType } from './calculate';

export default function IddahCalculator() {
  const t = useTranslations('tools.iddahCalculator.ui');
  const locale = useLocale();

  const [type, setType] = useState<IddahType>('death');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const dateObj = startDate ? new Date(startDate) : new Date();
  const result = calculateIddah(type, dateObj);

  const dateLocale = locale.startsWith('ar') ? 'ar-EG' : 'en-US';
  const formattedEndDate = result.endDate?.toLocaleDateString(dateLocale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">{t('type')}</label>
        <div className="grid grid-cols-1 gap-2.5">
          {[
            { key: 'death', label: t('death') },
            { key: 'revocable', label: t('revocable') },
            { key: 'pregnant', label: t('pregnant') },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setType(item.key as IddahType)}
              className={`p-3.5 rounded-xl border text-sm font-medium text-start transition-all ${
                type === item.key
                  ? 'border-accent bg-accent/10 text-accent font-bold shadow-sm'
                  : 'border-border bg-card hover:bg-muted text-muted-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {type !== 'pregnant' && (
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('startDate')}</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          />
        </div>
      )}

      {/* Results */}
      <div className="space-y-4">
        {type !== 'pregnant' && result.endDate && (
          <div className="p-6 rounded-2xl bg-card border border-border text-center space-y-2 shadow-sm">
            <p className="text-xs text-muted-foreground font-medium">{t('endDate')}</p>
            <p className="text-2xl sm:text-3xl font-black text-accent">{formattedEndDate}</p>
            <p className="text-xs text-muted-foreground pt-1">
              {t('duration')}: <span className="font-semibold text-foreground">{result.periodDays} {locale.startsWith('ar') ? 'يوماً تقريباً' : 'days approx'}</span>
            </p>
          </div>
        )}

        <div className="p-5 rounded-2xl bg-muted/60 border border-border space-y-2">
          <p className="text-xs font-bold text-accent uppercase tracking-wide flex items-center gap-1.5">
            <span>📖</span>
            <span>{t('rulesTitle')}</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t(result.ruleKey as any)}
          </p>
        </div>
      </div>
    </div>
  );
}
