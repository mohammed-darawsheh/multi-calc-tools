'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateZakat, DEFAULT_GOLD_PRICE, DEFAULT_SILVER_PRICE } from './calculate';

export default function ZakatCalculator() {
  const t = useTranslations('tools.zakatCalculator.ui');

  const [currencySymbol, setCurrencySymbol] = useState('ر.س');
  const [goldPrice, setGoldPrice] = useState(String(DEFAULT_GOLD_PRICE * 3.75)); // Default in SAR (~320)
  const [silverPrice, setSilverPrice] = useState(String(DEFAULT_SILVER_PRICE * 3.75));
  const [cash, setCash] = useState('50000');
  const [gold, setGold] = useState('0');
  const [silver, setSilver] = useState('0');
  const [business, setBusiness] = useState('0');
  const [debts, setDebts] = useState('0');

  const result = calculateZakat({
    cash: parseFloat(cash) || 0,
    goldGrams: parseFloat(gold) || 0,
    silverGrams: parseFloat(silver) || 0,
    businessValue: parseFloat(business) || 0,
    debts: parseFloat(debts) || 0,
    goldPricePerGram: parseFloat(goldPrice) || DEFAULT_GOLD_PRICE,
    silverPricePerGram: parseFloat(silverPrice) || DEFAULT_SILVER_PRICE,
  });

  return (
    <div className="space-y-6">
      {/* Price Configuration */}
      <div className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">إعدادات العملة وأسعار الذهب والفضة</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">{t('currency')}</label>
            <input
              type="text"
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-background text-sm font-medium"
              placeholder="SAR / USD / EGP"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">{t('goldPrice')}</label>
            <input
              type="number"
              min="0"
              value={goldPrice}
              onChange={(e) => setGoldPrice(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">{t('silverPrice')}</label>
            <input
              type="number"
              min="0"
              value={silverPrice}
              onChange={(e) => setSilverPrice(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-background text-sm"
            />
          </div>
        </div>
      </div>

      {/* Assets & Liabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('cash')}</label>
          <input
            type="number"
            min="0"
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('goldGrams')}</label>
          <input
            type="number"
            min="0"
            value={gold}
            onChange={(e) => setGold(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('silverGrams')}</label>
          <input
            type="number"
            min="0"
            value={silver}
            onChange={(e) => setSilver(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('business')}</label>
          <input
            type="number"
            min="0"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1.5">{t('debts')}</label>
          <input
            type="number"
            min="0"
            value={debts}
            onChange={(e) => setDebts(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{t('zakatDue')}</p>
          <p className="text-4xl font-black text-accent">
            {result.zakatDue.toLocaleString()} <span className="text-lg font-bold">{currencySymbol}</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl border border-border bg-card flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('totalZakatable')}</span>
            <span className="font-bold">{result.totalZakatable.toLocaleString()} {currencySymbol}</span>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('eligible')}</span>
            <span className={`font-bold text-sm px-2.5 py-1 rounded-full ${
              result.eligible
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-500/10 text-red-500'
            }`}>
              {result.eligible ? t('yes') : t('no')}
            </span>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('nisabGold')}</span>
            <span className="font-semibold">{result.nisabGold.toLocaleString()} {currencySymbol}</span>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('nisabSilver')}</span>
            <span className="font-semibold">{result.nisabSilver.toLocaleString()} {currencySymbol}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
