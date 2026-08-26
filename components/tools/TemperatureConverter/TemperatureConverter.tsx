'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { convertFromCelsius, convertFromFahrenheit, convertFromKelvin, type TempUnit } from './calculate';

export default function TemperatureConverter() {
  const t = useTranslations('tools.temperatureConverter.ui');

  const [value, setValue] = useState('25');
  const [unit, setUnit] = useState<TempUnit>('celsius');

  const val = parseFloat(value);
  const result = !isNaN(val)
    ? unit === 'celsius'
      ? convertFromCelsius(val)
      : unit === 'fahrenheit'
      ? convertFromFahrenheit(val)
      : convertFromKelvin(val)
    : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('from')}</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as TempUnit)}
            className="w-full p-3.5 sm:p-4 rounded-xl border border-border bg-background text-sm sm:text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="celsius">{t('celsius')} (°C)</option>
            <option value="fahrenheit">{t('fahrenheit')} (°F)</option>
            <option value="kelvin">{t('kelvin')} (K)</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border">
            <p className="text-xs text-muted-foreground font-semibold uppercase">{t('celsius')}</p>
            <p className="text-2xl sm:text-3xl font-black text-foreground mt-1">{result.celsius}°C</p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border">
            <p className="text-xs text-muted-foreground font-semibold uppercase">{t('fahrenheit')}</p>
            <p className="text-2xl sm:text-3xl font-black text-foreground mt-1">{result.fahrenheit}°F</p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-accent/10 border border-accent/20">
            <p className="text-xs text-muted-foreground font-semibold uppercase">{t('kelvin')}</p>
            <p className="text-2xl sm:text-3xl font-black text-accent mt-1">{result.kelvin} K</p>
          </div>
        </div>
      )}
    </div>
  );
}