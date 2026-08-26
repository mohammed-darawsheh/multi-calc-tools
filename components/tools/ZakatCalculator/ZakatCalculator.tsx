'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateZakat, DEFAULT_GOLD_PRICE, DEFAULT_SILVER_PRICE } from './calculate';

export default function ZakatCalculator() {
  const t = useTranslations('tools.zakatCalculator.ui');

  const [cash, setCash] = useState('10000');
  const [goldGrams, setGoldGrams] = useState('0');
  const [silverGrams, setSilverGrams] = useState('0');
  const [businessValue, setBusinessValue] = useState('0');
  const [debts, setDebts] = useState('0');
  const [goldPrice, setGoldPrice] = useState(String(DEFAULT_GOLD_PRICE));
  const [silverPrice, setSilverPrice] = useState(String(DEFAULT_SILVER_PRICE));

  const result = calculateZakat({
    cash: parseFloat(cash) || 0,
    goldGrams: parseFloat(goldGrams) || 0,
    silverGrams: parseFloat(silverGrams) || 0,
    businessValue: parseFloat(businessValue) || 0,
    debts: parseFloat(debts) || 0,
    goldPricePerGram: parseFloat(goldPrice) || DEFAULT_GOLD_PRICE,
    silverPricePerGram: parseFloat(silverPrice) || DEFAULT_SILVER_PRICE,
  });

  return (
    <div className="space-y-6">
      {/* Assets Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('cash')}</label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('businessValue')}</label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={businessValue}
            onChange={(e) => setBusinessValue(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('goldGrams')} (g)</label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={goldGrams}
            onChange={(e) => setGoldGrams(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('silverGrams')} (g)</label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={silverGrams}
            onChange={(e) => setSilverGrams(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-red-500">{t('debts')}</label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={debts}
            onChange={(e) => setDebts(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold text-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none"
          />
        </div>
      </div>

      {/* Gold/Silver Price Settings (collapsible or neat card) */}
      <details className="group border border-border rounded-xl p-3.5 bg-muted/40 text-xs">
        <summary className="cursor-pointer font-bold flex items-center justify-between text-muted-foreground hover:text-foreground">
          <span>⚙️ {t('customPrices')}</span>
          <span className="group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-border">
          <div>
            <label className="block font-medium mb-1">{t('goldPrice')}</label>
            <input
              type="number"
              inputMode="decimal"
              step="any"
              value={goldPrice}
              onChange={(e) => setGoldPrice(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-background font-bold text-sm"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">{t('silverPrice')}</label>
            <input
              type="number"
              inputMode="decimal"
              step="any"
              value={silverPrice}
              onChange={(e) => setSilverPrice(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-background font-bold text-sm"
            />
          </div>
        </div>
      </details>

      {/* Result Display */}
      <div className="space-y-4">
        <div
          className={`p-5 sm:p-6 rounded-2xl border text-center space-y-1.5 transition-colors ${
            result.eligible
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-muted/60 border-border'
          }`}
        >
          <p className="text-xs text-muted-foreground font-semibold uppercase">{t('zakatDue')}</p>
          <p className={`text-3xl sm:text-5xl font-black ${result.eligible ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
            {result.zakatDue.toLocaleString()}
          </p>
          <p className="text-xs font-bold text-muted-foreground">
            {result.eligible ? `✓ ${t('eligible')}` : `✕ ${t('notEligible')}`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3.5 rounded-xl border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">{t('totalZakatable')}</p>
            <p className="text-base sm:text-lg font-bold">{result.totalZakatable.toLocaleString()}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">{t('nisabGold')}</p>
            <p className="text-base sm:text-lg font-bold">{result.nisabThreshold.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
