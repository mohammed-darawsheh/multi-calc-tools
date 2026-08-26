'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { convertWeight, weightUnits, type WeightUnit } from './calculate';

export default function WeightConverter() {
  const t = useTranslations('tools.weightConverter.ui');

  const [value, setValue] = useState('70');
  const [from, setFrom] = useState<WeightUnit>('kg');
  const [to, setTo] = useState<WeightUnit>('lb');

  const num = parseFloat(value);
  const result = !isNaN(num) ? convertWeight(num, from, to) : null;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5">{t('value')}</label>
        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-3 rounded-xl border border-border bg-background text-lg font-semibold"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('from')}</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value as WeightUnit)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          >
            {weightUnits.map((u) => (
              <option key={u.value} value={u.value}>
                {t(u.i18nKey as any)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">{t('to')}</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value as WeightUnit)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          >
            {weightUnits.map((u) => (
              <option key={u.value} value={u.value}>
                {t(u.i18nKey as any)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
          <p className="text-xs text-muted-foreground font-medium">{t('result')}</p>
          <p className="text-3xl sm:text-4xl font-black text-accent">
            {result.toLocaleString()} <span className="text-base font-bold">{t(to as any)}</span>
          </p>
          <p className="text-xs text-muted-foreground pt-1">
            {value} {t(from as any)} = {result.toLocaleString()} {t(to as any)}
          </p>
        </div>
      )}
    </div>
  );
}