'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { convertWeight, weightUnits, type WeightUnit } from './calculate';

export default function WeightConverter() {
  const t = useTranslations('tools.weightConverter.ui');

  const [value, setValue] = useState('10');
  const [fromUnit, setFromUnit] = useState<WeightUnit>('kg');
  const [toUnit, setToUnit] = useState<WeightUnit>('lb');

  const val = parseFloat(value);
  const result = !isNaN(val) ? convertWeight(val, fromUnit, toUnit) : null;

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('value')}</label>
        <input
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-3.5 sm:p-4 rounded-xl border border-border bg-background text-base sm:text-lg font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
        />
      </div>

      <div className="grid grid-cols-[1fr,auto,1fr] gap-2 sm:gap-3 items-end">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('from')}</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as WeightUnit)}
            className="w-full p-3 sm:p-3.5 rounded-xl border border-border bg-background text-xs sm:text-sm font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            {weightUnits.map((u) => (
              <option key={u.value} value={u.value}>{t(u.i18nKey as any)}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={swap}
          className="p-3 sm:p-3.5 rounded-xl border border-border hover:bg-muted text-accent font-black text-lg transition-all active:scale-90"
          title="Swap"
        >
          ⇄
        </button>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('to')}</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as WeightUnit)}
            className="w-full p-3 sm:p-3.5 rounded-xl border border-border bg-background text-xs sm:text-sm font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            {weightUnits.map((u) => (
              <option key={u.value} value={u.value}>{t(u.i18nKey as any)}</option>
            ))}
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="p-5 sm:p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
          <p className="text-xs text-muted-foreground font-semibold uppercase">{t('result')}</p>
          <p className="text-2xl sm:text-4xl font-black text-accent break-all">
            {result.toLocaleString()}
          </p>
          <p className="text-xs sm:text-sm font-bold text-foreground">
            {t(toUnit as any)}
          </p>
        </div>
      )}
    </div>
  );
}