'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateCalories, activityKeys } from './calculate';

export default function DailyCalories() {
  const t = useTranslations('tools.dailyCalories.ui');

  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('175');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState('moderate');

  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseInt(age);
  const result = (w > 0 && h > 0 && a > 0) ? calculateCalories(w, h, a, gender, activity) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('weight')} (kg)</label>
          <input
            type="number"
            inputMode="decimal"
            min="20"
            max="300"
            step="any"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('height')} (cm)</label>
          <input
            type="number"
            inputMode="decimal"
            min="50"
            max="250"
            step="any"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('age')}</label>
          <input
            type="number"
            inputMode="numeric"
            min="10"
            max="120"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('gender')}</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`py-3 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
                gender === 'male'
                  ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              👨 {t('male')}
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`py-3 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
                gender === 'female'
                  ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              👩 {t('female')}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('activity')}</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-sm font-medium focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            {activityKeys.map((key) => (
              <option key={key} value={key}>
                {t(key as any)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border">
              <p className="text-xs text-muted-foreground font-semibold uppercase">{t('bmr')}</p>
              <p className="text-2xl sm:text-3xl font-black text-foreground mt-1">{result.bmr}</p>
              <p className="text-[11px] text-muted-foreground">{t('kcal')}</p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-accent/10 border border-accent/20">
              <p className="text-xs text-muted-foreground font-semibold uppercase">{t('tdee')}</p>
              <p className="text-2xl sm:text-3xl font-black text-accent mt-1">{result.tdee}</p>
              <p className="text-[11px] text-muted-foreground">{t('kcal')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('moderateLoss')}</p>
              <p className="text-xl font-bold text-amber-500">{result.moderateLoss}</p>
              <p className="text-[10px] text-muted-foreground">{t('kcal')}</p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
              <p className="text-xs text-muted-foreground mb-1">{t('maintenance')}</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{result.maintenance}</p>
              <p className="text-[10px] text-muted-foreground">{t('kcal')}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('gains')}</p>
              <p className="text-xl font-bold text-blue-500">{result.gains}</p>
              <p className="text-[10px] text-muted-foreground">{t('kcal')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
