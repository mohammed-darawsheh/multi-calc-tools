'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  convertToHijri,
  convertToGregorian,
  hijriMonthsAr,
  hijriMonthsEn,
} from './calculate';

export default function HijriConverter() {
  const t = useTranslations('tools.hijriConverter.ui');
  const locale = useLocale();
  const isAr = locale.startsWith('ar');

  const [mode, setMode] = useState<'toHijri' | 'toGreg'>('toHijri');
  const [gregDate, setGregDate] = useState(new Date().toISOString().split('T')[0]);
  const [hDay, setHDay] = useState('1');
  const [hMonth, setHMonth] = useState('9'); // Ramadan default
  const [hYear, setHYear] = useState('1447');

  const hijriMonths = isAr ? hijriMonthsAr : hijriMonthsEn;

  const result =
    mode === 'toHijri'
      ? gregDate
        ? convertToHijri(new Date(gregDate))
        : null
      : convertToGregorian(parseInt(hDay) || 1, parseInt(hMonth) || 1, parseInt(hYear) || 1447);

  return (
    <div className="space-y-6">
      {/* Mode Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-muted border border-border">
        <button
          type="button"
          onClick={() => setMode('toHijri')}
          className={`py-3 rounded-lg text-sm font-semibold transition-all ${
            mode === 'toHijri'
              ? 'bg-card text-accent shadow-sm border border-border'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {t('toHijri')}
        </button>
        <button
          type="button"
          onClick={() => setMode('toGreg')}
          className={`py-3 rounded-lg text-sm font-semibold transition-all ${
            mode === 'toGreg'
              ? 'bg-card text-accent shadow-sm border border-border'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {t('toGreg')}
        </button>
      </div>

      {mode === 'toHijri' ? (
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('gregDate')}</label>
          <input
            type="date"
            value={gregDate}
            onChange={(e) => setGregDate(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background text-base"
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">{t('hijriDay')}</label>
            <input
              type="number"
              value={hDay}
              onChange={(e) => setHDay(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background"
              min="1"
              max="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">{t('hijriMonth')}</label>
            <select
              value={hMonth}
              onChange={(e) => setHMonth(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background"
            >
              {hijriMonths.map((m, i) => (
                <option key={m} value={i + 1}>
                  {i + 1}. {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">{t('hijriYear')}</label>
            <input
              type="number"
              value={hYear}
              onChange={(e) => setHYear(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background"
            />
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
            <p className="text-xs text-muted-foreground font-medium">
              {mode === 'toHijri' ? t('resultHijri') : t('resultGreg')}
            </p>
            <p className="text-2xl sm:text-3xl font-black text-accent">
              {mode === 'toHijri'
                ? `${result.hijri.day} ${isAr ? result.hijri.monthNameAr : result.hijri.monthNameEn} ${result.hijri.year} هـ`
                : `${result.gregorian.day} ${isAr ? result.gregorian.monthNameAr : result.gregorian.monthNameEn} ${result.gregorian.year} م`}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card text-center text-sm text-muted-foreground">
            {mode === 'toHijri'
              ? `${t('gregDate')}: ${result.gregorian.day} ${isAr ? result.gregorian.monthNameAr : result.gregorian.monthNameEn} ${result.gregorian.year}`
              : `${t('resultHijri')}: ${result.hijri.day} ${isAr ? result.hijri.monthNameAr : result.hijri.monthNameEn} ${result.hijri.year}`}
          </div>
        </div>
      )}
    </div>
  );
}
