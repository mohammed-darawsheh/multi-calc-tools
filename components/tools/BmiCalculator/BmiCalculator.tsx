'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateBmi } from './calculate';

export default function BmiCalculator() {
  const t = useTranslations('tools.bmiCalculator.ui');

  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('175');

  const w = parseFloat(weight);
  const h = parseFloat(height);
  const result = (w > 0 && h > 0) ? calculateBmi(w, h) : null;

  const categoryColorStyles: Record<string, { text: string; bg: string; border: string }> = {
    underweight: { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    normal: { text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    overweight: { text: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
    obese: { text: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  };

  // BMI gauge pointer (15 to 40 scale)
  const gaugePercent = result ? Math.min(100, Math.max(0, ((result.bmi - 15) / (40 - 15)) * 100)) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('weight')} ({t('kg')})</label>
          <input
            type="number"
            min="10"
            max="300"
            step="0.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-lg font-semibold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('height')} ({t('cm')})</label>
          <input
            type="number"
            min="50"
            max="250"
            step="0.5"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-lg font-semibold"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-5">
          {/* Main Card */}
          <div className={`p-6 rounded-2xl border text-center space-y-3 ${categoryColorStyles[result.category]?.bg} ${categoryColorStyles[result.category]?.border}`}>
            <p className="text-xs font-semibold text-muted-foreground uppercase">{t('bmi')}</p>
            <p className="text-5xl font-black text-foreground">{result.bmi}</p>
            <span className={`inline-block px-4 py-1.5 rounded-full font-bold text-sm ${categoryColorStyles[result.category]?.text} bg-background/80 shadow-sm`}>
              {t(result.category as any)}
            </span>
          </div>

          {/* Visual BMI Range Gauge */}
          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <div className="relative h-4 rounded-full overflow-hidden flex">
              <div className="h-full bg-amber-400 w-[14%]" title={t('underweight')} />
              <div className="h-full bg-emerald-500 w-[26%]" title={t('normal')} />
              <div className="h-full bg-orange-400 w-[20%]" title={t('overweight')} />
              <div className="h-full bg-red-500 w-[40%]" title={t('obese')} />
            </div>

            {/* Gauge Pointer */}
            <div className="relative h-4">
              <div
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                style={{ left: `${gaugePercent}%` }}
              >
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-foreground" />
                <span className="text-[10px] font-bold text-foreground">{result.bmi}</span>
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-muted-foreground pt-1">
              <span>&lt;18.5 {t('underweight')}</span>
              <span>18.5 - 24.9 {t('normal')}</span>
              <span>25 - 29.9 {t('overweight')}</span>
              <span>&gt;30 {t('obese')}</span>
            </div>
          </div>

          {/* Ideal Weight Range */}
          <div className="p-4 rounded-xl border border-border bg-card text-center text-sm">
            <span className="text-muted-foreground">{t('idealRange')}: </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {result.idealRange.min} - {result.idealRange.max} {t('kg')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
