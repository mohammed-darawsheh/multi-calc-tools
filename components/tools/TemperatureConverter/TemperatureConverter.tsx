'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  convertFromCelsius,
  convertFromFahrenheit,
  convertFromKelvin,
  type TempUnit,
} from './calculate';

export default function TemperatureConverter() {
  const t = useTranslations('tools.temperatureConverter.ui');

  const [unit, setUnit] = useState<TempUnit>('celsius');
  const [value, setValue] = useState('25');

  const num = parseFloat(value);
  const result = !isNaN(num)
    ? unit === 'celsius'
      ? convertFromCelsius(num)
      : unit === 'fahrenheit'
      ? convertFromFahrenheit(num)
      : convertFromKelvin(num)
    : null;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
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

        <div>
          <label className="block text-sm font-medium mb-1.5">{t('from')}</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as TempUnit)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          >
            <option value="celsius">{t('c')}</option>
            <option value="fahrenheit">{t('f')}</option>
            <option value="kelvin">{t('k')}</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="grid sm:grid-cols-3 gap-3 text-center">
          <div className={`p-4 rounded-xl border ${unit === 'celsius' ? 'border-accent bg-accent/10' : 'border-border bg-card'}`}>
            <p className="text-xs text-muted-foreground mb-1">{t('c')}</p>
            <p className="text-2xl font-bold">{result.celsius}°C</p>
          </div>
          <div className={`p-4 rounded-xl border ${unit === 'fahrenheit' ? 'border-accent bg-accent/10' : 'border-border bg-card'}`}>
            <p className="text-xs text-muted-foreground mb-1">{t('f')}</p>
            <p className="text-2xl font-bold">{result.fahrenheit}°F</p>
          </div>
          <div className={`p-4 rounded-xl border ${unit === 'kelvin' ? 'border-accent bg-accent/10' : 'border-border bg-card'}`}>
            <p className="text-xs text-muted-foreground mb-1">{t('k')}</p>
            <p className="text-2xl font-bold">{result.kelvin} K</p>
          </div>
        </div>
      )}
    </div>
  );
}