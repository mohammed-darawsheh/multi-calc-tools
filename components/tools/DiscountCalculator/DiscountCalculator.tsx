'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateDiscount } from './calculate';

export default function DiscountCalculator() {
  const t = useTranslations('tools.discountCalculator.ui');

  const [originalPrice, setOriginalPrice] = useState('200');
  const [discountPercent, setDiscountPercent] = useState('25');

  const p = parseFloat(originalPrice);
  const d = parseFloat(discountPercent);
  const result = (p >= 0 && d >= 0) ? calculateDiscount({ originalPrice: p, discountPercent: d }) : null;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('originalPrice')}</label>
          <input
            type="number"
            min="0"
            step="any"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-lg font-semibold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('discountPercent')}</label>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-lg font-semibold"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase">{t('finalPrice')}</p>
            <p className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400">
              {result.finalPrice.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('savings')}</p>
              <p className="text-2xl font-bold text-accent">
                {result.savings.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('discountPercent')}</p>
              <p className="text-2xl font-bold text-foreground">
                {result.discountPercent}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
