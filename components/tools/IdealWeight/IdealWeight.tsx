'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateIdealWeight } from './calculate';

export default function IdealWeight() {
  const t = useTranslations('tools.idealWeight.ui');

  const [height, setHeight] = useState('170');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const h = parseFloat(height);
  const result = h > 0 ? calculateIdealWeight(h, gender) : null;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('height')}</label>
          <input
            type="number"
            min="100"
            max="250"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-lg font-semibold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">{t('gender')}</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
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
              className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                gender === 'female'
                  ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              👩 {t('female')}
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase">{t('average')}</p>
            <p className="text-4xl sm:text-5xl font-black text-accent">
              {result.average} <span className="text-xl font-bold">{t('kg')}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">{t('devine')}</p>
              <p className="text-lg font-bold mt-1">{result.devine} {t('kg')}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">{t('robinson')}</p>
              <p className="text-lg font-bold mt-1">{result.robinson} {t('kg')}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">{t('miller')}</p>
              <p className="text-lg font-bold mt-1">{result.miller} {t('kg')}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">{t('hamwi')}</p>
              <p className="text-lg font-bold mt-1">{result.hamwi} {t('kg')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
