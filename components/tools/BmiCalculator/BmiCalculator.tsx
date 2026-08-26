'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateBmi } from './calculate';

export default function BmiCalculator() {
  const t = useTranslations('tools.bmiCalculator.ui');

  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');

  const w = parseFloat(weight);
  const h = parseFloat(height);
  const result = (w > 0 && h > 0) ? calculateBmi(w, h) : null;

  const categoryColor: Record<string, string> = {
    underweight: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    normal: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    overweight: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
    obese: 'text-red-500 bg-red-500/10 border-red-500/30',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5">{t('weight')}</label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min="20"
              max="300"
              step="any"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold pe-12 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
              placeholder="70"
            />
            <span className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-xs font-bold text-muted-foreground pointer-events-none">
              {t('kg')}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5">{t('height')}</label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min="50"
              max="250"
              step="any"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold pe-12 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
              placeholder="175"
            />
            <span className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-xs font-bold text-muted-foreground pointer-events-none">
              {t('cm')}
            </span>
          </div>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className={`p-6 rounded-2xl border text-center space-y-1.5 transition-colors ${categoryColor[result.category]}`}>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('bmi')}</p>
            <p className="text-4xl sm:text-5xl font-black">{result.bmi}</p>
            <p className="text-base sm:text-lg font-bold">
              {t(result.category as any)}
            </p>
          </div>

          {/* BMI Gauge Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="h-3 rounded-full overflow-hidden flex">
              <div className="w-[18.5%] bg-amber-400" title="Underweight (<18.5)" />
              <div className="w-[25%] bg-emerald-500" title="Normal (18.5-24.9)" />
              <div className="w-[20%] bg-orange-400" title="Overweight (25-29.9)" />
              <div className="w-[36.5%] bg-red-500" title="Obese (>=30)" />
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground font-semibold px-0.5">
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card text-center text-xs sm:text-sm text-muted-foreground">
            {t('idealRange')}: <span className="font-bold text-foreground">{result.idealRange.min} - {result.idealRange.max} {t('kg')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
